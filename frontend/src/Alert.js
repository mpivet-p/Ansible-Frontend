import React, { useEffect, useState } from 'react';

function Alert({text}) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        setTimeout(() => {
          setVisible(false);
        }, 5000);
    }, [5000]);

    return (
        visible ? <div className="alert">{text}</div> : <> </>
    );
}

export default Alert;