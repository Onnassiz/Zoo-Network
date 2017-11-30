import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
    let errors = {};

    if(validator.isEmpty(data.zoo_name)){
        errors.zoo_name = "This field is required";
    }

    if(validator.isEmpty(data.website)){
        errors.website = "This field is required";
    }


    if(validator.isEmpty(data.street)){
        errors.street = "This field is required";
    }

    if(validator.isEmpty(data.county)){
        errors.county = "This field is required";
    }

    if(validator.isEmpty(data.postcode)){
        errors.postcode = "This field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
