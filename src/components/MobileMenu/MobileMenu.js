// client/src/components/MobileMenu/MobileMenu.js
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';   // ← import the X icon
import './MobileMenu.css';

const navLinks = [
    { name: 'Work', href: '#projects' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
];

const MobileMenu = ({ isOpen, onClose }) => {
    const lenisRef = useRef(null);

    useEffect(() => {
        lenisRef.current = window.__LENIS__ || null;
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
            if (lenisRef.current) lenisRef.current.stop();
        } else {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
            if (lenisRef.current) lenisRef.current.start();
        }

        return () => {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
            if (lenisRef.current) lenisRef.current.start();
        };
    }, [isOpen]);

    const handleLinkClick = (e, href) => {
        onClose();
        if (href.startsWith('#')) {
            e.preventDefault();
            const el = document.querySelector(href);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return ReactDOM.createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="mobile-menu"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={onClose}
                >
                    {/* Add the close button */}
                    <button
                        className="mobile-menu__close"
                        onClick={onClose}
                        aria-label="Close menu"
                    >
                        <FiX />
                    </button>

                    <div
                        className="mobile-menu__inner"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {navLinks.map((link, i) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                className="mobile-menu__link"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08 }}
                                onClick={(e) => handleLinkClick(e, link.href)}
                            >
                                {link.name}
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default MobileMenu;
