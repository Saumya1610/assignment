import React from "react";
import PropTypes from "prop-types";
import "./Button.css";


const Button = ({ onClick, type, disabled, className, children }) => {
    const buttonClasses = `button ${className || ''}`;
    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };
    return (
        <button
            onClick={handleClick}
            type={type}
            disabled={disabled}
            className={buttonClasses}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    onClick: PropTypes.func,
    type: PropTypes.oneOf(['button', 'submit']),
    disabled: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

export default Button;