import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import './CommandPalette.css';

const commands = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/#projects' },
    { name: 'Services', path: '/#services' },
    { name: 'About', path: '/#about' },
    { name: 'Blog', path: '/#blog' },
    { name: 'Contact', path: '/#contact' },
    { name: 'Admin', path: '/admin' },
];

const CommandPalette = () => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const down = (e) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((prev) => !prev);
            }
            if (e.key === 'Escape') setOpen(false);
        };
        window.addEventListener('keydown', down);
        return () => window.removeEventListener('keydown', down);
    }, []);

    const filtered = commands.filter((cmd) =>
        cmd.name.toLowerCase().includes(query.toLowerCase())
    );

    const handleSelect = (cmd) => {
        if (cmd.path.startsWith('/#')) {
            const section = cmd.path.slice(2);
            document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate(cmd.path);
        }
        setOpen(false);
        setQuery('');
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="command-palette-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setOpen(false)}
                >
                    <motion.div
                        className="command-palette"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="command-palette__input-wrap">
                            <FiSearch className="command-palette__icon" />
                            <input
                                type="text"
                                placeholder="Type a command..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="command-palette__input"
                                autoFocus
                            />
                        </div>
                        <ul className="command-palette__list">
                            {filtered.map((cmd) => (
                                <li
                                    key={cmd.name}
                                    className="command-palette__item"
                                    onClick={() => handleSelect(cmd)}
                                >
                                    {cmd.name}
                                </li>
                            ))}
                            {filtered.length === 0 && (
                                <li className="command-palette__item command-palette__item--empty">No results</li>
                            )}
                        </ul>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CommandPalette;