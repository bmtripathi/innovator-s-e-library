document.querySelector('#addBookForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Get the form data
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const genre = document.querySelector('#genre').value;
    const department = document.querySelector('#department').value;
    const count = document.querySelector('#count').value;
    const numberOfBooks = document.querySelector('#numberOfBooks').value;

    // Create an object to hold the form data
    const bookData = {
        title: title,
        author: author,
        genre: genre,
        department: department,
        count: parseInt(count),
        numberOfBooks: parseInt(numberOfBooks)
    };

    // Send a POST request to the '/add' endpoint
    fetch('http://localhost:3000/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookData)
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the server
        console.log('Success:', data);
        alert('Book added successfully!');
        // Clear the form
        document.querySelector('#addBookForm').reset();
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while adding the book.');
    });
});
