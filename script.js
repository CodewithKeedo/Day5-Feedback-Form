document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.star');
    const ratingError = document.getElementById('ratingError');
    const textArea = document.getElementById('textArea');
    const feedbackError = document.getElementById('feedbackError');
    const submitBtn = document.getElementById('submitBtn');
    const thanksMessage = document.getElementById('thanksMessage');

    // Check if all required elements exist
    if (!stars.length || !ratingError || !textArea || !feedbackError || !submitBtn || !thanksMessage) {
        console.error('One or more DOM elements are missing. Check your HTML IDs and classes.');
        return;
    }

    let rating = 0;

    // Handle stars click & hover
    stars.forEach((star, index) => {
        star.addEventListener('mouseover', () => highlightStars(index + 1));
        star.addEventListener('mouseout', () => highlightStars(rating));
        star.addEventListener('click', () => {
            rating = index + 1;
            highlightStars(rating);
            ratingError.textContent = ''; // Clear error
        });
    });

    function highlightStars(count) {
        stars.forEach((star, index) => {
            star.classList.toggle('filled', index < count);
        });
    }

    // Real-time feedback validation
    textArea.addEventListener('input', () => {
        feedbackError.textContent = textArea.value.trim() === '' ? 'Please write your feedback' : '';
    });

    // Handle submit
    submitBtn.addEventListener('click', () => {
        let valid = true;

        // Validate rating
        if (rating === 0) {
            ratingError.textContent = 'Please select a star rating';
            valid = false;
        } else {
            ratingError.textContent = '';
        }

        // Validate feedback
        if (textArea.value.trim() === '') {
            feedbackError.textContent = 'Please write your feedback';
            valid = false;
        } 
        else if(textArea.value.length < 10){
            feedbackError.textContent = 'Feedback so short';
            valid = false;
        }
        else {
            feedbackError.textContent = '';
        }

        // Show success if valid
        if (valid) {
            thanksMessage.textContent = `Thank you! You rated us ${rating} star(s) and said: "${textArea.value.trim()}"`;
            textArea.value = ''; // Clear textarea
            rating = 0; // Reset rating
            highlightStars(0); // Clear stars
        } else {
            thanksMessage.textContent = '';
        }
    });
});