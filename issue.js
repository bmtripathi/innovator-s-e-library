document.querySelector(".submit").addEventListener('click', async () => {
    const name = document.getElementById('Name').value;
    const rollNumber = document.getElementById('Roll_No.').value;
    const bookName = document.getElementById('book_name').value;
    const dateIssued = document.getElementById('date').value;

    const data = { name, rollNumber, bookName, dateIssued };

    try {
        const response = await fetch('http://localhost:3000/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookNa )
        });
        const result = await response.json();
        if (result.mssg === "your book has been issued successfully") {
            window.location.href = 'issued.html';
        } else {
            console.log("error fetching server");
        }
    } catch (err) {
        console.log(err);
    }
});
