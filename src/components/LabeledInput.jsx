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
        minLength=1,
        type="input",
        options,
        disabled,
        classNameSufix
    } = props;

    return (
        <label>
            { labelText }
            { type == "input"
                ? ( <input
                        className={`main-form__input ${classNameSufix}`}
                        placeholder={placeholderText}
                        value={inputValue}
                        onChange={(e) => onChangeFn(e.target.value)}
                        type={inputType}
                        maxLength={ maxLength || 999 }
                        required={required}
                        minLength={minLength}
                    /> )
                : ( <select
                        required
                        className={`main-form__select ${classNameSufix}`}
                        onChange={(e) => onChangeFn(e.target.value)}
                        disabled={disabled}
                    >
                        <option value="" selected disabled hidden>
                            {`Selecione o ${labelText.toLowerCase()} do paciente`}
                        </option>

                        {options.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>)
            }
        </label>
    );
}

export default LabeledInput;
