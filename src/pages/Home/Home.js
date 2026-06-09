import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../../components/Hero/Hero';
import About from '../../components/About/About';
import Services from '../../components/Services/Services';
import TechStack from '../../components/TechStack/TechStack';
import Projects from '../../components/Projects/Projects';
import Contact from '../../components/Contact/Contact';
import Process from '../../components/Process/Process';
import Testimonials from '../../components/Testimonials/Testimonials';
import Blog from '../../components/Blog/Blog';
import './Home.css';

const Home = () => {
    return (
        <>
            <Helmet>
                <title>BavDev | Full Stack Developer & UI/UX Designer</title>
                <meta name="description" content="BavDev — Full Stack Software Developer & UI/UX Designer based in Kenya. Building digital products that people love to use. React, Node.js, React Native expert." />
                <meta name="keywords" content="full stack developer, react developer, node.js developer, UI/UX designer, Kenya developer, mobile app developer, SaaS developer" />
                <meta property="og:title" content="BavDev | Full Stack Developer & UI/UX Designer" />
                <meta property="og:description" content="Building digital products that people love to use. Based in Kenya." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://bavdev.xyz" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="BavDev | Full Stack Developer" />
                <meta name="twitter:description" content="Building digital products that people love to use." />
                <link rel="canonical" href="https://bavdev.xyz" />
                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Person',
                        name: 'BavDev',
                        jobTitle: 'Full Stack Developer & UI/UX Designer',
                        url: 'https://bavdev.co.ke',
                        knowsAbout: ['React', 'Node.js', 'MongoDB', 'React Native', 'UI/UX Design'],
                        address: { '@type': 'PostalAddress', addressCountry: 'KE' },
                    })}
                </script>
            </Helmet>
            <Hero />
            <About />
            <Services />
            <TechStack />
            <Projects />
            <Process />
            <Testimonials />
            <Blog />
            <Contact />
        </>
    );
};

export default Home;