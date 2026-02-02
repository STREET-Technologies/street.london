'use client';

import { Star, Scan, Mic } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import { useEffect, useState } from 'react';

export default function Millie() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="millie-section">
      <div className="container">
        <div className="millie-content">
          <div className="millie-text">
            <p className="millie-eyebrow">Your Personal Stylist</p>
            <h2 className="section-title millie-title">Meet Millie</h2>
            <p className="section-subtitle">
              Your AI shopping assistant who knows your style better than you do
            </p>
            <div className="millie-features">
              <div className="millie-feature">
                <div className="millie-feature-icon">
                  <Star size={32} strokeWidth={1.5} />
                </div>
                <div>
                  <h4>Knows Your Style</h4>
                  <p>Millie learns what you love and finds pieces that match your unique taste</p>
                </div>
              </div>
              <div className="millie-feature">
                <div className="millie-feature-icon">
                  <Scan size={32} strokeWidth={1.5} />
                </div>
                <div>
                  <h4>Try Before You Buy</h4>
                  <p>See how clothes look on you with virtual try-on technology</p>
                </div>
              </div>
              <div className="millie-feature">
                <div className="millie-feature-icon">
                  <Mic size={32} strokeWidth={1.5} />
                </div>
                <div>
                  <h4>Shop by Voice</h4>
                  <p>Just tell Millie what you need - &quot;black dress for a wedding&quot; - and she&apos;ll find it</p>
                </div>
              </div>
            </div>
          </div>
          <div className="millie-visual">
            {isMobile ? (
              <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                className="millie-carousel"
              >
                <SwiperSlide>
                  <div className="millie-image">
                    <Image src="/img/millie-1.png" alt="Millie AI interface 1" width={300} height={600} />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="millie-image">
                    <Image src="/img/millie-2.png" alt="Millie AI interface 2" width={300} height={600} />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="millie-image">
                    <Image src="/img/millie-3.png" alt="Millie AI interface 3" width={300} height={600} />
                  </div>
                </SwiperSlide>
              </Swiper>
            ) : (
              <div className="millie-images-grid">
                <div className="millie-image">
                  <Image src="/img/millie-1.png" alt="Millie AI interface 1" width={300} height={600} />
                </div>
                <div className="millie-image">
                  <Image src="/img/millie-2.png" alt="Millie AI interface 2" width={300} height={600} />
                </div>
                <div className="millie-image">
                  <Image src="/img/millie-3.png" alt="Millie AI interface 3" width={300} height={600} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
