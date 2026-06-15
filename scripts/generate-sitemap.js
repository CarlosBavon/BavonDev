// client/scripts/generate-sitemap.js
const fs = require('fs');
const path = require('path');

// Base URL of the backend API
const API_URL = process.env.REACT_APP_API_URL || 'https://bavondev-back.onrender.com';
// Base URL of the frontend (where the sitemap will live)
const SITE_URL = process.env.PUBLIC_URL || 'https://bavdev.xyz'; // Change to your actual domain

async function fetchData(endpoint) {
    try {
        const response = await fetch(`${API_URL}${endpoint}`);
        if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`);
        return await response.json();
    } catch (error) {
        console.warn(`Warning: could not fetch ${endpoint} – skipping.`, error.message);
        return { data: [] };
    }
}

async function generateSitemap() {
    console.log('Generating sitemap...');

    // Fetch content from your backend
    const [blogsResult, projectsResult] = await Promise.all([
        fetchData('/api/blogs'),
        fetchData('/api/projects'),
    ]);

    const blogs = blogsResult.data || [];
    const projects = projectsResult.data || [];

    // Static pages
    const urls = [
        { loc: '/', changefreq: 'weekly', priority: '1.0' },
        { loc: '/privacy-policy', changefreq: 'monthly', priority: '0.3' },
    ];

    // Dynamic blog posts
    blogs.forEach(blog => {
        urls.push({
            loc: `/blog/${blog.slug}`,
            lastmod: blog.updatedAt || blog.createdAt,
            changefreq: 'monthly',
            priority: '0.7',
        });
    });

    // Dynamic projects (if you have project detail pages)
    projects.forEach(project => {
        urls.push({
            loc: `/project/${project.slug}`,
            lastmod: project.updatedAt || project.createdAt,
            changefreq: 'monthly',
            priority: '0.8',
        });
    });

    // Build XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    urls.forEach(url => {
        xml += '  <url>\n';
        xml += `    <loc>${SITE_URL}${url.loc}</loc>\n`;
        if (url.lastmod) {
            const date = new Date(url.lastmod).toISOString();
            xml += `    <lastmod>${date}</lastmod>\n`;
        }
        xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
        xml += `    <priority>${url.priority}</priority>\n`;
        xml += '  </url>\n';
    });

    xml += '</urlset>';

    // Write to public folder
    const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
    fs.writeFileSync(outputPath, xml, 'utf8');
    console.log(`✅ Sitemap written to ${outputPath}`);
}

generateSitemap().catch(err => {
    console.error('❌ Sitemap generation failed:', err);
    process.exit(1);
});