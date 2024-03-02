import React from "react";
import PropTypes from "prop-types";
import "./Input.css";


const Input = ({ onChange, placeholder, value, type, className }) => {

    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`input-field ${className}`}
        />
    );
};

Input.propTypes = {
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
    type: PropTypes.string,
    className: PropTypes.string,
};

export default Input;