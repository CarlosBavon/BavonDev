import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import BlogCard from './BlogCard';
import './Blog.css';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

    useEffect(() => {
        api.get('/api/blogs?limit=3')
            .then((res) => setBlogs(res.data.data.slice(0, 3)))
            .catch(() => { });
    }, []);

    if (!blogs.length) return null;

    return (
        <section className="blog section-padding" id="blog" ref={ref}>
            <div className="container">
                <motion.div
                    className="blog__header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">Blog</span>
                    <h2 className="section-title">Insights & Articles</h2>
                </motion.div>
                <div className="blog__grid">
                    {blogs.map((post, i) => (
                        <BlogCard key={post._id} post={post} index={i} inView={inView} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blog;