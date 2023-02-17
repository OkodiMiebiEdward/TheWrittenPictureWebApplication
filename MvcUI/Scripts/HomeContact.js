const form = document.getElementById('form');
const firstName = document.getElementById('firstname');
const lastName = document.getElementById('lastname');
const email = document.getElementById('email');
const message = document.getElementById('message');

form.addEventListener('submit', e => {
    e.preventDefault();
    validateInputs();
    sendEmail();
    setTimeout(() => { clearInput();}, 7000);
})

function setError(element,message) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

function setSuccess(element) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}


function isValidEmail(email) {
    var regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // Converting the email to lowercase
    return regexp.test(String(email).toLowerCase());
}

function clearInput() {
    firstName.value = '';
    lastName.value = '';
    email.value = '';
    message.value = '';
}

function validateInputs() {
    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const emailValue = email.value.trim();
    const messageValue = message.value.trim();

    if (firstNameValue === '') {
        setError(firstName, 'First name is required');
    }
    else {
        setSuccess(firstName);
    }


    if (lastNameValue === '') {
        setError(lastName, 'Last name is required');
    }
    else {
        setSuccess(lastName);
    }

    if (emailValue === '') {
        setError(email, 'Email is required')
    }
    else if (!isValidEmail(emailValue)) {
      setError(email, 'Provide a valid email address')
    }
    else {
       setSuccess(email);
    }

    if (messageValue === '') {
        setError(message, 'Message is required');
    }

    else if(messageValue.length < 10)
    {
        setError(message, 'Message is too short');
    }
    else {
        setSuccess(message);
    }
}


function sendEmail(){
    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "miebiokodiedward@gmail.com",
        Password: "2A77DA3D4B63E19B0F848C91704F8AF71051",
        To: document.querySelector('#email').value,
        From: 'edwardmiebi31545@gmail.com',
        Subject: "This is the subject",
        Body: "And this is the body"
    }).then(
        message => alert(message)
    );
    
    return false;
}




