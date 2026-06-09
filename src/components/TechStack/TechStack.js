import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './TechStack.css';

const techCategories = [
    {
        category: 'Frontend',
        items: ['React', 'CRA', 'Next.js', 'JavaScript', 'HTML5', 'CSS3', 'Framer Motion', 'GSAP'],
    },
    {
        category: 'Backend',
        items: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'REST APIs', 'JWT', 'WebSocket'],
    },
    {
        category: 'Mobile',
        items: ['React Native', 'Expo', 'Cross-Platform', 'Push Notifications', 'App Store', 'Google Play'],
    },
    {
        category: 'Design',
        items: ['Figma', 'Prototyping', 'Wireframing', 'Design Systems', 'User Research', 'Accessibility'],
    },
    {
        category: 'Other',
        items: ['Git', 'GitHub', 'Docker', 'CI/CD', 'AWS', 'Vercel', 'Linux', 'Agile'],
    },
];

const TechStack = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <section className="tech-stack section-padding" id="tech-stack" ref={ref}>
            <div className="container">
                <motion.div
                    className="tech-stack__header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">Tech Stack</span>
                    <h2 className="section-title">Technologies I Use</h2>
                </motion.div>

                <div className="tech-stack__categories">
                    {techCategories.map((cat, ci) => (
                        <motion.div
                            key={cat.category}
                            className="tech-category"
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.1 + ci * 0.1 }}
                        >
                            <h3 className="tech-category__title">{cat.category}</h3>
                            <div className="tech-category__marquee-wrap">
                                <div className="tech-category__marquee">
                                    {[...cat.items, ...cat.items].map((item, i) => (
                                        <span key={`${item}-${i}`} className="tech-category__item">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechStack;