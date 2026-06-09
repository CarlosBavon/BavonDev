import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
    FiCode, FiGlobe, FiSmartphone, FiFigma,
    FiServer, FiCloud, FiShoppingCart, FiMonitor,
    FiTool
} from 'react-icons/fi';
import './Services.css';

const services = [
    { icon: <FiCode />, title: 'Full Stack Development', desc: 'End-to-end web applications with React, Node.js & MongoDB', tags: ['React', 'Node', 'MongoDB'] },
    { icon: <FiGlobe />, title: 'Website Development', desc: 'High-performance business websites with modern tech stacks', tags: ['React', 'Next.js'] },
    { icon: <FiSmartphone />, title: 'Mobile App Development', desc: 'Cross-platform mobile applications with React Native & Expo', tags: ['React Native', 'Expo'] },
    { icon: <FiFigma />, title: 'UI/UX Design', desc: 'User-centered design with wireframing, prototyping & Figma', tags: ['Figma', 'Prototyping'] },
    { icon: <FiServer />, title: 'API Development', desc: 'RESTful & secure API architecture with Node.js & Express', tags: ['REST', 'Express'] },
    { icon: <FiCloud />, title: 'SaaS Development', desc: 'Scalable SaaS platforms with subscription & user management', tags: ['SaaS', 'Stripe'] },
    { icon: <FiShoppingCart />, title: 'E-commerce Systems', desc: 'Custom ordering & payment platforms with admin dashboards', tags: ['E-commerce', 'Payments'] },
    { icon: <FiMonitor />, title: 'Dashboard Systems', desc: 'Admin portals & analytics dashboards with real-time data', tags: ['Admin', 'Analytics'] },
    { icon: <FiTool />, title: 'Maintenance & Support', desc: 'Ongoing technical support, updates & performance optimization', tags: ['Support', 'Updates'] },
];

const Services = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

    return (
        <section className="services section-padding" id="services" ref={ref}>
            <div className="container">
                <motion.div
                    className="services__header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">Services</span>
                    <h2 className="section-title">What I Build</h2>
                    <p className="section-description">
                        Premium development services for businesses that demand quality, performance, and exceptional user experiences.
                    </p>
                </motion.div>

                <div className="services__grid">
                    {services.map((service, i) => (
                        <motion.div
                            key={service.title}
                            className="service-card"
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
                            whileHover={{ y: -6, transition: { duration: 0.3 } }}
                        >
                            <div className="service-card__icon">{service.icon}</div>
                            <h3 className="service-card__title">{service.title}</h3>
                            <p className="service-card__desc">{service.desc}</p>
                            <div className="service-card__tags">
                                {service.tags.map((tag) => (
                                    <span key={tag} className="service-card__tag">{tag}</span>
                                ))}
                            </div>
                            <div className="service-card__border" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;