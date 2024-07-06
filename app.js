import express from 'express';
import { connectToDb, getDb } from './db.js';

const app = express();
let db;
  
connectToDb((err) => {
    if (!err) {
        app.listen(3000, () => {
            console.log('Listening on port 3000');
        });
        db = getDb();
    } else {
        console.error('Failed to connect to the database:', err);
    }
});

// Route handler for getting all books
app.get('/books', (req, res) => {
    let books = [];
    db.collection('books')
        .find()
        .sort({ author: 1 })
        .forEach(book => books.push(book))
        .then(() => {
            res.status(200).json(books);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Could not fetch documents', error: err });
        });
});

// Route handler for getting a book by title
app.get('/books/:title', (req, res) => {
    if(title.isValid(req.params.title)){
    db.collection('books')
        .findOne({ title: req.params.title })
        .then(doc => {
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message: 'Book not found' });
            }
        })
        .catch((err) => {
            res.status(500).json({ message: 'Server could not fetch the document', error: err });
        });
    }else{
        res.status(500).json({mssg:'Sorry,this book is not available'});
    }
});

