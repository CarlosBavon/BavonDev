import React, { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navbar from './components/Navbar/Navbar';
import CustomCursor from './components/CustomCursor/CustomCursor';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import Footer from './components/Footer/Footer';
import './App.css';

const Home = lazy(() => import('./pages/Home/Home'));
const Admin = lazy(() => import('./pages/Admin/Admin'));
const BlogPost = lazy(() => import('./pages/BlogPost/BlogPost'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy/PrivacyPolicy'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

const LoadingFallback = () => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    height: '100vh', background: 'var(--bg-primary)',
    color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)',
    fontSize: '0.9rem', letterSpacing: '0.1em',
  }}>
    LOADING...
  </div>
);

function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      {!isAdmin && <Navbar />}
      <main className="main-content">
        <AnimatePresence mode="wait">
          <Suspense fallback={<LoadingFallback />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/admin/*" element={<Admin />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>
      {!isAdmin && <Footer />}
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default App;