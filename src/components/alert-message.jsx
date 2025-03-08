import { useEffect, useState } from 'react';

export default function AlertMessage({ message, type = 'success', onClose }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
                if (onClose) onClose();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [message]);

    if (!visible) return null;

    return (
        <div className={`alert alert-${type} alert-dismissible`} role='alert'>
            <div className="fw-bold text-center">
                <i className='bi-check-circle-fill'></i> {message}
            </div>
            <button 
                type='button' 
                className='btn-close' 
                onClick={() => setVisible(false)} 
                aria-label='close'
            ></button>
        </div>
    );
}
