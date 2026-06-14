import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import './Admin.css';

const ManageProjects = () => {
    const [projects, setProjects] = useState([]);
    const [form, setForm] = useState({
        title: '', category: 'React', description: '', features: '',
        technologies: '', liveUrl: '', githubUrl: '', imageUrl: ''
    });
    const [editingId, setEditingId] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    // Fetch projects
    const fetchProjects = () => {
        api.get('/api/projects?all=true').then(res => setProjects(res.data.data));
    };
    useEffect(() => { fetchProjects(); }, []);

    // Handle file selection
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Show preview
        const reader = new FileReader();
        reader.onload = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);

        // Upload to server
        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await api.post('/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            // Save the image URL returned
            setForm({ ...form, imageUrl: res.data.data.imageUrl });
            setUploading(false);
        } catch (err) {
            console.error('Upload failed:', err);
            setUploading(false);
            alert('Image upload failed. Make sure it is an image and under 5MB.');
        }
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...form,
            features: form.features.split(',').map(f => f.trim()).filter(Boolean),
            technologies: form.technologies.split(',').map(t => t.trim()).filter(Boolean),
        };

        try {
            if (editingId) {
                await api.put(`/api/projects/${editingId}`, payload);
            } else {
                await api.post('/api/projects', payload);
            }
            setEditingId(null);
            setForm({ title: '', category: 'React', description: '', features: '', technologies: '', liveUrl: '', githubUrl: '', imageUrl: '' });
            setImagePreview(null);
            fetchProjects();
        } catch (err) {
            console.error('Save failed:', err);
        }
    };

    // Edit handler
    const handleEdit = (project) => {
        setEditingId(project._id);
        setForm({
            title: project.title,
            category: project.category,
            description: project.description,
            features: project.features.join(', '),
            technologies: project.technologies.join(', '),
            liveUrl: project.liveUrl || '',
            githubUrl: project.githubUrl || '',
            imageUrl: project.imageUrl || '',
        });
        setImagePreview(project.imageUrl || null);
    };

    return (
        <div>
            <h2 className="admin-section-title">{editingId ? 'Edit Project' : 'Add Project'}</h2>
            <form className="admin-form" onSubmit={handleSubmit}>
                <input className="input-field" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
                <select className="input-field" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                    <option>React</option><option>Node</option><option>Mobile</option><option>Full Stack</option><option>SaaS</option><option>UI/UX</option>
                </select>
                <textarea className="input-field" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
                <input className="input-field" placeholder="Features (comma separated)" value={form.features} onChange={e => setForm({ ...form, features: e.target.value })} />
                <input className="input-field" placeholder="Technologies (comma separated)" value={form.technologies} onChange={e => setForm({ ...form, technologies: e.target.value })} />
                <input className="input-field" placeholder="Live URL" value={form.liveUrl} onChange={e => setForm({ ...form, liveUrl: e.target.value })} />
                <input className="input-field" placeholder="GitHub URL" value={form.githubUrl} onChange={e => setForm({ ...form, githubUrl: e.target.value })} />

                {/* Image Upload Section */}
                <div className="admin-upload-section">
                    <label className="admin-label">Project Image</label>
                    {imagePreview && (
                        <img src={imagePreview} alt="Preview" style={{ width: '200px', marginBottom: '10px', display: 'block' }} />
                    )}
                    <input type="file" onChange={handleFileChange} accept="image/*" />
                    {uploading && <p>Uploading...</p>}
                    <input className="input-field" placeholder="Or paste image URL manually" value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} />
                </div>

                <button type="submit" className="btn btn-primary">{editingId ? 'Update' : 'Create'}</button>
                {editingId && <button type="button" className="btn btn-outline" onClick={() => { setEditingId(null); setForm({ title: '', category: 'React', description: '', features: '', technologies: '', liveUrl: '', githubUrl: '', imageUrl: '' }); setImagePreview(null); }}>Cancel</button>}
            </form>

            <h2 className="admin-section-title mt-2">All Projects</h2>
            <div className="admin-table-wrap">
                <table className="admin-table">
                    <thead><tr><th>Title</th><th>Category</th><th>Actions</th></tr></thead>
                    <tbody>
                        {projects.map(p => (
                            <tr key={p._id}>
                                <td>{p.title}</td><td>{p.category}</td>
                                <td>
                                    <button onClick={() => handleEdit(p)} className="btn btn-outline btn-small">Edit</button>
                                    <button onClick={() => handleDelete(p._id)} className="btn btn-outline btn-small" style={{ marginLeft: 8 }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProjects;