import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

const ManageBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [form, setForm] = useState({
        title: '',
        category: 'Development',
        excerpt: '',
        content: '',
        tags: '',
        isPublished: false,
        coverImage: '',                     // ← added
    });
    const [editingId, setEditingId] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);   // ← for preview
    const [uploading, setUploading] = useState(false);         // ← loading state

    // Fetch blogs
    const fetch = () => api.get('/api/blogs?all=true').then(res => setBlogs(res.data.data));
    useEffect(() => { fetch(); }, []);

    // Handle file upload
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Show local preview
        const reader = new FileReader();
        reader.onload = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);

        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await api.post('/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setForm({ ...form, coverImage: res.data.data.imageUrl });
            setUploading(false);
        } catch (err) {
            console.error('Upload failed:', err);
            setUploading(false);
            alert('Image upload failed. Make sure it’s an image file under 5MB.');
        }
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...form,
            tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        };

        if (editingId) {
            await api.put(`/api/blogs/${editingId}`, payload);
        } else {
            await api.post('/api/blogs', payload);
        }

        // Reset form
        setEditingId(null);
        setForm({
            title: '',
            category: 'Development',
            excerpt: '',
            content: '',
            tags: '',
            isPublished: false,
            coverImage: '',
        });
        setImagePreview(null);
        fetch();
    };

    // Edit handler
    const handleEdit = (blog) => {
        setEditingId(blog._id);
        setForm({
            title: blog.title,
            category: blog.category,
            excerpt: blog.excerpt,
            content: blog.content,
            tags: blog.tags.join(', '),
            isPublished: blog.isPublished,
            coverImage: blog.coverImage || '',
        });
        setImagePreview(blog.coverImage || null);
    };

    // Cancel edit
    const handleCancel = () => {
        setEditingId(null);
        setForm({
            title: '',
            category: 'Development',
            excerpt: '',
            content: '',
            tags: '',
            isPublished: false,
            coverImage: '',
        });
        setImagePreview(null);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete?')) {
            await api.delete(`/api/blogs/${id}`);
            fetch();
        }
    };

    return (
        <div>
            <h2 className="admin-section-title">{editingId ? 'Edit Blog' : 'Add Blog'}</h2>
            <form className="admin-form" onSubmit={handleSubmit}>
                <input
                    className="input-field"
                    placeholder="Title"
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                    required
                />

                <select
                    className="input-field"
                    value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value })}
                >
                    <option>Development</option>
                    <option>Design</option>
                    <option>Technology</option>
                    <option>Business</option>
                    <option>Tutorial</option>
                </select>

                <textarea
                    className="input-field"
                    placeholder="Excerpt"
                    value={form.excerpt}
                    onChange={e => setForm({ ...form, excerpt: e.target.value })}
                    required
                />

                <textarea
                    className="input-field"
                    placeholder="Content (Markdown/HTML)"
                    value={form.content}
                    onChange={e => setForm({ ...form, content: e.target.value })}
                    required
                    rows={8}
                />

                <input
                    className="input-field"
                    placeholder="Tags (comma separated)"
                    value={form.tags}
                    onChange={e => setForm({ ...form, tags: e.target.value })}
                />

                {/* Image Upload Section */}
                <div className="admin-upload-section">
                    <label className="admin-label">Cover Image</label>
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Preview"
                            style={{ width: '200px', marginBottom: '10px', display: 'block' }}
                        />
                    )}
                    <input type="file" onChange={handleFileChange} accept="image/*" />
                    {uploading && <p>Uploading...</p>}
                    <input
                        className="input-field"
                        placeholder="Or paste image URL manually"
                        value={form.coverImage}
                        onChange={e => setForm({ ...form, coverImage: e.target.value })}
                    />
                </div>

                <label className="admin-checkbox">
                    <input
                        type="checkbox"
                        checked={form.isPublished}
                        onChange={e => setForm({ ...form, isPublished: e.target.checked })}
                    />{' '}
                    Published
                </label>

                <button type="submit" className="btn btn-primary">
                    {editingId ? 'Update' : 'Create'}
                </button>
                {editingId && (
                    <button type="button" className="btn btn-outline" onClick={handleCancel}>
                        Cancel
                    </button>
                )}
            </form>

            <h2 className="admin-section-title mt-2">All Blogs</h2>
            <div className="admin-table-wrap">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Published</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map(b => (
                            <tr key={b._id}>
                                <td>{b.title}</td>
                                <td>{b.category}</td>
                                <td>{b.isPublished ? 'Yes' : 'No'}</td>
                                <td>
                                    <button onClick={() => handleEdit(b)} className="btn btn-outline btn-small">
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(b._id)}
                                        className="btn btn-outline btn-small"
                                        style={{ marginLeft: 8 }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageBlogs;