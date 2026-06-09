import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../utils/api';
import './BlogPost.css';

const BlogPost = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        api.get(`/api/blogs/${slug}`)
            .then(res => setPost(res.data.data))
            .catch(() => setPost(null));
    }, [slug]);

    if (!post) return <div className="blog-post__not-found">Post not found.</div>;

    return (
        <motion.article
            className="blog-post section-padding"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <div className="container blog-post__container">
                <Link to="/#blog" className="blog-post__back">← Back to Blog</Link>
                <span className="blog-post__category">{post.category}</span>
                <h1 className="blog-post__title">{post.title}</h1>
                <div className="blog-post__meta">
                    <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <span>{post.readTime} min read</span>
                </div>
                {post.tags?.length > 0 && (
                    <div className="blog-post__tags">
                        {post.tags.map(tag => <span key={tag}>{tag}</span>)}
                    </div>
                )}
                <div className="blog-post__content" dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
        </motion.article>
    );
};

export default BlogPost;