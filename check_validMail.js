document.addEventListener('DOMContentLoaded', () => {
    const cred = document.querySelector('.su');
    cred.addEventListener('click', () => {
        const mail = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const name=document.getElementById('name').value;
        const branch=document.getElementById('branch').value;

        if (mail.endsWith('@iitdh.ac.in')) {
            fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mail, password,name,branch })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                window.location.href='books.html';
            })
            .catch(err => {
                console.log(err);
            });
        } else {
            alert('Invalid email address,kindly enter an iit dharwad mail');
        }
    });
});
