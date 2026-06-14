import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

const BlogCard = ({ post, index, inView }) => {
    const imageUrl = post.coverImage
        ? post.coverImage.startsWith('http')
            ? post.coverImage
            : `${api.defaults.baseURL}${post.coverImage}`
        : null;

    return (
        <motion.article
            className="blog-card"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
        >
            <Link to={`/blog/${post.slug}`} className="blog-card__link">
                <div className="blog-card__image-placeholder">
                    {imageUrl ? (
                        <img src={imageUrl} alt={post.title} className="blog-card__image" />
                    ) : (
                        <span>{post.category}</span>
                    )}
                </div>
                <div className="blog-card__content">
                    <span className="blog-card__category">{post.category}</span>
                    <h3 className="blog-card__title">{post.title}</h3>
                    <p className="blog-card__excerpt">{post.excerpt}</p>
                    <span className="blog-card__read">Read Article →</span>
                </div>
            </Link>
        </motion.article>
    );
};

export default BlogCard;