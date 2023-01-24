import React from "react";
import ReactDOM from "react-dom";
import './styles/Modal.css'

function Modal({open, setIsOpen, children}) {
    const portal = document.getElementById("portal");

    if (open === false) {
        document.getElementById("root").classList.remove("blured");
        return (null);
    }

    const handleKeyDown = (event) => {
        if (event.code === 'Escape') {
            console.log("Escape");
            setIsOpen(false);
            document.removeEventListener('keydown', handleKeyDown);
        }
    };

    document.addEventListener('keydown', handleKeyDown);

    document.getElementById("root").classList.add("blured");
    return (ReactDOM.createPortal(
        <div className="modal-container">
            {children}
        </div>,
        portal)
    );
}

export default Modal;