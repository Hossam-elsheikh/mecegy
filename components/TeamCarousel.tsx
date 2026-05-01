"use client";

import { User } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
}

interface TeamCarouselProps {
  members: TeamMember[];
  lang: string;
}

export default function TeamCarousel({ members, lang }: TeamCarouselProps) {
  // Using the same component name but rendering a modern responsive grid of cards
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "2rem",
        padding: "1rem 0 3rem 0",
      }}
    >
      {members.map((member, idx) => (
        <div
          key={idx}
          className="team-member-card"
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            padding: "2rem",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
            border: "1px solid rgba(0,0,0,0.04)",
            textAlign: "center",
            transition: "all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            cursor: "default",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-8px)";
            e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.12)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.06)";
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, rgba(233,80,28,0.1), rgba(242,139,45,0.1))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem",
              color: "#E9501C",
            }}
          >
            <User size={40} />
          </div>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#163029", marginBottom: "0.5rem" }}>
            {member.name}
          </h3>
          <p style={{ color: "#6b7280", fontSize: "0.95rem", marginTop: "0.5rem" }}>{member.role}</p>
        </div>
      ))}
    </div>
  );
}
