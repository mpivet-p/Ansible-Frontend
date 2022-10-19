import React, { useState } from 'react';
import Modal from '../Modal';
import OpenLinkForm from './OpenLinkForm';

function OpenLinkModal({ buttonText, children }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmitChildren = () => {
        setIsOpen(false);
    }

    return (
        <div className="btn-modal-container">
            <button className="request-btn" onClick={() => {
                setIsOpen(true);
            }}>{buttonText}</button>
            <Modal open={isOpen}><OpenLinkForm handler={handleSubmitChildren} /></Modal>
        </div>
    );
}

export default OpenLinkModal;