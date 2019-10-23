import {useState} from 'react';

//TODO - Comments

const useSignUpForm = () => {
    const [inputs, setInputs] = useState({}); //state variable to keep track of the field inputs
    const [validationErrors] = useState({}); //variable to contain all the input field errors. We use a state variable to update the page when rerendered

    /**
     * checks everything is in order after submitting
     * @param event submit
     */
    const handleSubmit = (event) => {
        let errorExists = false;
        if (event) {
            event.preventDefault();
        }

        for (const field of Object.values(validationErrors)){
            for (const error of Object.values(field)){
                if (error != null) {
                    errorExists = true;
                    break;
                }
            }
        }

        if(errorExists){
            alert("errors");
            return;
        }
        alert("No Errors");
    };

    /**
     * updates state when input changes
     * @param event field change
     */
    const handleInputChange = (event) => {
        event.persist();
        validateField(event.target);

        //The setInputs will rerender the page, also causing errors to rerender
        setInputs(
            inputs => ({...inputs, [event.target.name]: event.target.value})
            );
    };

    const displayError = (event) => {
        // let printedError = null;
        if (validationErrors[event.target.name]){
            for(const error of Object.values(validationErrors[event.target.name])){
                if (error != null){
                    document.querySelector(`p[for=${event.target.name}]`).innerHTML=error;
                    break;
                }
                document.querySelector(`p[for=${event.target.name}]`).innerHTML=null;
            }
            // document.querySelector(`p[for=${event.target.name}]`).innerHTML=validationErrors[event.target.name[0]]
        }
    };

    /**
     * Function that updates field errors
     * @param fieldname the field being updated
     */
    const validateField = (fieldname) => {
        let fieldLength = fieldname.value.length;

        //switch statement to update errors for fields accordingly
        switch(fieldname.name) {
            case 'displayName':
                validationErrors[fieldname.name] = {
                    ['inputError']: fieldname.value.match(/^([a-zA-Z]+\s)*[a-zA-Z]+$/) ? null : 'invalid name, your name can only contain letters',
                    ['lengthError']: (fieldLength > 2 && fieldLength < 20) ? null : 'invalid name length'
                };
                break;
            case 'userEmail':
                validationErrors[fieldname.name] = {
                    ['inputError'] : fieldname.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ? null : 'invalid email'
                };
                break;
            case 'userName':
                validationErrors[fieldname.name] = {
                    ['inputError'] : fieldname.value.match(/^[a-zA-Z0-9]+$/) ? null : 'invalid username, your name can only contain letters and numbers',
                    ['lengthError']: (fieldLength > 4 && fieldLength < 20) ? null : 'invalid user name length'
                };
                break;
            case 'userPassword':
                validationErrors[fieldname.name] = {
                    ['inputError'] : fieldname.value.match(/^[a-zA-Z0-9]+$/) ? null : 'invalid password',
                    ['lengthError'] : (fieldLength > 6 && fieldLength < 30) ? null : 'invalid password length'
                };
                break;
            case 'terms':
                validationErrors[fieldname.name] = {
                    ['inputError'] : fieldname.checked ? null : 'You must accept the terms',
                };
                break;
            default: break;

        }
    };

    return {
        handleSubmit,
        handleInputChange,
        displayError,
        inputs,
        validationErrors
    };


};

export default useSignUpForm;