import React, { useState } from 'react';
import Modal from './Modal';
import OpendayForm from './OpendayForm';

function OpendayModal({ buttonText, children }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmitChildren = () => {
        setIsOpen(false);
    }

    return (
        <div className="btn-modal-container">
            <button className="request-btn" onClick={() => {
                setIsOpen(true);
            }}>{buttonText}</button>
            <Modal open={isOpen}><OpendayForm handler={handleSubmitChildren} /></Modal>
        </div>
    );
}

export default OpendayModal;