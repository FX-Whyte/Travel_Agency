// --- Node.js backend for signup, verification, login, and profile (simple demo) ---

/*
EXPLANATION:
- Uses Express for HTTP server, CORS for cross-origin requests, and body-parser for JSON.
- Stores users in a simple JS object (for demo only; use a real DB in production).
- /api/signup: Validates input, checks for duplicate email, generates a code, "sends" it (logs to console), and saves user as unverified.
- /api/verify: Checks email and code, marks user as verified if correct.
- /api/login: Validates email and password, checks if user is verified.
- /api/users: Lists all users (for demo/testing only).
- /api/user/:email: Gets user by email (for demo/testing only) to make up the user profile page.
- Passwords are stored in plain text for demo—**never do this in production**! Always hash passwords.
- No real email is sent; you see the code in the server console.
*/

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto'); // For generating verification codes

const app = express();

app.use(cors());
app.use(bodyParser.json());

// In-memory "database" for demo purposes
const users = {}; // { email: { ...userData, verified: false, code: '123456' } }

// --- Signup Endpoint ---
app.post('/api/signup', (req, res) => {
    const { firstname, surname, dob, gender, email, password } = req.body;

    // Basic validation
    if (!firstname || !surname || !dob || !gender || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    if (users[email]) {
        return res.status(400).json({ message: 'Email already registered.' });
    }

    // Generate a 6-digit verification code
    const code = crypto.randomInt(100000, 999999).toString();

    // Save user (not verified yet)
    users[email] = {
        firstname,
        surname,
        dob,
        gender,
        email,
        password, // In production, hash the password!
        verified: false,
        code,
        // Add profile fields for editing
        preferredClass: "Economy",
        preferredDestinations: ["Paris", "London", "New York"],
        mealPreference: "Vegetarian",
        photo: ""
    };

    // "Send" verification code (for demo, just log it)
    console.log(`Verification code for ${email}: ${code}`);

    // Respond to client
    res.json({ message: 'Signup successful! Please check your email for the verification code.' });
});

// --- Verification Endpoint ---
app.post('/api/verify', (req, res) => {
    const { email, code } = req.body;

    // Check if user exists
    if (!users[email]) {
        return res.status(400).json({ message: 'User not found.' });
    }
    // Check if already verified
    if (users[email].verified) {
        return res.status(400).json({ message: 'User already verified.' });
    }
    // Check code
    if (users[email].code === code) {
        users[email].verified = true;
        return res.json({ message: 'Verification successful!' });
    } else {
        return res.status(400).json({ message: 'Invalid verification code.' });
    }
});

// --- Login Endpoint ---
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = users[email];
    if (!user) {
        return res.status(400).json({ message: 'User not found.' });
    }
    if (!user.verified) {
        return res.status(400).json({ message: 'Please verify your email before logging in.' });
    }
    if (user.password !== password) {
        return res.status(400).json({ message: 'Incorrect password.' });
    }
    // Success: do not send password or code
    const { password: pw, code, ...safeUser } = user;
    res.json(safeUser);
});

// --- List all users (for demo/testing only) ---
app.get('/api/users', (req, res) => {
    // Return all users as an array (without passwords and codes for safety)
    const userList = Object.values(users).map(user => ({
        firstname: user.firstname,
        surname: user.surname,
        dob: user.dob,
        gender: user.gender,
        email: user.email,
        verified: user.verified
    }));
    res.json(userList);
});

// --- Get user by email (for profile page) ---
app.get('/api/user/:email', (req, res) => {
    const email = decodeURIComponent(req.params.email);
    const user = users[email];
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    // Don't send password or code
    const { password, code, ...safeUser } = user;
    res.json(safeUser);
});

// --- Update user by email (for edit-profile) ---
app.patch('/api/user/:email', (req, res) => {
    const email = decodeURIComponent(req.params.email);
    const user = users[email];
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    // Only update allowed fields
    const allowed = [
        "firstname", "surname", "dob", "gender",
        "preferredClass", "preferredDestinations", "mealPreference", "photo"
    ];
    for (const key of allowed) {
        if (req.body[key] !== undefined) {
            user[key] = req.body[key];
        }
    }
    // Don't send password or code
    const { password, code, ...safeUser } = user;
    res.json(safeUser);
});

// --- Change password ---
app.patch('/api/user/:email/password', (req, res) => {
    const email = decodeURIComponent(req.params.email);
    const user = users[email];
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: "Both old and new password are required." });
    }
    if (user.password !== oldPassword) {
        return res.status(400).json({ message: "Current password is incorrect." });
    }
    user.password = newPassword;
    res.json({ message: "Password updated successfully." });
});

// --- Start the server ---
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

/*
-------------------------
EXPLANATION OF THE CODE:
-------------------------
- Uses Express for HTTP server, CORS for cross-origin requests, and body-parser for JSON.
- Stores users in a simple JS object (for demo only; use a real DB in production).
- /api/signup: Validates input, checks for duplicate email, generates a code, "sends" it (logs to console), and saves user as unverified.
- /api/verify: Checks email and code, marks user as verified if correct.
- /api/login: Validates email and password, checks if user is verified.
- /api/users: Lists all users (for demo/testing only).
- /api/user/:email: Gets user by email (for demo/testing only) to make up the user profile page.
- /api/user/:email (PATCH): Updates allowed profile fields.
- /api/user/:email/password (PATCH): Changes password after checking old password.
- Passwords are stored in plain text for demo—**never do this in production**! Always hash passwords.
- No real email is sent; you see the code in the server console.
*/