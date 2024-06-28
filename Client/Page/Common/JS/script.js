function openHome(){

    const iframe = document.getElementById('main-content-iframe');
    iframe.src = '../../Home/HTML/index.html';

    window.addEventListener('message', function(event) {
        if (event.data === 'closePopup') {
            iframe.src = 'about:blank';
        }
    });
}
function openTripMonitor() {
   
      const iframe = document.getElementById('main-content-iframe');
      iframe.src = '../../TripMonitor/HTML/index.html';  
      window.addEventListener('message', function(event) {
          if (event.data === 'closePopup') {
              iframe.src = 'about:blank';
          }
      });
}

document.addEventListener('DOMContentLoaded', function() {
    openHome();
});
