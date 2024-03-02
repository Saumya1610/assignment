import React from "react";
import PropTypes from "prop-types";
import "./Card.css";

const Card = ({ children, className, onClick }) => {
    return (
        <div onClick={onClick}  className={`${className} card`}>
            {children}
        </div>
    );
};

Card.propTypes = {
children: PropTypes.node.isRequired,
};

export default Card;