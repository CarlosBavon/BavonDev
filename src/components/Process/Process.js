import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Process.css';

const steps = [
    { number: '01', title: 'Discovery', desc: 'Understanding your goals, users, and requirements.' },
    { number: '02', title: 'Planning', desc: 'Architecture, wireframes, and technology decisions.' },
    { number: '03', title: 'Design', desc: 'High-fidelity UI/UX design and prototyping.' },
    { number: '04', title: 'Development', desc: 'Clean code with modern frameworks and best practices.' },
    { number: '05', title: 'Testing', desc: 'Rigorous QA, performance audits, and security checks.' },
    { number: '06', title: 'Deployment', desc: 'Launch, monitoring, and ongoing support.' },
];

const Process = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <section className="process section-padding" id="process" ref={ref}>
            <div className="container">
                <motion.div
                    className="process__header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">Process</span>
                    <h2 className="section-title">How I Work</h2>
                </motion.div>

                <div className="process__timeline">
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.number}
                            className="process__step"
                            initial={{ opacity: 0, x: -20 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                        >
                            <div className="process__step-marker">
                                <span className="process__step-number">{step.number}</span>
                                <div className="process__step-line" />
                            </div>
                            <div className="process__step-content">
                                <h3 className="process__step-title">{step.title}</h3>
                                <p className="process__step-desc">{step.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Process;