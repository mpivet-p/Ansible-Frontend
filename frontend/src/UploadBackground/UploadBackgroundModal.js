import React, { useState } from 'react';
import Modal from '../Modal';
import UploadBackgroundForm from './UploadBackgroundForm';

function UploadBackgroundModal({ buttonText, children }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmitChildren = () => {
        setIsOpen(false);
    }

    return (
        <div className="btn-modal-container">
            <button className="request-btn" onClick={() => {
                setIsOpen(true);
            }}>{buttonText}</button>
            <Modal open={isOpen}><UploadBackgroundForm handler={handleSubmitChildren} /></Modal>
        </div>
    );
}

export default UploadBackgroundModal;