import {FormValidator} from './formValidator.js'
const form = document.querySelector('#myVerySpecialForm');

try{
    const formValidator = new FormValidator(form);
    formValidator.addValidator({
        name: 'firstname',
        method: (field) => field.value.trim().length > 0,
        message: 'Voornaam is een verplicht veld en werd niet ingevuld'
    })
    formValidator.addValidator({
        name: 'name',
        method: (field) => field.value.trim().length > 0,
        message: 'Naam is een verplicht veld en werd niet ingevuld'
    })
    formValidator.addValidator({
        name: 'email',
        method: (field) => field.value.trim().length > 0,
        message: 'Email is een verplicht veld en werd niet ingevuld'
    })
    formValidator.addValidator({
        name: 'message',
        method: (field) => field.value.trim().length > 0,
        message: 'Message is een verplicht veld en werd niet ingevuld'
    })
    formValidator.addValidator({
        name: 'score',
        method: (field) => (field.value >= 1 && field.value <= 5),
        message: 'Score is een verplicht veld en werd niet ingevuld of werd foutief ingevuld (1-5)'
    })
    formValidator.addValidator({
        name: 'privacy',
        method: (field) => field.checked,
        message: 'Privacy agreement is een verplicht veld en werd niet aangeduid'
    })

    form.addEventListener('submit', function(event) {
        event.preventDefault()

    })
}

catch (error){
    console.log(error)
}