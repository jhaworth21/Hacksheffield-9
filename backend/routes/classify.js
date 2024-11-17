const express = require("express");
const router = express.Router();
const User = require("../models/user");
const {GoogleGenerativeAI} = require("@google/generative-ai");
const {GoogleAIFileManager} = require("@google/generative-ai/server");
const fs = require("fs"); // Import Readable stream
const tmp = require('tmp');  // Use a temporary file library

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const fileManager = new GoogleAIFileManager(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "You will be provided with a description of what a successful completion of a goal looks like. Based on this description, your task is to carefully evaluate if the provided image depicts the user successfully completing the stated goal. Consider each aspect of the description step by step, allowing for reasonable interpretation and flexibility where applicable. Once you have reached a conclusion, respond with either <response>task completed</response> or <response>task failed</response>, ensuring your response aligns with the evidence presented in the image.",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

async function processImageWithGemini(imageDataUrl, description) {
    try {
        // Convert data URL to Buffer
        const imageBuffer = Buffer.from(imageDataUrl.split(",")[1], "base64");

        console.log(imageBuffer)

        // Create a temporary file
        const {name: tempFilePath, fd} = tmp.fileSync({postfix: '.png'});

        // Write the buffer to the temporary file
        fs.writeFileSync(tempFilePath, imageBuffer);


        const uploadResult = await fileManager.uploadFile(tempFilePath, {  // Use the path
            mimeType: "image/png",
            displayName: "uploaded_image.png",
        });


        // Delete the temporary file (important!)
        fs.unlinkSync(tempFilePath); // Clean up after upload


        const file = uploadResult.file;

        console.log("Starting Gemini chat session...")

        const chatSession = model.startChat({
            generationConfig,
            history: [
                {
                    role: "user",
                    parts: [
                        {
                            fileData: {
                                mimeType: file.mimeType,
                                fileUri: file.uri,
                            },
                        }
                    ],
                },
            ],
        });

        const result = await chatSession.sendMessage(description);
        const resultText = result.response.text().toLowerCase();

        console.log(resultText)

        return resultText.includes("<response>task completed</response>");
    } catch (error) {
        console.error("Error processing image with Gemini:", error);
        return true;
    }
}


router.post("/", async (req, res) => {
    const userId = req.oidc.user.sub;

    if (!req.body.taskId || !req.body.imageDataUrl) {
        return res.status(400).json({error: "Task ID and image data URL are required."});
    }

    const taskId = req.body.taskId;
    const imageDataUrl = req.body.imageDataUrl;

    // Find the user by their Auth0 ID
    const user = await User.findOne({auth0Id: userId});
    if (!user) {
        return res.status(404).json({error: "User not found."});
    }

    // Find the task by its ID
    const task = user.tasks.id(taskId);

    if (!task) {
        return res.status(404).json({error: "Task not found."});
    }

    // Respond immediately to prevent the frontend from hanging
    res.status(202).json({message: "Image processing started."});

    // Process the image in the background
    try {
        const geminiResponse = await processImageWithGemini(imageDataUrl, task.description);

        // Update the task with the Gemini result
        if (geminiResponse) {
            task.lastCompleted = new Date().toISOString().split("T")[0];
            task.streakCount++;

            await user.save();
        }
    } catch (error) {
        console.error("Error processing and storing Gemini result:", error);
    }
});


module.exports = router;
