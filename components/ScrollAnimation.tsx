"use client";

import { useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";

export function ScrollAnimationProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Small delay to ensure DOM is updated after navigation
    const timeout = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate-in");
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -50px 0px",
        }
      );

      const animatedElements = document.querySelectorAll(
        ".scroll-animate:not(.animate-in), .scroll-animate-left:not(.animate-in), .scroll-animate-right:not(.animate-in), .scroll-animate-scale:not(.animate-in), .stagger-children:not(.animate-in)"
      );

      animatedElements.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return <>{children}</>;
}
