import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import './Admin.css';

const ManageProjects = () => {
    const [projects, setProjects] = useState([]);
    const [form, setForm] = useState({
        title: '', category: 'React', description: '', features: '', technologies: '', liveUrl: '', githubUrl: ''
    });
    const [editingId, setEditingId] = useState(null);

    const fetchProjects = () => {
        api.get('/api/projects').then(res => setProjects(res.data.data));
    };

    useEffect(() => { fetchProjects(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...form,
            features: form.features.split(',').map(f => f.trim()),
            technologies: form.technologies.split(',').map(t => t.trim()),
        };
        if (editingId) {
            await api.put(`/api/projects/${editingId}`, payload);
        } else {
            await api.post('/api/projects', payload);
        }
        setEditingId(null);
        setForm({ title: '', category: 'React', description: '', features: '', technologies: '', liveUrl: '', githubUrl: '' });
        fetchProjects();
    };

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
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete project?')) {
            await api.delete(`/api/projects/${id}`);
            fetchProjects();
        }
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
                <button type="submit" className="btn btn-primary">{editingId ? 'Update' : 'Create'}</button>
                {editingId && <button type="button" className="btn btn-outline" onClick={() => { setEditingId(null); setForm({ title: '', category: 'React', description: '', features: '', technologies: '', liveUrl: '', githubUrl: '' }); }}>Cancel</button>}
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