import React from "react";

import '../styles/LabeledInput.css'

function LabeledInput (props) {

    const {
        inputValue,
        onChangeFn,
        labelText,
        placeholderText,
        inputType="text",
        maxLength,
        required=true,
        minLength=1
    } = props;

    return (
        <label>
            { labelText }
            <input
                className="main_form_input"
                placeholder={placeholderText}
                value={inputValue}
                onChange={(e) => onChangeFn(e.target.value)}
                type={inputType}
                maxLength={ maxLength || 999 }
                required={required}
                minLength={minLength}
            >
            </input>
        </label>
    );
}

export default LabeledInput;
