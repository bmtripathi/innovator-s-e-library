document.addEventListener('DOMContentLoaded', () => {
    const cred = document.querySelector('.su');
    cred.addEventListener('click', () => {
        const mail = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rollNumber=document.getElementById('rollNumber').value;

        if (mail.endsWith('@iitdh.ac.in')) {
            fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mail, password,rollNumber })
            })
            .then(response => response.json())
            .then(data => {
                if(data.mssg === "you have already signed up"){
                    alert("You have already signed up");
                } else if (data.message === "Your info has been saved successfully") {
                    window.location.href = 'books.html';
                } else {
                    console.log("Unexpected response: ", data);
                }
            })
            .catch(err => {
                console.log(err);
            });
        } else {
            alert('Invalid email address, kindly enter an iit dharwad mail');
        }
    });
});
