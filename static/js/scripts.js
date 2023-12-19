/*!
* Start Bootstrap - Stylish Portfolio v6.0.6 (https://startbootstrap.com/theme/stylish-portfolio)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-stylish-portfolio/blob/master/LICENSE)
*/
window.addEventListener('DOMContentLoaded', event => {

    const sidebarWrapper = document.getElementById('sidebar-wrapper');
    let scrollToTopVisible = false;
    // Closes the sidebar menu
    const menuToggle = document.body.querySelector('.menu-toggle');
    menuToggle.addEventListener('click', event => {
        event.preventDefault();
        sidebarWrapper.classList.toggle('active');
        _toggleMenuIcon();
        menuToggle.classList.toggle('active');
    })

    // Closes responsive menu when a scroll trigger link is clicked
    var scrollTriggerList = [].slice.call(document.querySelectorAll('#sidebar-wrapper .js-scroll-trigger'));
    scrollTriggerList.map(scrollTrigger => {
        scrollTrigger.addEventListener('click', () => {
            sidebarWrapper.classList.remove('active');
            menuToggle.classList.remove('active');
            _toggleMenuIcon();
        })
    });

    function _toggleMenuIcon() {
        const menuToggleBars = document.body.querySelector('.menu-toggle > .fa-bars');
        const menuToggleTimes = document.body.querySelector('.menu-toggle > .fa-xmark');
        if (menuToggleBars) {
            menuToggleBars.classList.remove('fa-bars');
            menuToggleBars.classList.add('fa-xmark');
        }
        if (menuToggleTimes) {
            menuToggleTimes.classList.remove('fa-xmark');
            menuToggleTimes.classList.add('fa-bars');
        }
    }

    // Scroll to top button appear
    document.addEventListener('scroll', () => {
        const scrollToTop = document.body.querySelector('.scroll-to-top');
        if (document.documentElement.scrollTop > 100) {
            if (!scrollToTopVisible) {
                fadeIn(scrollToTop);
                scrollToTopVisible = true;
            }
        } else {
            if (scrollToTopVisible) {
                fadeOut(scrollToTop);
                scrollToTopVisible = false;
            }
        }
    })
})

function fadeOut(el) {
    el.style.opacity = 1;
    (function fade() {
        if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
};

function fadeIn(el, display) {
    el.style.opacity = 0;
    el.style.display = display || "block";
    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
};

// popup.js

function openForm(formId) {
    document.getElementById(formId).style.display = "block";
}

function closeForm(formId) {
    document.getElementById(formId).style.display = "none";
}

// Close the form if the user clicks outside the form
window.onclick = function (event) {
    if (event.target.className === 'popup-form') {
        event.target.style.display = "none";
    }
};

document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById('signupForm');

    signupForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Get the selected role
        const roleSelect = document.getElementById('role');
        const selectedRole = roleSelect.value;

        // Perform your desired action here, such as sending the data to the server
        // For now, let's just show an alert with the selected role
        alert('Selected Role: ' + selectedRole);

        // Redirect to /home
        window.location.href = '/home';
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Get the username and password (add validation if needed)
        const username = document.getElementById('usernamelogin').value;
        const password = document.getElementById('passwordlogin').value;

        // Perform your desired action here, such as sending the login data to the server
        // For now, let's just show an alert with the entered username and password
        alert('Login attempt with Username: ' + username + ' and Password: ' + password);

        // Redirect to /home
        window.location.href = '/home';
    });
});

// Dummy data for initial chat messages
var chatData = [
    { user: 'Teacher', message: 'Welcome to the forum!', timestamp: '12:00 PM' },
    { user: 'Student', message: 'Hi there!', timestamp: '12:05 PM' },
    { user: 'Teacher', message: 'Let\'s discuss math topics here.', timestamp: '12:10 PM' }
];

// Function to display chat messages in the chat container
function displayMessages() {
    var chatContainer = document.getElementById('chat-container');
    chatContainer.innerHTML = '';

    chatData.forEach(function (message) {
        var messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message');
        messageDiv.innerHTML = '<strong>' + message.user + '</strong>: ' + message.message + ' <span class="timestamp">(' + message.timestamp + ')</span>';
        chatContainer.appendChild(messageDiv);
    });

    // Scroll to the bottom of the chat container
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Function to send a new message
function sendMessage() {
    var messageInput = document.getElementById('message-input');
    var messageText = messageInput.value.trim();

    if (messageText !== '') {
        // Get the current timestamp
        var timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Add the new message to the chat data
        chatData.push({ user: 'Student', message: messageText, timestamp: timestamp });

        // Display the updated messages
        displayMessages();

        // Clear the message input
        messageInput.value = '';
    }
}

// Display initial messages on page load
displayMessages();

// Function to send an announcement
function sendAnnouncement() {
    const messageInput = document.getElementById('message-input');
    const chatContainer = document.getElementById('chat-container');

    // Get the message content
    const messageContent = messageInput.value;

    // Create a new message element
    const messageElement = document.createElement('div');
    messageElement.className = 'chat-message';
    messageElement.innerHTML = `<p>${messageContent}</p><span class="timestamp">Just now</span>`;

    // Remember the current scroll position
    const shouldScrollToBottom = chatContainer.scrollTop + chatContainer.clientHeight === chatContainer.scrollHeight;

    // Append the message to the chat container
    chatContainer.appendChild(messageElement);

    // Restore the scroll position if it was at the bottom
    if (shouldScrollToBottom) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // Clear the input field
    messageInput.value = '';
}

// Function to upload an image
function uploadImage() {
    const imageInput = document.getElementById('image-input');
    const chatContainer = document.getElementById('chat-container');

    // Get the selected image file
    const imageFile = imageInput.files[0];

    // Create a new image element
    const imageElement = document.createElement('img');
    imageElement.src = URL.createObjectURL(imageFile);
    imageElement.className = 'uploaded-image';

    // Remember the current scroll position
    const shouldScrollToBottom = chatContainer.scrollTop + chatContainer.clientHeight === chatContainer.scrollHeight;

    // Append the image to the chat container
    chatContainer.appendChild(imageElement);

    // Restore the scroll position if it was at the bottom
    if (shouldScrollToBottom) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // Clear the input field
    imageInput.value = '';
}

        function changeProfilePicture() {
            // Implement logic to change profile picture
            alert('Implement logic to change profile picture');
        }

        function updateName() {
            var name = document.getElementById('name').value;
            // Implement logic to update name
            alert('Implement logic to update name: ' + name);
        }

        function updatePassword() {
            var password = document.getElementById('password').value;
            var confirmPassword = document.getElementById('confirm-password').value;

            if (password === confirmPassword) {
                // Implement logic to update password
                alert('Implement logic to update password');
            } else {
                alert('Password and Confirm Password do not match. Please try again.');
            }
        }

function showImg(id) {
    var img = document.getElementById(id);
    if (img.style.display === "none") {
        img.style.display = "block";
    } else {
        img.style.display = "none";
    }
}

