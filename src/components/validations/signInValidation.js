import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
    let errors = {};

    // if(!validator.isEmail(data.email)){
    //     errors.email = "Invalid email. (Example: john@gmail.com)";
    // }

    if(validator.isEmpty(data.email)){
        errors.email = "This field is required";
    }

    if(validator.isEmpty(data.password)){
        errors.password = "This field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

