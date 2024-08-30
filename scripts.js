document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Validate form inputs
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const status = document.getElementById('form-status');

    if (name === '' || email === '' || message === '') {
        status.textContent = 'Please fill out all fields.';
        status.style.color = 'red';
        return;
    }

    // Set form to "sending" state
    status.textContent = 'Sending...';
    status.style.color = 'blue';

    // Submit the form data to Formspree
    fetch('https://formspree.io/f/xeojndnb', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
    })
    .then(response => {
        if (response.ok) {
            status.textContent = 'Message sent successfully!';
            status.style.color = 'green';
            document.getElementById('contact-form').reset();
        } else {
            throw new Error('Failed to send message.');
        }
    })
    .catch(error => {
        status.textContent = 'Failed to send message. Please try again later.';
        status.style.color = 'red';
        console.error('Error:', error);
    });
});
