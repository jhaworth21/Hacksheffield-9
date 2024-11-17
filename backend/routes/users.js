const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Get all users (for admin/debugging purposes)
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get the current user by `auth0Id`
router.get('/', async (req, res) => {
    if (!req.oidc.user) {
        return res.status(401).json({error: "Unauthorized"});
    }

    const userId = req.oidc.user.sub; // Auth0 ID of the logged-in user

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized. Please log in.' });
    }

    try {
        const user = await User.findOne({ auth0Id: userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new user
router.post('/', async (req, res) => {
    const { auth0Id, email, profile } = req.body;

    if (!auth0Id || !email) {
        return res.status(400).json({ message: 'Missing required fields: auth0Id or email.' });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ auth0Id });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists.' });
        }

        const user = new User({
            auth0Id,
            email,
            tasks: [], // Initialize with an empty tasks array
            profile: {
                profilePicture: profile?.profilePicture || ''
            }
        });

        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update the current user's profile
router.patch('/', async (req, res) => {
    if (!req.oidc.user) {
        return res.status(401).json({error: "Unauthorized"});
    }

    const userId = req.oidc.user.sub; // Auth0 ID of the logged-in user

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized. Please log in.' });
    }

    try {
        const user = await User.findOne({ auth0Id: userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Update the fields if provided in the request body
        if (req.body.email != null) {
            user.email = req.body.email;
        }

        if (req.body.profile?.profilePicture != null) {
            user.profile.profilePicture = req.body.profile.profilePicture;
        }

        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete the current user
router.delete('/', async (req, res) => {
    if (!req.oidc.user) {
        return res.status(401).json({error: "Unauthorized"});
    }

    const userId = req.oidc.user.sub; // Auth0 ID of the logged-in user

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized. Please log in.' });
    }

    try {
        const user = await User.findOne({ auth0Id: userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        await user.deleteOne();
        res.json({ message: 'User deleted successfully.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
