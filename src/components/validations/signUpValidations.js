import validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import passwordSchema from 'password-validator';

function isStrongPassword(password) {
    let schema = new passwordSchema();
    let error = '';
    schema
        .isMin(8)
        .isMax(100)
        .has().uppercase()
        .has().lowercase()
        .has().digits()
        .not().spaces();

    let isValidResult = schema.validate(password, { list: true });

    if(!isEmpty(isValidResult)){
        switch (isValidResult[0]){
            case "isMin":
                error = "Password must contain at least 8 characters";
                break;
            case "uppercase":
                error = "Password must contain at least 1 uppercase character";
                break;
            case "lowercase":
                error = "Password must contain at least 1 lowercase character";
                break;
            case "digits":
                error = "Password must contain at least 1 numeric character";
                break;
            case "spaces":
                error = "Space character is not allowed in the password string";
                break;
            case "isMax":
                error = "Password must not exceed 100 characters";
                break;
            default:
                break;
        }
    }
    return {
        error,
        isStrongPwd: isEmpty(isValidResult)
    };
}

export default function validateInput(data) {
    let errors = {};
    const { error, isStrongPwd } = (validator.isEmpty(data.password)) ? true : isStrongPassword(data.password);

    if(validator.isEmpty(data.first_name)){
        errors.first_name = "This field is required";
    }

    if(validator.isEmpty(data.last_name)){
        errors.last_name = "This field is required";
    }

    if(!validator.isEmail(data.email)){
        errors.email = "Invalid email. (Example: john@gmail.com)";
    }

    if(validator.isEmpty(data.email)){
        errors.email = "This field is required";
    }

    if(!validator.equals(data.password, data.password_confirmation)){
        errors.password = "Password does not match Password Confirmation"
    }

    if(!isStrongPwd){
        errors.password = error;
    }

    if(validator.isEmpty(data.password)){
        errors.password = "This field is required";
    }

    if(validator.isEmpty(data.password_confirmation)){
        errors.password_confirmation = "This field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
