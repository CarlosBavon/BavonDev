import React from 'react';
import { Helmet } from 'react-helmet-async';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => (
    <div className="privacy-policy section-padding">
        <Helmet>
            <title>Privacy Policy | BavDev</title>
            <meta name="description" content="BavDev Privacy Policy - How we handle your data." />
            <link rel="canonical" href="https://bavdev.xyz/privacy-policy" />
        </Helmet>
        <div className="container">
            <h1 className="section-title">Privacy Policy</h1>
            <div className="privacy-policy__content">
                <p><strong>Last Updated:</strong> {new Date().getFullYear()}</p>
                <h2>1. Information We Collect</h2>
                <p>We collect information you provide through our contact form and booking system, including your name, email, phone number, and project details.</p>
                <h2>2. How We Use Your Information</h2>
                <p>Your information is used solely for communication regarding your inquiries and projects. We do not share your data with third parties.</p>
                <h2>3. Data Security</h2>
                <p>We implement industry-standard security measures including encryption, secure authentication, and regular security audits.</p>
                <h2>4. Cookies</h2>
                <p>We use essential cookies for theme preferences. No tracking or advertising cookies are used.</p>
                <h2>5. Your Rights</h2>
                <p>You have the right to request deletion of your data at any time by contacting us.</p>
                <h2>6. Contact</h2>
                <p>For privacy concerns, contact: carlosbavon46@gmail.com</p>
            </div>
        </div>
    </div>
);

export default PrivacyPolicy;