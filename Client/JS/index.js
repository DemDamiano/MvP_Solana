document.addEventListener("DOMContentLoaded", function() {
    let currentIndex = 0;
    const items = document.querySelectorAll('.carousel-item');

    function showNextItem() {
        items[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % items.length;
        items[currentIndex].classList.add('active');
    }

    setInterval(showNextItem, 3000); // Cambia immagine ogni 3 secondi

    const togglePassword = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');

    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

        // Cambia l'icona a seconda dello stato
        const icon = type === 'password' ? '../IMG/Login/Icon/showPssw.png' : '../IMG/Login/Icon/hidePssw.png';
        this.querySelector('img').setAttribute('src', icon);
    });
});
