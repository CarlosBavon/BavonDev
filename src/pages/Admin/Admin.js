import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import ManageProjects from './ManageProjects';
import ManageBlogs from './ManageBlogs';
import ManageTestimonials from './ManageTestimonials';
import ManageBookings from './ManageBookings';
import ManageContacts from './ManageContacts';
import ManageSubscribers from './ManageSubscribers';

const Admin = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <div className="admin-loading">Loading...</div>;

    if (!isAuthenticated) return <AdminLogin />;

    return (
        <Routes>
            <Route element={<AdminDashboard />}>
                <Route index element={<ManageProjects />} />
                <Route path="projects" element={<ManageProjects />} />
                <Route path="blogs" element={<ManageBlogs />} />
                <Route path="testimonials" element={<ManageTestimonials />} />
                <Route path="bookings" element={<ManageBookings />} />
                <Route path="contacts" element={<ManageContacts />} />
                <Route path="subscribers" element={<ManageSubscribers />} />
            </Route>
        </Routes>
    );
};

export default Admin;