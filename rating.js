const csvUrl = 'YOUR_SHEET_URL';
        const reviewContainer = document.getElementById('reviewContainer');
        const viewFeedbackBtn = document.getElementById('viewFeedbackBtn');

        async function fetchReviews() {
            try {
                const response = await fetch(csvUrl);
                const csvData = await response.text();
                const rows = csvData.split('\n');
                const headers = rows[0].split(',');

                for (let i = 1; i < rows.length; i++) {
                    const values = rows[i].split(',');
                    if (values.length === headers.length) {
                        const reviewDiv = document.createElement('div');
                        reviewDiv.classList.add('review');
                        let reviewContent = '';
                        for (let j = 0; j < headers.length; j++) {
                            reviewContent += `<p><b>${headers[j]}:</b> ${values[j]}</p>`;
                        }
                        reviewDiv.innerHTML = reviewContent;
                        reviewContainer.appendChild(reviewDiv);
                    }
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        }
        viewFeedbackBtn.addEventListener('click', () => {
            reviewContainer.style.display = 'block'; // Show the feedback container
            fetchReviews(); // Fetch and display reviews when the button is clicked
        });
        reviewContainer.style.display = 'none';

        const allStar = document.querySelectorAll('.rating .star')
        const ratingValue = document.querySelector('.rating input')

        allStar.forEach((item, idx) => {
            item.addEventListener('click', function () {
                ratingValue.value = idx + 1

                allStar.forEach((i, iIdx) => {
                    i.classList.toggle('bxs-star', iIdx <= idx);
                    i.classList.toggle('bx-star', iIdx > idx);
                });
            });
        });
        const scriptURL = 'YOUR_SHEET_URL';
        const reviewForm = document.getElementById('reviewForm'); // Use getElementById instead of forms['submit-to-google-sheet']

        const notification = document.getElementById('notification');
    const closeNotificationBtn = document.getElementById('close-notification');

    const notificationSound = new Audio("Notification.mp3");
    const showNotification = () => {
        notification.style.display = 'block';
        setTimeout(() => {
            hideNotification();
        }, 3000); // Hide notification after 3 seconds (adjust as needed)
    };

    const hideNotification = () => {
        notification.style.display = 'none';
    };

        reviewForm.addEventListener('submit', e => {
            e.preventDefault();
            const formData = new FormData(reviewForm);

            fetch(scriptURL, {
                method: 'POST',
                body: formData
            })
                .then(response => {
                    if (response.ok) {
                        console.log('Review submitted successfully!', response);
                        showNotification();
                        notificationSound.play();
                        reviewForm.reset();
                    } else {
                        console.error('Review submission failed!', response);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });
        closeNotificationBtn.addEventListener('click', () => {
        hideNotification();
    });
