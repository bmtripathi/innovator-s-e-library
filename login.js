const fetchcred = async (mail, password) => {
    try {
        const response = await fetch(`http://localhost:3000/login/${mail}/${password}`);
        const data = await response.json();
        if (data.mssg==='welcome') {

            window.location.href = 'books.html';
        } else {
            console.log(data.mssg);
        }
    } catch (err) {
        console.log('Error fetching your information', err);
    }
};

                   
    document.querySelector('.submit').addEventListener('click', () => {
    const mail = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const department=document.getElementById('department').value;
    if (mail && password) {
        fetchcred(mail, password);
        
    }
});
