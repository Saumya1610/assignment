import React, { Children } from "react";
import "./Modal.css";
import Button from "../../Atoms/Button/Button";
import Input from "../../Atoms/Input/Input";
import PropTypes from "prop-types";


const Modal = ({ onClick, setOpenModal, title, className, children }) => {

  return (
    <div className="modal-background">
      <div className={`modal-container ${className}`}>
        <div className="modal-title">
          <h1>{title}</h1>
        </div>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-footer">
          <Button
            onClick={() => {
              setOpenModal(false);
            }}
            className="cancel-btn"
          >
            Cancel
          </Button>
          <Button className="submit-btn"
            onClick={onClick}>Continue</Button>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  setOpenModal: PropTypes.func,
  title: PropTypes.string,
  arr: PropTypes.array,
  playername: PropTypes.string,
  className: PropTypes.string,
};

export default Modal;
