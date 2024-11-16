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

module.exports = router;