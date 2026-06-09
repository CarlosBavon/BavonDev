import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

const ManageBookings = () => {
    const [bookings, setBookings] = useState([]);

    const fetch = () => api.get('/api/bookings').then(res => setBookings(res.data.data));
    useEffect(() => { fetch(); }, []);

    const updateStatus = async (id, status) => {
        await api.patch(`/api/bookings/${id}`, { status });
        fetch();
    };

    const handleDelete = async (id) => { if (window.confirm('Delete?')) { await api.delete(`/api/bookings/${id}`); fetch(); } };

    return (
        <div>
            <h2 className="admin-section-title">Bookings</h2>
            <div className="admin-table-wrap">
                <table className="admin-table">
                    <thead><tr><th>Name</th><th>Email</th><th>Service</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
                    <tbody>
                        {bookings.map(b => (
                            <tr key={b._id}>
                                <td>{b.name}</td><td>{b.email}</td><td>{b.service}</td>
                                <td>{b.preferredDate ? new Date(b.preferredDate).toLocaleDateString() : 'N/A'}</td>
                                <td>{b.status}</td>
                                <td>
                                    <select value={b.status} onChange={e => updateStatus(b._id, e.target.value)} className="input-field" style={{ padding: '4px 8px', fontSize: '0.8rem' }}>
                                        <option>pending</option><option>confirmed</option><option>cancelled</option><option>completed</option>
                                    </select>
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

export default ManageBookings;