"use strict";
(function () {

    class FormValidator {

        errors = []
        validators = []

        constructor(form) {}
        addValidator(validator) {}

    }

    const form = document.querySelector('#downloadForm')
    if (!form) { return }

    const formValidator = new FormValidator(form)
    formValidator.addValidator({name: 'firstname',method})
    formValidator.addValidator({name: 'name',method})
    formValidator.addValidator({name: 'email',method})
    formValidator.addValidator({name: 'beschrijving',method})

    formValidator.addValidator({
        name: 'Voornaam',
        method: field => field.value.trim().empty(),
        message: 'voeg voornaam toe'
    })

    formValidator.addValidator({
        name: 'Naam',
        method: field => field.value.trim().empty(),
        message: 'voeg naam toe'
    })

    formValidator.addValidator({
        name: 'email',
        method: field => field.value.trim().match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
        message: 'E-mail voldoet niet aan het opgegeven patroon'
    })

    formValidator.addValidator({
        name: 'beschrijving',
        method: field => field.value.trim().empty(),
        message: 'voeg beschrijving toe'
    })


    form.addEventListener('Send', function (event) {
        event.preventDefault()
        console.log('Send')
        this.reset()
    })
})();
