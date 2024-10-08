var acc = document.getElementsByClassName("accordion");
for (var i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}

    const scriptURL = 'https://script.google.com/macros/s/AKfycbzvZllr8KYIxhaaqBq6mEJZ9giMUKPTKGMYMNJwUidgw7SmhRU_11a3GZpWBT4nsB0Z7Q/exec';
    const form = document.getElementById('submit-form');

    form.addEventListener('submit', e => {
        e.preventDefault();
        fetch(scriptURL, { method: 'POST', body: new FormData(form)})
            .then(response => alert('Ви успішно підписались! Пітвердіть підписку в своїй пошті'))
            .catch(error => alert('Error submitting form: ' + error.message));
    });

