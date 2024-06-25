document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('trip-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Trip form submitted!');
    });

    document.getElementById('day-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Day form submitted!');
    });
});
