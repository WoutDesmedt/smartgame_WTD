'use strict';
(function () {

    const menuBtn = document.querySelector('#menu');
    const nav = document.querySelector('nav');

    menuBtn.addEventListener('click', function () {

        const expanded = this.getAttribute('aria-expanded') === "true";
        this.setAttribute('aria-expanded', !expanded);

        if (expanded) {
            nav.classList.remove('visible')
            nav.classList.add('hidden')
        } else {
            nav.classList.remove('hidden')
            nav.classList.add('visible')
        }
    })

})();