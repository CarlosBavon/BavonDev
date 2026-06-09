import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiDownload, FiCode, FiLayers, FiSmartphone } from 'react-icons/fi';
// At the top of About.js, import your image
import portrait from '../../assets/images/me.png';
import './About.css';

const timeline = [
    { year: '2023', title: 'Started Coding', desc: 'Began journey with HTML, CSS & JavaScript' },
    { year: '2024', title: 'React & Node.js', desc: 'Mastered modern JavaScript frameworks' },
    { year: '2024', title: 'Full Stack Developer', desc: 'Built complete web applications' },
    { year: '2025', title: 'Mobile Development', desc: 'Expanded into React Native & Expo' },
    { year: '2025', title: 'UI/UX Design', desc: 'Added design expertise with Figma' },
    { year: '2026', title: 'SaaS & Systems', desc: 'Building scalable digital products' },
];

const About = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <section className="about section-padding" id="about" ref={ref}>
            <div className="container">
                <motion.div
                    className="about__header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">About</span>
                    <h2 className="section-title">
                        Full Stack Developer
                        <br />
                        & UI/UX Designer
                    </h2>
                </motion.div>

                <div className="about__grid">
                    <motion.div
                        className="about__image-wrap"
                        initial={{ opacity: 0, x: -40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="about__image-placeholder">
                            <img
                                src={portrait}
                                alt="BavDev Portrait"
                                className="about__image"
                            />
                        </div>
                        <div className="about__image-border" />
                    </motion.div>

                    <motion.div
                        className="about__content"
                        initial={{ opacity: 0, x: 40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <p className="about__bio">
                            I am a full-stack software developer and UI/UX designer passionate about
                            building digital products that deliver exceptional user experiences.
                            With expertise in React, Node.js, React Native, and MongoDB, I create
                            end-to-end solutions from concept to deployment.
                        </p>

                        <div className="about__highlights">
                            {[
                                { icon: <FiCode />, title: '10+', subtitle: 'Websites Published' },
                                { icon: <FiLayers />, title: 'Full Stack', subtitle: 'React & Node Expert' },
                                { icon: <FiSmartphone />, title: 'Mobile', subtitle: 'React Native Dev' },
                            ].map((item, i) => (
                                <div key={i} className="about__highlight">
                                    <span className="about__highlight-icon">{item.icon}</span>
                                    <span className="about__highlight-value">{item.title}</span>
                                    <span className="about__highlight-label">{item.subtitle}</span>
                                </div>
                            ))}
                        </div>

                        <a href="/resume.pdf" className="btn btn-outline" download>
                            <FiDownload />
                            Download Resume
                        </a>
                    </motion.div>
                </div>

                <motion.div
                    className="about__timeline"
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <h3 className="about__timeline-title">Experience Timeline</h3>
                    <div className="about__timeline-track">
                        {timeline.map((item, i) => (
                            <div key={i} className="about__timeline-item">
                                <div className="about__timeline-dot" />
                                <span className="about__timeline-year">{item.year}</span>
                                <h4 className="about__timeline-item-title">{item.title}</h4>
                                <p className="about__timeline-item-desc">{item.desc}</p>
                            </div>
                        ))}
                        <div className="about__timeline-line" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;