import React from "react";
import ReactDOM from "react-dom";
import './Modal.css'

function Modal({open, children}) {
    const portal = document.getElementById("portal");

    if (open === false) {
        document.getElementById("root").classList.remove("blured");
        return (null);
    }
    document.getElementById("root").classList.add("blured");
    return (ReactDOM.createPortal(
        <div className="modal-container">
            {children}
        </div>,
        portal)
    );
}

export default Modal;