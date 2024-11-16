const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", async (req, res) => {
    const userId = req.params.id; // `auth0Id` of the user

    try {
        // Find the user by their `auth0Id`
        const user = await User.findOne({ auth0Id: userId });
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        // Return the user's tasks
        res.json(user.tasks);
    } catch (e) {
        console.error("Error fetching tasks:", e);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/", async (req, res) => {
    const userId = req.auth0Id; // Auth0 ID from the token
    const newTask = req.body; // Task data from the request body
  
    // Validate the incoming task data
    if (!newTask.title || !newTask.description) {
      return res.status(400).json({ error: 'Title and description are required.' });
    }
  
    try {
      // Find the user by their Auth0 ID
      const user = await User.findOne({ auth0Id: userId });
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
  
      // Add the new task to the user's tasks array
      user.tasks.push({
        title: newTask.title,
        description: newTask.description,
        streakCount: newTask.streakCount || 0, // Default to 0 if not provided
        lastCompleted: newTask.lastCompleted || null
      });
  
      // Save the updated user document
      await user.save();
  
      res.status(201).json({ message: 'Task added successfully.', tasks: user.tasks });
    } catch (error) {
      console.error('Error adding task:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;