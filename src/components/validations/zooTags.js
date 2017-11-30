import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
    let errors = {};

    if(validator.isEmpty(data.zoo_name)){
        errors.animal_count = "All fields are required";
    }

    if(validator.isEmpty(data.animal_count)){
        errors.animal_count = "All fields are required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

