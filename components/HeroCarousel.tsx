"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface Slide {
  title: string;
  subtitle: string;
}

interface HeroCarouselProps {
  slides: Slide[];
  lang: string;
}

const heroImages = [
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80",
  "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80",
  "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920&q=80",
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80",
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80",
];

export function HeroCarousel({ slides, lang }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 1200);
    },
    [isTransitioning]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      goToSlide((current + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [current, slides.length, goToSlide]);

  return (
    <section className="hero-carousel" id="hero">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`hero-slide ${index === current ? "active" : ""}`}
        >
          <div
            className="hero-slide-bg"
            style={{
              backgroundImage: `url(${heroImages[index % heroImages.length]})`,
              animationDelay: `${index * 2}s`,
            }}
          />
          <div className="hero-overlay" />
          <div className="hero-content">
            <div
              style={{
                transform: index === current ? "translateY(0)" : "translateY(30px)",
                opacity: index === current ? 1 : 0,
                transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s",
              }}
            >
              <h1 className="hero-title">{slide.title}</h1>
              <p className="hero-subtitle">{slide.subtitle}</p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href={`/${lang}/services`} className="btn-primary">
                  {lang === "ar" ? "خدماتنا" : "Our Services"} →
                </Link>
                <Link href={`/${lang}/contact`} className="btn-secondary">
                  {lang === "ar" ? "تواصل معنا" : "Contact Us"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="hero-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`hero-dot ${index === current ? "active" : ""}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "5rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          animation: "bounce 2s infinite",
        }}
      >
        <div
          style={{
            width: "28px",
            height: "44px",
            border: "2px solid rgba(255,255,255,0.5)",
            borderRadius: "14px",
            display: "flex",
            justifyContent: "center",
            paddingTop: "8px",
          }}
        >
          <div
            style={{
              width: "4px",
              height: "8px",
              background: "#E9501C",
              borderRadius: "2px",
              animation: "scrollDown 2s infinite",
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
        @keyframes scrollDown {
          0% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(12px); }
        }
      `}</style>
    </section>
  );
}
