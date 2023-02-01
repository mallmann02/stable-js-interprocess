import React from "react";

function LabeledInput (props) {

    const {
        inputValue,
        onChangeFn,
        labelText,
        placeholderText,
        inputType,
        maxLength
    } = props;

    return (
        <label>
            { labelText }
            <input
                placeholder={placeholderText}
                value={inputValue}
                onChange={(e) => onChangeFn(e.target.value)}
                type={inputType}
                maxLength={ maxLength || 999 }
            >
            </input>
        </label>
    );
}

export default LabeledInput;
