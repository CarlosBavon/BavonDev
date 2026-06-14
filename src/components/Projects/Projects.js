import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import './Projects.css';
import porkyImg from '../../assets/images/pork.png';
import bavImg from '../../assets/images/bav.png'
import hairImg from '../../assets/images/hair.png'
import api from '../../utils/api';

const allProjects = [
    {
        id: 1,
        title: 'Porky Delights',
        category: 'Full Stack',
        description: 'Complete ordering platform with dynamic cart, admin dashboard, and user authentication.',
        features: ['Ordering Platform', 'Dynamic Cart', 'Admin Dashboard', 'Authentication'],
        tech: ['React', 'Node.js', 'MongoDB', 'Express'],
        imageUrl: porkyImg,
        liveUrl: 'https://porky-delights.vercel.app',
        githubUrl: 'https://github.com/CarlosBavon/PorkyDelights',
    },
    {
        id: 2,
        title: 'BavDev Portfolio',
        category: 'React',
        description: 'Premium developer portfolio with animations, blog integration, and dark mode.',
        features: ['Animations', 'Blog Integration', 'Dark Mode', 'Booking System'],
        tech: ['React', 'Framer Motion', 'Node.js', 'MongoDB'],
        imageUrl: bavImg,
        liveUrl: 'https://bavdev.vercel.app/',
        githubUrl: 'https://github.com/CarlosBavon/BavDev',
    },
    {
        id: 3,
        title: 'Hair Stylist',
        category: 'Full Stack',
        description: 'Premium hair studio where you experience the art of hair design.',
        features: ['Calendar Integration', 'Real-time Booking', 'Push Notifications', 'Rating Feature'],
        tech: ['React', 'Framer Motion', 'Node.js', 'MongoDB'],
        imageUrl: hairImg,
        liveUrl: 'https://stylebymk.vercel.app/',
        githubUrl: 'https://github.com/CarlosBavon/Stylebymk-Front',
    },
];

const categories = ['All', 'React', 'Mobile', 'Full Stack'];

const Projects = () => {
    const [filter, setFilter] = useState('All');
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

    const filtered = filter === 'All' ? allProjects : allProjects.filter((p) => p.category === filter);

    return (
        <section className="projects section-padding" id="projects" ref={ref}>
            <div className="container">
                <motion.div
                    className="projects__header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">Featured Work</span>
                    <h2 className="section-title">Selected Projects</h2>
                </motion.div>

                <motion.div
                    className="projects__filters"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className={`projects__filter ${filter === cat ? 'active' : ''}`}
                            onClick={() => setFilter(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>

                <div className="projects__grid">
                    {filtered.map((project, i) => (
                        <motion.div
                            key={project.id}
                            className="project-card"
                            initial={{ opacity: 0, y: 40 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                        >
                            <div className="project-card__visual">
                                {project.imageUrl ? (
                                    <img
                                        src={
                                            project.imageUrl.startsWith('http')
                                                ? project.imageUrl
                                                : `${api.defaults.baseURL}${project.imageUrl}`
                                        }
                                        alt={project.title}
                                        className="project-card__image"
                                    />
                                ) : (
                                    <div className="project-card__placeholder">
                                        <span className="project-card__placeholder-text">{project.title}</span>
                                    </div>
                                )}
                            </div>
                            <div className="project-card__content">
                                <span className="project-card__category">{project.category}</span>
                                <h3 className="project-card__title">{project.title}</h3>
                                <p className="project-card__desc">{project.description}</p>
                                <ul className="project-card__features">
                                    {project.features.map((f) => (
                                        <li key={f}>{f}</li>
                                    ))}
                                </ul>
                                <div className="project-card__tech">
                                    {project.tech.map((t) => (
                                        <span key={t}>{t}</span>
                                    ))}
                                </div>
                                <div className="project-card__actions">
                                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-small">
                                        <FiExternalLink /> Live Site
                                    </a>
                                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-small">
                                        <FiGithub /> Source Code
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;