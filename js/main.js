(() => {
    console.log("fired");

    let button = document.querySelector("#button");

    function showHideLightbox() {
        lightBox.classList.toggle('show-lightbox');
    }

    button.addEventListener("click", hamburgerMenu, false);

    sigils.forEach(sigil => sigil.addEventListener("click", showHideLightbox));
})();