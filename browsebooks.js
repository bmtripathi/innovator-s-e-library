document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const searchButton = document.getElementById('search-button');
    const departmentSelect = document.getElementById('department');
    const departmentButton = document.getElementById('department-button');
    const bookResults = document.getElementById('book-results');

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            fetchBooks(query);
        }
    });

    departmentButton.addEventListener('click', () => {
        const department = departmentSelect.value;
        if (department) {
            fetchBooksByDepartment(department);
        }
    });

    const fetchBooks = async (query) => {
        try {
            const response = await fetch(`http://localhost:3000/books?search=${query}`);
            const books = await response.json();
            displayBooks(books);
        } catch (err) {
            console.log('Error fetching books', err);
            bookResults.innerHTML = '<p>Error fetching books, try again</p>';
        }
    };

    const fetchBooksByDepartment = async (department) => {
        try {
            const response = await fetch(`http://localhost:3000/books/department?search=${department}`);
            const books = await response.json();
            displayBooks(books);
        } catch (err) {
            console.log('Error fetching books by department', err);
            bookResults.innerHTML = '<p>Error fetching books, try again</p>';
        }
    };

    const displayBooks = (books) => {
        bookResults.innerHTML = '';
        if (books.length === 0) {
            bookResults.innerHTML = '<p>No books found</p>';
        } else {
            books.forEach(book => {
                const bookElement = document.createElement('div');
                bookElement.classList.add('book');
                bookElement.innerHTML = `
                    <h3>${book.title}</h3>
                    <p><strong>Author:</strong> ${book.author}</p>
                    <p><strong>Genre:</strong> ${book.genre}</p>
                    <p>No. of books in stock: ${book.count}</p>
                    <button class="issue-button" data-title="${book.title}">Issue this book</button>
                `;
                
                bookResults.appendChild(bookElement);

                const issueButton = bookElement.querySelector('.issue-button');
                issueButton.addEventListener('click', (event) => {
                    const bookTitle = event.target.getAttribute('data-title');
                    window.location.href = `issue.html?book_name=${encodeURIComponent(bookTitle)}`;
                });
            });
        }
    };
});
