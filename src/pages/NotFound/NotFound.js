import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './NotFound.css';

const NotFound = () => (
    <div className="not-found">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="not-found__code">404</span>
            <h1 className="not-found__title">Page Not Found</h1>
            <p className="not-found__desc">The page you're looking for doesn't exist or has been moved.</p>
            <Link to="/" className="btn btn-primary btn-large">Back to Home</Link>
        </motion.div>
    </div>
);

export default NotFound;