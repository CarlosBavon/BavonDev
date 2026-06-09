import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Admin.css';

const navItems = [
    { label: 'Projects', path: '/admin/projects' },
    { label: 'Blogs', path: '/admin/blogs' },
    { label: 'Testimonials', path: '/admin/testimonials' },
    { label: 'Bookings', path: '/admin/bookings' },
    { label: 'Messages', path: '/admin/contacts' },
    { label: 'Subscribers', path: '/admin/subscribers' },
];

const AdminDashboard = () => {
    const { logout, admin } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/admin');
    };

    return (
        <div className="admin-dashboard">
            <aside className="admin-dashboard__sidebar">
                <h2 className="admin-dashboard__logo">BAVDEV ADMIN</h2>
                <nav>
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`admin-dashboard__nav-link ${location.pathname === item.path ? 'active' : ''}`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="admin-dashboard__user">
                    <span>{admin?.email}</span>
                    <button className="btn btn-outline" onClick={handleLogout}>Logout</button>
                </div>
            </aside>
            <main className="admin-dashboard__content">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminDashboard;