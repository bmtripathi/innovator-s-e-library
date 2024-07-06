document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/books')
        .then(response => response.json())
        .then(books => {
            const bookList = document.getElementById('book-list');
            books.forEach(book => {
                const bookDiv = document.createElement('div');
                bookDiv.className = 'book';
                bookDiv.innerHTML = `
                    <h2>${book.title}</h2>
                    <p><strong>Author:</strong> ${book.author}</p>
                    <p><strong>Year:</strong> ${book.year}</p>
                `;
                bookList.appendChild(bookDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching books:', error);
        });
});
