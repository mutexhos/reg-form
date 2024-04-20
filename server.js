const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/registration', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Create User schema
const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const User = mongoose.model('User', UserSchema);

// Middleware
app.use(express.static('public'));
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/registration.html');
});

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.json({ success: false, message: 'Email already registered.' });
    }

    // Create new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.json({ success: true });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
