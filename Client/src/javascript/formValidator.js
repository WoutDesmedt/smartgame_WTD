export class FormValidator {

    validators = [];
    errors = [];

    constructor(form) {
        if (!form) {
            throw new Error('Form is undefined');
        }
        this.form = form;
        this.form.addEventListener('submit', (event) => {
            this.errors = [];
            if (this.validate()) {
                this.onSubmit(event);
            }
        });
    }

    addValidator(validator) {
        this.validators.push({
            ...validator,
            field: this.form.elements[validator.name]
        })
    }

    validate() {
        this.removeInlineError();

        for (let i = 0; i < this.validators.length; i++) {
            if (!this.validators[i].method(this.validators[i].field)) {
                if (this.errors.includes(this.validators[i])) {
                    return;
                }
                this.errors.push(this.validators[i]);
            }
        }
        this.showInlineError();

        return this.errors.length === 0;
    }

    createInlineError(error) {
        const span = document.createElement("span");
        span.classList.add('field-error');
        span.innerHTML = error.message;
        span.setAttribute('id', `${error.name}-error`);
        return span;
    }

    showInlineError() {
        for (let i = 0; i < this.errors.length; i++) {
            const error = this.errors[i];
            const errorElement = this.createInlineError(error);
            const field = error.field;

            if (field instanceof NodeList) {
                field.forEach(node => {
                    node.classList.add('invalid');
                    node.setAttribute('aria-invalid', 'true');
                    node.setAttribute('aria-describedby', errorElement.id);
                });
                const fieldSet = field[0].closest('fieldset');
                if (fieldSet) {
                    const legend = fieldSet.querySelector('legend');
                    if (legend) {
                        legend.appendChild(errorElement);
                    }
                }
            } else {
                field.classList.add('invalid');
                field.setAttribute('aria-invalid', 'true');
                const label = document.querySelector(`label[for=${field.id}]`);
                if (label) {
                    label.appendChild(errorElement);
                }
                field.setAttribute('aria-describedby', errorElement.id);
            }
        }
    }

    removeInlineError() {
        this.form.querySelectorAll('.field-error')
            .forEach(element => element.remove());

        this.form.querySelectorAll('.invalid')
            .forEach(element => {
                element.removeAttribute('aria-invalid');
                element.removeAttribute('aria-describedby');
                element.classList.remove('invalid');
            });
    }

    showSummary() {
        // toon de samenvatting van de ingediende gegevens
    }


    onSubmit(event) {
        event.preventDefault();

        this.removeInlineError();
        let nameElement = document.querySelector('#name')
        let firstnameElement = document.querySelector('#firstname')
        let emailElement = document.querySelector('#email')
        let messageElement = document.querySelector('#message')
        let scoreElement = document.querySelector('#score')

        const data = {
            name: nameElement.value,
            fname: firstnameElement.value,
            email: emailElement.value,
            message: messageElement.value,
            score: parseInt(scoreElement.value)

        }


        fetch('http://localhost:3000/api/v1/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(data)
        })
            .then(response =>
                response.json()

            )
            .then(result => {
                window.location.href = '../thanksforthereview/';

            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}
