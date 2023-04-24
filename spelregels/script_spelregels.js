'use-strict';
(function () {

    const stapbutton1 = document.querySelector('.buttonstap1');
    const stapbutton2 = document.querySelector('.buttonstap2');
    const stapbutton3 = document.querySelector('.buttonstap3');
    const titel = document.querySelector('.text-stap h2');
    const tekst = document.querySelector('.text-stap p');
    const image = document.querySelector('.fotospeelbord img')

    stapbutton1.addEventListener('click', function () {
        titel.textContent = "Stap 1";
        tekst.textContent = "Kies een opdracht. Plaats de kat(ten) en boom op het spelbord, indien nodig. Deze speelstukken mag je daarna niet meer verplaatsen. Indien een kat of de boom niet in de opdracht getoond wordt, dan heb je deze ook niet nodig voor de oplossing.";
        if(stapbutton2.classList.contains('active2')){
            stapbutton2.classList.remove('active2');
            stapbutton1.classList.add('active2');
            image.classList.remove('foto2');
            image.classList.add('foto1');
        }

        if(stapbutton3.classList.contains('active2')){
            stapbutton3.classList.remove('active2');
            stapbutton1.classList.add('active2');
            image.classList.remove('foto3');
            image.classList.add('foto1');
        }
    });

    stapbutton2.addEventListener('click', function () {
        titel.textContent = "Stap 2";
        tekst.textContent = "Plaats de 4 honden op het spelbord, zodat de oplossing overeenkomt met de instructies die in de opdracht gegeven zijn.";

        if(stapbutton1.classList.contains('active2')){
            stapbutton1.classList.remove('active2');
            stapbutton2.classList.add('active2');
            image.classList.remove('foto1');
            image.classList.add('foto2');
        }

        if(stapbutton3.classList.contains('active2')){
            stapbutton3.classList.remove('active2');
            stapbutton2.classList.add('active2');
            image.classList.remove('foto3');
            image.classList.add('foto2');

        }
    });

    stapbutton3.addEventListener('click', function () {
        titel.textContent = "Stap 3";
        tekst.textContent = "Er is maar één oplossing die je achteraan in het boekje kan terugvinden.";


        if(stapbutton1.classList.contains('active2')){
            stapbutton1.classList.remove('active2');
            stapbutton3.classList.add('active2');
            image.classList.remove('foto1');
            image.classList.add('foto2');
        }

        if(stapbutton2.classList.contains('active2')){
            stapbutton2.classList.remove('active2');
            stapbutton3.classList.add('active2');
            image.classList.remove('foto2');
            image.classList.add('foto3');
        }
    });

})();
