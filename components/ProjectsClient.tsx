"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface ProjectsClientProps {
  dict: Record<string, any>;
  lang: string;
}

const projectImages = [
  "https://images.unsplash.com/photo-1562516155-e0c1ee44059b?w=800&q=80",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
  "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800&q=80",
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
  "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800&q=80",
];

export function ProjectsClient({ dict, lang }: ProjectsClientProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const categories = Object.keys(dict.projects.categories);

  const filteredProjects =
    activeCategory === "all"
      ? dict.projects.items
      : dict.projects.items.filter((p: any) => p.category === activeCategory);

  return (
    <>
      {/* Category Filters */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.75rem",
          justifyContent: "center",
          marginBottom: "3rem",
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {dict.projects.categories[cat]}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {filteredProjects.map((project: any, i: number) => (
          <Link
            key={`${project.slug}-${i}`}
            href={`/${lang}/projects/${project.slug}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              className="project-card"
              style={{
                position: "relative",
                borderRadius: "16px",
                overflow: "hidden",
                aspectRatio: "4/3",
                cursor: "pointer",
              }}
            >
              <Image
                src={projectImages[i % projectImages.length]}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
              />
              <div className="project-card-overlay" />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "1.5rem",
                  zIndex: 2,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    padding: "0.25rem 0.75rem",
                    background: "rgba(233, 80, 28, 0.9)",
                    color: "#fff",
                    borderRadius: "50px",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    marginBottom: "0.5rem",
                  }}
                >
                  {dict.projects.categories[project.category]}
                </span>
                <h3 style={{ color: "#fff", fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.25rem" }}>
                  {project.title}
                </h3>
                <p className="card-description" style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.85rem", lineHeight: 1.5, marginTop: "0.5rem" }}>
                  {project.description}
                </p>
                <span
                  style={{
                    display: "inline-block",
                    marginTop: "0.75rem",
                    color: "#F28B2D",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                  }}
                >
                  {dict.projects.viewProject} →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
