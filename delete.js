document.querySelector('#deleteBookForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Get the form data
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const genre = document.querySelector('#genre').value;
    const department = document.querySelector('#department').value;
    const count = document.querySelector('#count').value;
    
    // Create an object to hold the form data
    const bookData = {
        title: title,
        author: author,
        genre: genre,
        department: department,
        count: parseInt(count),
        
    };

    // Send a DELETE request to the '/delete' endpoint
    fetch('http://localhost:3000/delete', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookData)
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the server
        console.log('Success:', data);
        alert('Book deleted successfully!');
        // Clear the form
        document.querySelector('#deleteBookForm').reset();
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while deleting the book.');
    });
});
