document.getElementById('registrationForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();

    if (data.success) {
        document.getElementById('message').innerText = 'Registration successful!';
    } else {
        document.getElementById('message').innerText = data.message;
    }
});
