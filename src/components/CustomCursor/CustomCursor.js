import React, { useState, useEffect } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
    const [pos, setPos] = useState({ x: -100, y: -100 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const isMobile = window.matchMedia('(max-width: 768px), (pointer: coarse)').matches;
        if (isMobile) return;

        const onMouseMove = (e) => {
            setPos({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
        };

        const onMouseLeave = () => setIsVisible(false);
        const onMouseEnter = () => setIsVisible(true);

        const handleHoverStart = (e) => {
            const target = e.target.closest('a, button, .magnetic-wrap, input, textarea, select');
            if (target) setIsHovering(true);
        };

        const handleHoverEnd = () => setIsHovering(false);

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseleave', onMouseLeave);
        document.addEventListener('mouseenter', onMouseEnter);
        document.addEventListener('mouseover', handleHoverStart);
        document.addEventListener('mouseout', handleHoverEnd);

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseleave', onMouseLeave);
            document.removeEventListener('mouseenter', onMouseEnter);
            document.removeEventListener('mouseover', handleHoverStart);
            document.removeEventListener('mouseout', handleHoverEnd);
        };
    }, [isVisible]);

    return (
        <>
            <div
                className={`cursor-dot ${isVisible ? 'visible' : ''} ${isHovering ? 'hovering' : ''}`}
                style={{ left: pos.x, top: pos.y }}
            />
            <div
                className={`cursor-ring ${isVisible ? 'visible' : ''} ${isHovering ? 'hovering' : ''}`}
                style={{ left: pos.x, top: pos.y }}
            />
        </>
    );
};

export default CustomCursor;