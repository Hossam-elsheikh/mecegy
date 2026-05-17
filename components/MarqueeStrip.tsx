"use client";

import { useEffect, useRef, useState } from "react";

interface Stat {
  count: string;
  label: string;
  suffix: string;
}

export default function MarqueeStrip({ stats }: { stats: Stat[] }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Duplicate items for seamless loop
  const items = [...stats, ...stats, ...stats, ...stats];

  return (
    <div ref={ref} className="marquee-wrap" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "none" : "translateY(20px)", transition: "all 0.8s ease" }}>
      <div className="marquee-track">
        {items.map((stat, i) => (
          <div key={i} className="marquee-item">
            <span className="marquee-num">{stat.count}{stat.suffix}</span>
            <span className="marquee-label">{stat.label}</span>
            <span className="marquee-dot">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}
