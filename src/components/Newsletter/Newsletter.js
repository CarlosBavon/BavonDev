import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import api from '../../utils/api';
import './Newsletter.css';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;
        try {
            await api.post('/api/newsletter', { email });
            setStatus('success');
            setEmail('');
        } catch {
            setStatus('error');
        }
        setTimeout(() => setStatus(null), 4000);
    };

    return (
        <form className="newsletter" onSubmit={handleSubmit}>
            <div className="newsletter__input-wrap">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="newsletter__input"
                    required
                    aria-label="Email for newsletter"
                />
                <button type="submit" className="newsletter__btn" aria-label="Subscribe">
                    <FiSend />
                </button>
            </div>
            {status === 'success' && <p className="newsletter__msg newsletter__msg--success">Subscribed!</p>}
            {status === 'error' && <p className="newsletter__msg newsletter__msg--error">Something went wrong.</p>}
        </form>
    );
};

export default Newsletter;