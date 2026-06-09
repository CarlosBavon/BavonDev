import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiSend } from 'react-icons/fi';
import api from '../../utils/api';
import './Contact.css';

const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', budget: '', message: '' });
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            await api.post('/api/contact', form);
            setStatus({ type: 'success', msg: 'Message sent successfully! I’ll get back to you soon.' });
            setForm({ name: '', email: '', phone: '', service: '', budget: '', message: '' });
        } catch (error) {
            const errMsg =
                error.response?.data?.message ||
                'Failed to send. Please email me directly at carlosbavon46@gmail.com';

            setStatus({ type: 'error', msg: errMsg });
        } finally {
            setLoading(false);
            setTimeout(() => setStatus(null), 6000);
        }
    };

    return (
        <section className="contact section-padding" id="contact" ref={ref}>
            <div className="container">
                <motion.div
                    className="contact__header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">Contact</span>
                    <h2 className="section-title">Let's Build Something</h2>
                    <p className="section-description">
                        Have a project in mind? Fill out the form and I'll get back to you within 24 hours.
                    </p>
                </motion.div>

                <motion.form
                    className="contact__form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="contact__form-grid">
                        <div className="input-group">
                            <input type="text" name="name" value={form.name} onChange={handleChange} className="input-field" placeholder="Full Name" required />
                        </div>
                        <div className="input-group">
                            <input type="email" name="email" value={form.email} onChange={handleChange} className="input-field" placeholder="Email Address" required />
                        </div>
                        <div className="input-group">
                            <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="input-field" placeholder="Phone Number" />
                        </div>
                        <div className="input-group">
                            <select name="service" value={form.service} onChange={handleChange} className="input-field">
                                <option value="">Select Service</option>
                                <option>Full Stack Development</option>
                                <option>Website Development</option>
                                <option>Mobile App Development</option>
                                <option>UI/UX Design</option>
                                <option>API Development</option>
                                <option>SaaS Development</option>
                                <option>E-commerce Systems</option>
                                <option>Dashboard Systems</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <select name="budget" value={form.budget} onChange={handleChange} className="input-field">
                                <option value="">Select Budget Range</option>
                                <option>Under Ksh.30,000</option>
                                <option>Ksh.30,000 - Ksh.50,000</option>
                                <option>Ksh.50,000 - Ksh.100,000</option>
                                <option>Ksh.100,000 - Ksh.200,000</option>
                                <option>Ksh.200,000+</option>
                                <option>Not Sure</option>
                            </select>
                        </div>
                        <div className="input-group contact__form-full">
                            <textarea name="message" value={form.message} onChange={handleChange} className="input-field" placeholder="Tell me about your project... (Message must be at least 10 characters)" rows={6} required />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-large" disabled={loading}>
                        <FiSend /> {loading ? 'Sending...' : 'Send Message'}
                    </button>
                    {status && (
                        <p
                            className={`contact__msg ${status.type === 'success' ? 'contact__msg--success' : 'contact__msg--error'
                                }`}
                        >
                            {status.msg}
                        </p>
                    )}
                </motion.form>
            </div>
        </section>
    );
};

export default Contact;