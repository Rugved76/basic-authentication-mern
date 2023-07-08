const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors')
const jwt = require('jsonwebtoken')
const app = express();

// Middleware
app.use(express.json());

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5000'],
}));
// Database connection
mongoose.connect('mongodb+srv://rugvedwagh02:rugved76@clusternew.xrsceyc.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
});

// User model
const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model('User', UserSchema);

// Signup endpoint
app.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({ message: 'User already exists' }); // this line directly closes the server and ends the process
      // console.log('fuck you')  // While this doesn't do that
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();

    res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // res.status(200).json({ message: 'Login successful' });
    const token = jwt.sign({ userId: user._id }, 'secret-key')  // generates a token to autherize the communication between server and client and the requrests between them
    res.status(200).json({ token })

    console.log('\nLogin successfull...')
    console.log({ email, password, token })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server started on port 5000');
});


