


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

    rollNumber:Number
    
});
const User = mongoose.model('User', userSchema, 'cre');

// Signup route
app.post('/signup', async (req, res) => {
    const { mail, password,rollNumber } = req.body;

    if (mail.endsWith('@iitdh.ac.in')) {
        try {
            // Check if the user already exists
            const existingUser = await User.findOne({ mail });

            if (existingUser) {
                res.status(200).json({ mssg: "you have already signed up" });
            } else {
                // Create a new user
                const newUser = new User({ mail, password,rollNumber});
                await newUser.save();
                res.status(200).json({ message: 'Your info has been saved successfully' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Internal server error', error: err });
        }
    } else {
        res.status(400).json({ message: 'Invalid ID domain' });
    }
});


// Login route
app.get('/login/:mail/:password/:rollNumber', async (req, res) => {
    try {
        const { mail, password, rollNumber } = req.params;
        const user = await User.findOne({ mail, password, rollNumber });
        const issuer = await Issue.findOne({ rollNumber });

        if (user) {
            if (issuer) {
                console.log('Date Issued:', issuer.dateIssued); // Debugging log
                const issueDate = new Date(issuer.dateIssued);
                const dueDate = new Date(issueDate);
                dueDate.setDate(issueDate.getDate() + 15);
                console.log('Due Date:', dueDate); // Debugging log

                res.status(200).json({ 
                    mssg: `Welcome, your book "${issuer.bookName}" is due on ${dueDate.toDateString()}`,
                    bookName: issuer.bookName,
                    dueDate: dueDate.toDateString()
                });
            } else {
                res.status(200).json({ mssg: 'Welcome' });
            }
        } else {
            res.status(400).json({ mssg: "You haven't signed up" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ mssg: 'Internal server error' });
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
        const books = await Book.find({ department: { $regex: searchQuery, $options: 'i' } }).exec(); // Search by genre and limit results to 5
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ message: 'Could not fetch documents', error: err });
    }
});
// //Schema and model for issuing books
const issueSchema = new mongoose.Schema({
    name: String,
    rollNumber: String,
    bookName: String,
    dateIssued: { type: Date }
});

const Issue = mongoose.model('Issue', issueSchema, 'issued');

app.post('/issue', async (req, res) => {
    try {
        const { name, rollNumber, bookName, dateIssued } = req.body;
        const book = await Book.findOne({ title: bookName });
        
        if (book && book.count > 0) {
            book.count -= 1;
            await book.save();
            const issuer = new Issue({ name, rollNumber, bookName, dateIssued });
            await issuer.save();
            res.status(200).json({ mssg: "your book has been issued successfully" });
        } else {
            res.status(400).json({ mssg: "book currently not available" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ mssg: "error" });
    }
});
app.post('/return', async (req, res) => {
    try {
        const { bookName } = req.body;
        const book = await Book.findOne({ title: bookName });
        
        if (book) {
            book.count += 1;
            await book.save();
            res.status(200).json({ mssg: "your book has been returned successfully" });
        } else {
            res.status(400).json({ mssg: "book not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ mssg: "error returning book" });
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
