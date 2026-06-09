import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

const ManageBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [form, setForm] = useState({ title: '', category: 'Development', excerpt: '', content: '', tags: '', isPublished: false });
    const [editingId, setEditingId] = useState(null);

    const fetch = () => api.get('/api/blogs?all=true').then(res => setBlogs(res.data.data));
    useEffect(() => { fetch(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { ...form, tags: form.tags.split(',').map(t => t.trim()) };
        if (editingId) await api.put(`/api/blogs/${editingId}`, payload);
        else await api.post('/api/blogs', payload);
        setEditingId(null); setForm({ title: '', category: 'Development', excerpt: '', content: '', tags: '', isPublished: false });
        fetch();
    };

    const handleEdit = (blog) => {
        setEditingId(blog._id);
        setForm({ title: blog.title, category: blog.category, excerpt: blog.excerpt, content: blog.content, tags: blog.tags.join(', '), isPublished: blog.isPublished });
    };

    const handleDelete = async (id) => { if (window.confirm('Delete?')) { await api.delete(`/api/blogs/${id}`); fetch(); } };

    return (
        <div>
            <h2 className="admin-section-title">{editingId ? 'Edit Blog' : 'Add Blog'}</h2>
            <form className="admin-form" onSubmit={handleSubmit}>
                <input className="input-field" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
                <select className="input-field" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                    <option>Development</option><option>Design</option><option>Technology</option><option>Business</option><option>Tutorial</option>
                </select>
                <textarea className="input-field" placeholder="Excerpt" value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} required />
                <textarea className="input-field" placeholder="Content (Markdown/HTML)" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} required rows={8} />
                <input className="input-field" placeholder="Tags (comma separated)" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} />
                <label className="admin-checkbox"><input type="checkbox" checked={form.isPublished} onChange={e => setForm({ ...form, isPublished: e.target.checked })} /> Published</label>
                <button type="submit" className="btn btn-primary">{editingId ? 'Update' : 'Create'}</button>
                {editingId && <button type="button" className="btn btn-outline" onClick={() => { setEditingId(null); setForm({ title: '', category: 'Development', excerpt: '', content: '', tags: '', isPublished: false }); }}>Cancel</button>}
            </form>
            <h2 className="admin-section-title mt-2">All Blogs</h2>
            <div className="admin-table-wrap">
                <table className="admin-table">
                    <thead><tr><th>Title</th><th>Category</th><th>Published</th><th>Actions</th></tr></thead>
                    <tbody>
                        {blogs.map(b => (
                            <tr key={b._id}><td>{b.title}</td><td>{b.category}</td><td>{b.isPublished ? 'Yes' : 'No'}</td>
                                <td>
                                    <button onClick={() => handleEdit(b)} className="btn btn-outline btn-small">Edit</button>
                                    <button onClick={() => handleDelete(b._id)} className="btn btn-outline btn-small" style={{ marginLeft: 8 }}>Delete</button>
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