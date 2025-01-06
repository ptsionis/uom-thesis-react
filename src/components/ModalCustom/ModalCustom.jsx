import React from "react";
import { FaCheck } from "react-icons/fa6";
import { CgClose } from "react-icons/cg";

import "./ModalCustom.css";

const ModalCustom = ({ modalMsg, isError, callback }) => {
  return (
    <div className="modal-form-wrapper popup-wrapper">
      <div className="modal-form">
        <span
          className={`modal-form-text ${
            isError ? null : "modal-form-text-fail"
          }`}
        >
          {modalMsg}
        </span>
        <button className="modal-form-close" onClick={callback}>
          {isError ? (
            <FaCheck color="green" size={"20px"} />
          ) : (
            <CgClose color="red" size={"20px"} />
          )}
        </button>
      </div>
    </div>
  );
};

export default ModalCustom;
