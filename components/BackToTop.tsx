"use client";

import { useState, useEffect } from "react";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <button
        className={`back-to-top ${isVisible ? "visible" : ""}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        ↑
      </button>
      <style jsx>{`
        .back-to-top {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, #E9501C, #F28B2D);
          color: #fff;
          border: none;
          box-shadow: 0 4px 12px rgba(233, 80, 28, 0.4);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          z-index: 90;
          opacity: 0;
          transform: translateY(20px);
          pointer-events: none;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .back-to-top.visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: all;
        }
        @media (max-width: 768px) {
          .back-to-top {
            bottom: 1.5rem;
            right: 1.5rem;
            width: 42px;
            height: 42px;
            font-size: 1.25rem;
            z-index: 90;
          }
        }
        :global([dir="rtl"]) .back-to-top {
          right: auto;
          left: 2rem;
        }
        @media (max-width: 768px) {
          :global([dir="rtl"]) .back-to-top {
            right: auto;
            left: 1.5rem;
          }
        }
      `}</style>
    </>
  );
}
