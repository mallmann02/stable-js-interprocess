import React from "react";

function LabeledInput (props) {

    const {
        inputValue,
        onChangeFn,
        labelText,
        placeholderText,
        inputType
    } = props;

    return (
        <label>
            { labelText }
            <input
                placeholder={placeholderText}
                value={inputValue}
                onChange={(e) => onChangeFn(e.target.value)}
                type={inputType}
            >
            </input>
        </label>
    );
}

export default LabeledInput;
