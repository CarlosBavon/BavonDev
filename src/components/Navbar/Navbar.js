import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import MobileMenu from '../MobileMenu/MobileMenu';
import { useTheme } from '../../context/ThemeContext';
import './Navbar.css';

const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#projects' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
    }, [location]);

    const scrollToTop = () => {
        if (window.__LENIS__) {
            window.__LENIS__.scrollTo(0, { duration: 1.2 });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleLogoClick = (e) => {
        e.preventDefault();
        if (location.pathname === '/') {
            scrollToTop();
        } else {
            navigate('/');
        }
    };

    const handleNavClick = (e, href) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            const el = document.querySelector(href);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <motion.header
                className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
                <div className="navbar__inner container">
                    <a
                        href="/"
                        className="navbar__logo"
                        onClick={handleLogoClick}
                    >
                        <span className="navbar__logo-text">BAVDEV</span>
                        <span className="navbar__logo-dot">.</span>
                    </a>

                    <nav className="navbar__nav">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="navbar__link"
                                onClick={(e) => handleNavClick(e, link.href)}
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>

                    <div className="navbar__actions">
                        <ThemeToggle />
                        <a
                            href="#contact"
                            className="btn btn-primary navbar__cta"
                            onClick={(e) => handleNavClick(e, '#contact')}
                        >
                            Start Project
                        </a>
                        <button
                            className={`navbar__hamburger ${mobileOpen ? 'active' : ''}`}
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label="Toggle menu"
                            aria-expanded={mobileOpen}
                        >
                            <span /><span /><span />
                        </button>
                    </div>
                </div>
            </motion.header>

            <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
        </>
    );
};

export default Navbar;
