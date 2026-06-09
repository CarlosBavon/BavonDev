import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

const ManageSubscribers = () => {
    const [subs, setSubs] = useState([]);
    const fetch = () => api.get('/api/newsletter').then(res => setSubs(res.data.data));
    useEffect(() => { fetch(); }, []);

    const handleDelete = async (id) => { if (window.confirm('Delete?')) { await api.delete(`/api/newsletter/${id}`); fetch(); } };

    return (
        <div>
            <h2 className="admin-section-title">Newsletter Subscribers</h2>
            <div className="admin-table-wrap">
                <table className="admin-table">
                    <thead><tr><th>Email</th><th>Subscribed At</th><th>Actions</th></tr></thead>
                    <tbody>
                        {subs.map(s => (
                            <tr key={s._id}>
                                <td>{s.email}</td><td>{new Date(s.createdAt).toLocaleDateString()}</td>
                                <td><button onClick={() => handleDelete(s._id)} className="btn btn-outline btn-small">Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageSubscribers;