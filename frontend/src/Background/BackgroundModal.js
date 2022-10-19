import React, { useState } from 'react';
import Modal from '../Modal';
import BackgroundForm from './BackgroundForm';

function BackgroundModal({ buttonText, children }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmitChildren = () => {
        setIsOpen(false);
    }

    return (
        <div className="btn-modal-container">
            <button className="request-btn" onClick={() => {
                setIsOpen(true);
            }}>{buttonText}</button>
            <Modal open={isOpen}><BackgroundForm handler={handleSubmitChildren} /></Modal>
        </div>
    );
}

export default BackgroundModal;