"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export interface ProjectCard {
  slug: string;
  title: string;
  category: string;
  image: string | null;
  description: string | null;
}

interface ProjectsClientProps {
  projects: ProjectCard[];
  categories: Record<string, string>;
  ui: { viewProject: string };
  lang: string;
}

const fallbackImage = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80";

export function ProjectsClient({ projects, categories, ui, lang }: ProjectsClientProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const categoryKeys = Object.keys(categories);

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

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
        {categoryKeys.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {categories[cat]}
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
        {filteredProjects.map((project, i) => (
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
                src={project.image || fallbackImage}
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
                  {categories[project.category]}
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
                  {ui.viewProject} →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
