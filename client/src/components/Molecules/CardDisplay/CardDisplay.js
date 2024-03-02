import React from "react";
import PropTypes from "prop-types";
import "./CardDisplay.css";
import Card from "../../Atoms/Card/Card";

const CardDisplay = ({ type, emoji, flipped, children, onClick }) => {
  return (
    <Card onClick={onClick} className={`card-display ${type}-card ${flipped ? 'flipped' : ''}`}>
      {flipped ? (
        <div className="front">
          <span>{emoji}</span>
          <h1>{`${type} Card`} </h1>
          <span>{emoji}</span>
          {children}
        </div>
      ) : (
        <div className="back"></div>
      )}
    </Card>
  );
};

CardDisplay.propTypes = {
  type: PropTypes.oneOf(['cat', 'defuse', 'shuffle', 'exploding']).isRequired,
  emoji: PropTypes.string.isRequired,
  flipped: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CardDisplay;
