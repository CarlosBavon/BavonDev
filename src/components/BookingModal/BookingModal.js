import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import api from '../../utils/api';
import './BookingModal.css';

const BookingModal = ({ isOpen, onClose }) => {
    const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/api/bookings', form);
            setStatus('success');
            setForm({ name: '', email: '', phone: '', service: '', message: '' });
            setTimeout(() => { setStatus(null); onClose(); }, 2000);
        } catch {
            setStatus('error');
        }
        setLoading(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="modal"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="modal__close" onClick={onClose} aria-label="Close modal">
                            <FiX />
                        </button>
                        <h2 className="modal__title">Book A Consultation</h2>
                        <p className="modal__desc">Fill in your details and I will get back to you within 24 hours.</p>

                        <form className="modal__form" onSubmit={handleSubmit}>
                            <div className="input-group">
                                <input type="text" name="name" value={form.name} onChange={handleChange} className="input-field" placeholder="Your Name" required />
                            </div>
                            <div className="input-group">
                                <input type="email" name="email" value={form.email} onChange={handleChange} className="input-field" placeholder="Email Address" required />
                            </div>
                            <div className="input-group">
                                <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="input-field" placeholder="Phone Number" />
                            </div>
                            <div className="input-group">
                                <select name="service" value={form.service} onChange={handleChange} className="input-field" required>
                                    <option value="">Select Service</option>
                                    <option>Full Stack Development</option>
                                    <option>Website Development</option>
                                    <option>Mobile App Development</option>
                                    <option>UI/UX Design</option>
                                    <option>API Development</option>
                                    <option>SaaS Development</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <textarea name="message" value={form.message} onChange={handleChange} className="input-field" placeholder="Tell me about your project..." rows={4} />
                            </div>
                            <button type="submit" className="btn btn-primary btn-large" style={{ width: '100%' }} disabled={loading}>
                                {loading ? 'Sending...' : 'Submit Booking Request'}
                            </button>
                            {status === 'success' && <p className="modal__msg modal__msg--success">Booking request sent! We will confirm shortly.</p>}
                            {status === 'error' && <p className="modal__msg modal__msg--error">Something went wrong. Please try again.</p>}
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BookingModal;