import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

const ManageContacts = () => {
    const [contacts, setContacts] = useState([]);
    const fetch = () => api.get('/api/contact').then(res => setContacts(res.data.data));
    useEffect(() => { fetch(); }, []);

    const markRead = async (id) => { await api.patch(`/api/contact/${id}/read`); fetch(); };
    const handleDelete = async (id) => { if (window.confirm('Delete?')) { await api.delete(`/api/contact/${id}`); fetch(); } };

    return (
        <div>
            <h2 className="admin-section-title">Messages</h2>
            <div className="admin-table-wrap">
                <table className="admin-table">
                    <thead><tr><th>Name</th><th>Email</th><th>Service</th><th>Message</th><th>Status</th><th>Actions</th></tr></thead>
                    <tbody>
                        {contacts.map(c => (
                            <tr key={c._id}>
                                <td>{c.name}</td><td>{c.email}</td><td>{c.service}</td>
                                <td>{c.message?.substring(0, 50)}...</td>
                                <td>{c.isRead ? 'Read' : 'New'}</td>
                                <td>
                                    {!c.isRead && <button onClick={() => markRead(c._id)} className="btn btn-outline btn-small">Mark Read</button>}
                                    <button onClick={() => handleDelete(c._id)} className="btn btn-outline btn-small" style={{ marginLeft: 8 }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageContacts;