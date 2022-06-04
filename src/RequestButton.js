import React from 'react';
import requestAndWait from './utils/requestAndWait.js';

function RequestButton({ buttonText, endpoint, vars }) {

    return (
        <button className="request-btn" onClick={() => {
            requestAndWait(endpoint, vars);
        }}>{buttonText}</button>
    );
}

export default RequestButton;