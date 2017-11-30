import React from 'react';
import isEmpty from 'validator/lib/isEmpty';

const TextFieldGroup = ({label, data_error, name, value, type, onChange}) => {
    return(
        <div className="row">
            <div className="input-field col s4">
                <input
                    id={name}
                    type={type}
                    value={value}
                    name={name}
                    onChange={onChange}
                    className= { isEmpty(data_error) ? "" : "invalid" }
                />
                <label
                    htmlFor={name}
                    data-error={data_error}>
                    {label}
                </label>
            </div>
        </div>
    );
}
export default TextFieldGroup;
