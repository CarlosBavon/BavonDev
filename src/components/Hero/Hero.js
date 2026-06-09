import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowDown, FiArrowRight } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import BookingModal from '../BookingModal/BookingModal';
import './Hero.css';

const Hero = () => {
    const [bookingOpen, setBookingOpen] = React.useState(false);
    const { isDark } = useTheme();

    const codeSnippets = [
        'const build = (dream) => {',
        '  return reality;',
        '};',
        '',
        'class Developer {',
        '  constructor() {',
        '    this.stack = [',
        '      "React",',
        '      "Node.js",',
        '      "MongoDB"',
        '    ];',
        '  }',
        '}',
    ];

    const titleWords = ['Building', 'Digital', 'Products'];

    return (
        <section className="hero" id="home">
            <div className="hero__bg">
                <div className="hero__grid-pattern" />
                <div className="hero__glow hero__glow--1" />
                <div className="hero__glow hero__glow--2" />
            </div>

            <div className="hero__container container">
                <div className="hero__content">
                    <motion.div
                        className="hero__label"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <span className="hero__label-line" />
                        AVAILABLE FOR FREELANCE
                    </motion.div>

                    <h1 className="hero__title">
                        {titleWords.map((word, i) => (
                            <motion.span
                                key={word}
                                className="hero__title-word"
                                initial={{ opacity: 0, y: 60 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.8,
                                    delay: 0.4 + i * 0.15,
                                    ease: [0.25, 0.1, 0.25, 1],
                                }}
                            >
                                {word}{' '}
                            </motion.span>
                        ))}
                        <br />
                        <motion.span
                            className="hero__title-highlight"
                            initial={{ opacity: 0, y: 60 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.85, ease: [0.25, 0.1, 0.25, 1] }}
                        >
                            That People Love To Use
                        </motion.span>
                    </h1>

                    <motion.p
                        className="hero__subtitle"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.1 }}
                    >
                        Full Stack Developer &nbsp;·&nbsp; UI/UX Designer &nbsp;·&nbsp; Mobile App Developer
                        <br />
                        <span className="hero__location">Based in Kenya</span>
                    </motion.p>

                    <motion.div
                        className="hero__actions"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.3 }}
                    >
                        <a href="#projects" className="btn btn-primary btn-large magnetic-wrap">
                            <span>View Projects</span>
                            <FiArrowRight />
                        </a>
                        <button
                            className="btn btn-outline btn-large magnetic-wrap"
                            onClick={() => setBookingOpen(true)}
                        >
                            Book A Call
                        </button>
                    </motion.div>

                    <motion.div
                        className="hero__stats"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1.6 }}
                    >
                        {[
                            { value: '10+', label: 'Websites Shipped' },
                            { value: '1+', label: 'Years Coding' },
                            { value: '100%', label: 'Client Satisfaction' },
                        ].map((stat, i) => (
                            <div key={i} className="hero__stat">
                                <span className="hero__stat-value">{stat.value}</span>
                                <span className="hero__stat-label">{stat.label}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                <motion.div
                    className="hero__visual"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    <div className="hero__code-window">
                        <div className="hero__code-header">
                            <span className="hero__code-dot hero__code-dot--red" />
                            <span className="hero__code-dot hero__code-dot--yellow" />
                            <span className="hero__code-dot hero__code-dot--green" />
                            <span className="hero__code-filename">developer.js</span>
                        </div>
                        <pre className="hero__code-body">
                            {codeSnippets.map((line, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: 1.5 + i * 0.05 }}
                                >
                                    <span className="hero__line-num">{i + 1}</span>
                                    <code>{line || '\u00A0'}</code>
                                </motion.div>
                            ))}
                        </pre>
                    </div>
                    <div className="hero__floating-shapes">
                        <div className="hero__shape hero__shape--1" />
                        <div className="hero__shape hero__shape--2" />
                        <div className="hero__shape hero__shape--3" />
                    </div>
                </motion.div>
            </div>

            <motion.a
                href="#about"
                className="hero__scroll-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                aria-label="Scroll down"
            >
                <FiArrowDown />
            </motion.a>

            <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
        </section>
    );
};

export default Hero;