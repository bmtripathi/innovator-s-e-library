


import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/e-library')
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Initialize Express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Define user schema and model
const userSchema = new mongoose.Schema({
    mail: String,
    password: String,
    name: String,
    branch: String
});
const User = mongoose.model('User', userSchema, 'cre');

// Signup route
app.post('/signup', async (req, res) => {
    const { mail, password, name, branch } = req.body;
    if (mail.endsWith('@iitdh.ac.in')) {
        try {
            const newUser = new User({ mail, password, name, branch });
            await newUser.save();
            res.status(200).json({ message: 'Your info has been saved successfully' });
        } catch (err) {
            res.status(500).json({ message: 'Internal server error', error: err });
        }
    } else {
        res.status(400).json({ message: 'Invalid ID domain' });
    }
});

// Login route
app.get('/login/:mail/:password', async (req, res) => {
    try {
        const { mail, password } = req.params;
        const user = await User.findOne({ mail, password });
        if (user) {
            res.status(200).json({ mssg: 'welcome' });
        } else {
            res.status(400).json({ mssg: 'you haven\'t signed up' });
        }
    } catch (err) {
        res.status(500).json({ mssg: 'error' });
    }
});

// Define book schema and model
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    genre: String, // Added genre field
    department: String, // Added department field
    year: Number,
    count: { type: Number, default: 0 }  // Add count field to track available copies
});
const Book = mongoose.model('Book', bookSchema, 'books');

// API route handler for adding a book
app.post('/add', async (req, res) => {
    try {
        const { title, author, genre, department, year, count } = req.body;

        const newBook = new Book({ title, author, genre, department, year, count });
        await newBook.save();

        res.status(200).json({ message: 'Book added successfully!', book: newBook });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err });
    }
});

// API route handler for deleting a book
app.delete('/delete', async (req, res) => {
    try {
        const { title, author, genre, department, count } = req.body;

        const book = await Book.findOneAndDelete({
            title: title,
            author: author,
            genre: genre,
            department: department,
            count: count
            
        });

        if (book) {
            res.status(200).json({ message: 'Book deleted successfully!', book: book });
        } else {
            res.status(404).json({ message: 'Book not found.' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err });
    }
});

// API route handler for getting all books
app.get('/books', async (req, res) => {
    try {
        const searchQuery = req.query.search;
        let query = {};
        if (searchQuery) {
            query = {
                $or: [
                    { title: { $regex: searchQuery, $options: 'i' } },
                    { author: { $regex: searchQuery, $options: 'i' } }
                ]
            };
        }
        const books = await Book.find(query).sort({ author: 1 }).exec();
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ message: 'Could not fetch documents', error: err });
    }
});

// API route handler for getting books by department
app.get('/books/department', async (req, res) => {
    try {
        const searchQuery = req.query.search;
        const books = await Book.find({ department: { $regex: searchQuery, $options: 'i' } }).limit(5).exec(); // Search by genre and limit results to 5
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ message: 'Could not fetch documents', error: err });
    }
});

// API route handler for admin
const admin = new mongoose.Schema({
    Name: String,
    Password: String
});
const adminModel = mongoose.model('adminModel', admin, 'Admin');
app.get('/admin/:Name/:Password', async (req, res) => {
    try {
        const { Name, Password } = req.params;
        const Admin = await adminModel.findOne({ Name, Password });
        if (Admin) {
            res.status(200).json({ mssg: "welcome admin" });
        } else {
            res.status(400).json({ mssg: "you are not admin" });
        }
    } catch (err) {
        res.status(404).json({ mssg: "error" });
    }
});

// Connect to MongoDB and start server
mongoose.connection.once('open', () => {
    app.listen(3000, () => {
        console.log('Server is listening on port 3000');
    });
});
