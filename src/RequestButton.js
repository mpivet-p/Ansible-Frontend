import React from 'react';
import requestAndWait from './utils/requestAndWait.js';

function RequestButton({ buttonText, endpoint, taskName }) {

    return (
        <button className="request-btn" onClick={() => {
            requestAndWait(endpoint, taskName);
        }}>{buttonText}</button>
    );
}

export default RequestButton;