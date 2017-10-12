function modalClose() {
    if (location.hash == '#openAnnForm') {
        location.hash = '';
    }
}

// Handle ESC key (key code 27)
document.addEventListener('keyup', function(e) {
    if (e.keyCode == 27) {
        modalClose();
    }
});

var modal = document.querySelector('#close');

// Handle click on the modal container
modal.addEventListener('click', modalClose, false);

// Prevent event bubbling if click occurred within modal content body
modal.children[0].addEventListener('click', function(e) {
    e.stopPropagation();
}, false);