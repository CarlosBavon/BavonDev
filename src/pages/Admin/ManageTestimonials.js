import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

const ManageTestimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [form, setForm] = useState({ name: '', position: '', company: '', content: '', rating: 5 });
    const [editingId, setEditingId] = useState(null);

    const fetch = () => api.get('/api/testimonials?all=true').then(res => setTestimonials(res.data.data));
    useEffect(() => { fetch(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingId) await api.put(`/api/testimonials/${editingId}`, form);
        else await api.post('/api/testimonials', form);
        setEditingId(null); setForm({ name: '', position: '', company: '', content: '', rating: 5 });
        fetch();
    };

    const handleEdit = (t) => { setEditingId(t._id); setForm({ name: t.name, position: t.position, company: t.company, content: t.content, rating: t.rating }); };
    const handleDelete = async (id) => { if (window.confirm('Delete?')) { await api.delete(`/api/testimonials/${id}`); fetch(); } };

    return (
        <div>
            <h2 className="admin-section-title">{editingId ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
            <form className="admin-form" onSubmit={handleSubmit}>
                <input className="input-field" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                <input className="input-field" placeholder="Position" value={form.position} onChange={e => setForm({ ...form, position: e.target.value })} />
                <input className="input-field" placeholder="Company" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
                <textarea className="input-field" placeholder="Testimonial content" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} required />
                <input className="input-field" type="number" min="1" max="5" value={form.rating} onChange={e => setForm({ ...form, rating: Number(e.target.value) })} />
                <button type="submit" className="btn btn-primary">{editingId ? 'Update' : 'Create'}</button>
            </form>
            <h2 className="admin-section-title mt-2">All Testimonials</h2>
            <div className="admin-table-wrap">
                <table className="admin-table">
                    <thead><tr><th>Name</th><th>Rating</th><th>Actions</th></tr></thead>
                    <tbody>
                        {testimonials.map(t => (
                            <tr key={t._id}><td>{t.name}</td><td>{t.rating}</td>
                                <td>
                                    <button onClick={() => handleEdit(t)} className="btn btn-outline btn-small">Edit</button>
                                    <button onClick={() => handleDelete(t._id)} className="btn btn-outline btn-small" style={{ marginLeft: 8 }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageTestimonials;