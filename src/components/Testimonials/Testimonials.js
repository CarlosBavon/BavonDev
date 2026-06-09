import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import api from '../../utils/api';
import './Testimonials.css';

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    useEffect(() => {
        api.get('/api/testimonials')
            .then((res) => setTestimonials(res.data.data))
            .catch(() => { });
    }, []);

    if (!testimonials.length) return null;

    return (
        <section className="testimonials section-padding" id="testimonials" ref={ref}>
            <div className="container">
                <motion.div
                    className="testimonials__header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">Testimonials</span>
                    <h2 className="section-title">What Clients Say</h2>
                </motion.div>

                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={30}
                    slidesPerView={1}
                    breakpoints={{
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    pagination={{ clickable: true, el: '.testimonials__pagination' }}
                    className="testimonials__slider"
                >
                    {testimonials.map((t) => (
                        <SwiperSlide key={t._id}>
                            <div className="testimonial-card">
                                <div className="testimonial-card__stars">
                                    {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
                                </div>
                                <p className="testimonial-card__text">{t.content}</p>
                                <div className="testimonial-card__author">
                                    <div className="testimonial-card__avatar">
                                        {t.avatar ? (
                                            <img src={t.avatar} alt={t.name} />
                                        ) : (
                                            <span>{t.name.charAt(0)}</span>
                                        )}
                                    </div>
                                    <div>
                                        <p className="testimonial-card__name">{t.name}</p>
                                        <p className="testimonial-card__role">{t.position}{t.company ? `, ${t.company}` : ''}</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="testimonials__pagination" />
            </div>
        </section>
    );
};

export default Testimonials;