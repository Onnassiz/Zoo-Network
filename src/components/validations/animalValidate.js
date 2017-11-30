import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
    let errors = {};

    if(validator.isEmpty(data.common_name)){
        errors.common_name = "This field is required";
    }

    if(validator.isEmpty(data.animal_class)){
        errors.animal_class = "This field is required";
    }


    if(validator.isEmpty(data.family)){
        errors.family = "This field is required";
    }

    if(validator.isEmpty(data.order)){
        errors.order = "This field is required";
    }

    if(validator.isEmpty(data.genus)){
        errors.genus = "This field is required";
    }

    if(validator.isEmpty(data.species)){
        errors.species = "This field is required";
    }

    if(validator.isEmpty(data.description)){
        errors.description = "This field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
