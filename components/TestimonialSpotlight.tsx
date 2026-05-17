"use client";

import { useState, useCallback, useEffect } from "react";

interface Testimonial {
  name: string;
  company: string;
  quote: string;
}

interface Props {
  testimonials: { title: string; subtitle: string; items: Testimonial[] };
  lang: string;
}

export default function TestimonialSpotlight({ testimonials, lang }: Props) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const items = testimonials.items;

  const go = useCallback((idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  }, [current]);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % items.length);
    }, 3000); // 3 seconds
    return () => clearInterval(timer);
  }, [items.length]);

  const t = items[current];

  return (
    <section id="testimonials" className="spotlight-section">
      {/* Abstract Shapes */}
      <div className="spotlight-shape shape-1" />
      <div className="spotlight-shape shape-2" />
      <div className="spotlight-shape shape-3" />

      <div className="spotlight-inner">
        <div className="spotlight-label">
          <span className="section-label">{lang === "ar" ? "آراء العملاء" : "Testimonials"}</span>
          <h2 className="spotlight-heading">{testimonials.title}</h2>
        </div>

        <div className="spotlight-quote-wrap">
          <div className="spotlight-quote-mark">&ldquo;</div>
          <blockquote
            key={current}
            className="spotlight-quote"
            style={{
              animation: `spotlightIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
            }}
          >
            {t.quote}
          </blockquote>
          <div className="spotlight-author">
            <div className="spotlight-author-avatar">
              {t.name.charAt(0)}
            </div>
            <div>
              <div className="spotlight-author-name">{t.name}</div>
              <div className="spotlight-author-company">{t.company}</div>
            </div>
          </div>
        </div>

        <div className="spotlight-dots">
          {items.map((_, i) => (
            <button
              key={i}
              className={`spotlight-dot ${i === current ? "active" : ""}`}
              onClick={() => go(i)}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
