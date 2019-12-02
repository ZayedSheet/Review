import {useState} from 'react';


/**
 * creates a generic hook for sign up forms (identifies behaviors for submit and inputchange)
 * @returns {{displayError: displayError, checkSubmit: checkSubmit, inputs: {}, validationErrors: {}, handleInputChange: handleInputChange}}
 */
const useForm = () => {
    const [inputs, setInputs] = useState({}); //state variable to keep track of the field inputs
    const [validationErrors] = useState({}); //variable to contain all the input field errors. We use a state variable to update the page when rerendered
    const [wasFocused] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
    const fieldNames = {password: 'password', name: 'name', username: 'username', email: 'email'};


    /**
     * checks everything is in order after submitting
     * @param event submit
     */
    const checkSubmit = (event) => {
        let errorExists = false; //initializes a variable to check if any errors exist
        if (event) {
            event.preventDefault();
        }

        for (const field of Object.values(validationErrors)){ //for every elements in validationErrors (every form error)
            for (const error of Object.values(field)){ //for every error within those form errors
                if (error != null) { //if the error is not null (an error exists)
                    errorExists = true; //there exists an error
                    break;
                }
            }
        }

        if(errorExists){ //if an error was found
            return false;
        }
        return true;
    };

    /**
     * updates state when input changes
     * @param event field being changed
     */
    const handleInputChange = (event) => {
        event.persist();
        validateField(event.target);//checks for errors within the current form being changed

        //The setInputs will rerender the page, also causing errors to rerender
        setInputs(
            inputs => ({...inputs, [event.target.name]: event.target.value})
            );

        if (wasFocused[event.target.name]){
            for(const error of Object.values(validationErrors[event.target.name])){ //for every error in this form's error object
                if (error != null){ //if the error is not null (an error exists)
                    setErrorMessage(
                        errorMessage => ({...errorMessage, [event.target.name]: error})
                    );
                    return;//here we return rather than concatenating errors because we'd only like to display one error at a time
                }
            }
            setErrorMessage(
                errorMessage => ({...errorMessage, [event.target.name]: ''})
            );
        }
    };

    /**
     * function to display a form's error if an error exists.
     * @param event the current form
     */
    const displayError = (event) => {
        event.persist();
        if (validationErrors[event.target.name]){ //if the form has its error attribute added already (the user didnt just leave the field empty)
            wasFocused[event.target.name] = true;
            for(const error of Object.values(validationErrors[event.target.name])){ //for every error in this form's error object
                if (error != null){ //if the error is not null (an error exists)
                    setErrorMessage(
                        errorMessage => ({...errorMessage, [event.target.name]: error})
                    );
                    return;//here we return rather than concatenating errors because we'd only like to display one error at a time
                }
            }
            setErrorMessage(
                errorMessage => ({...errorMessage, [event.target.name]: ''})
            );
        }
    };


    /**
     * Function that updates field errors
     * @param fieldname the field being updated
     */
    const validateField = (fieldname) => {
        let fieldLength = fieldname.value.length;//gets the # of characters in the field

        //switch statement to update errors for fields accordingly
        switch(fieldname.name) {
            case fieldNames.name:
                validationErrors[fieldname.name] = {
                    'inputError': fieldname.value.match(/^([a-zA-Z]+\s)*[a-zA-Z]+$/) ? null : 'invalid name, your name can only contain letters', //regex that matches for names. Names cannot begin or end with whitespace. Only one whitespace is allowed between strings
                    'lengthError': (fieldLength > 2 && fieldLength < 20) ? null : 'invalid name length' //name length must be greater than 2 and less than 20
                };
                break;
            case fieldNames.email:
                validationErrors[fieldname.name] = {
                    'inputError' : fieldname.value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ? null : 'invalid email' //regex that matches for emails. Allows special characters and ensures an @ is followed by a string which is followed by .
                };
                break;
            case fieldNames.username:
                validationErrors[fieldname.name] = {
                    'inputError' : fieldname.value.match(/^[a-zA-Z0-9]+$/) ? null : 'invalid username, your name can only contain letters and numbers', //regex that matches for names with letters and numbers only
                    'lengthError': (fieldLength > 4 && fieldLength < 20) ? null : 'invalid user name length' //ensures username is greater than 4 and less than 20 characters
                };
                break;
            case fieldNames.password:
                validationErrors[fieldname.name] = {
                    // should password have regex? Revisit later
                    // ['inputError'] : fieldname.value.match(//) ? null : 'invalid password',
                    'lengthError' : (fieldLength > 6 && fieldLength < 30) ? null : 'invalid password length' //ensures password is greater than 6 and less than 30 characters
                };
                break;
            case 'terms':
                validationErrors[fieldname.name] = {
                    'inputError' : fieldname.checked ? null : 'You must accept the terms', //ensures user has checked the agree to terms checkbox
                };
                break;
            default: break;

        }
    };

    return { //returns the following functions and state variables
        checkSubmit,
        handleInputChange,
        displayError,
        inputs,
        setInputs,
        validationErrors,
        errorMessage,
        fieldNames
    };


};

export default useForm;