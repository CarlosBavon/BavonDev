import React from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiMail, FiDownload } from 'react-icons/fi';
import Newsletter from '../Newsletter/Newsletter';
import './Footer.css';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__grid">
                    <div className="footer__brand">
                        <Link to="/" className="footer__logo">
                            BAVDEV<span className="footer__logo-dot">.</span>
                        </Link>
                        <p className="footer__tagline">
                            Building digital products that people love to use.
                        </p>
                    </div>

                    <div className="footer__links">
                        <h4 className="footer__heading">Navigation</h4>
                        <a href="#projects">Projects</a>
                        <a href="#services">Services</a>
                        <a href="#about">About</a>
                        <a href="#blog">Blog</a>
                        <a href="#contact">Contact</a>
                    </div>

                    <div className="footer__links">
                        <h4 className="footer__heading">Connect</h4>
                        <div className="footer__social">
                            <a href="https://github.com/CarlosBavon" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                <FiGithub /> GitHub
                            </a>
                            <a href="https://www.linkedin.com/in/bavon-carlos-868775367/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <FiLinkedin /> LinkedIn
                            </a>
                            <a href="mailto:carlosbavon46@gmail.com" aria-label="Email">
                                <FiMail /> Email
                            </a>
                            <a href="/resume.pdf" download aria-label="Download Resume">
                                <FiDownload /> Resume
                            </a>
                        </div>
                    </div>

                    <div className="footer__newsletter">
                        <h4 className="footer__heading">Newsletter</h4>
                        <Newsletter />
                    </div>
                </div>

                <div className="footer__bottom">
                    <p>&copy; {year} BavDev. All rights reserved.</p>
                    <div className="footer__bottom-links">
                        <Link to="/privacy-policy">Privacy Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;