interface PageHeroProps {
  label: string;
  title: string;
  subtitle: string;
}

export default function PageHero({ label, title, subtitle }: PageHeroProps) {
  return (
    <section
      style={{
        paddingTop: "10rem",
        paddingBottom: "4rem",
        background: "#0e1f1a",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid lines background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
        }}
      />
      {/* Accent corner */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "300px",
          height: "300px",
          background: "linear-gradient(135deg, rgba(233,80,28,0.08), transparent)",
          clipPath: "polygon(100% 0, 0 0, 100% 100%)",
        }}
      />
      {/* Bottom accent line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "linear-gradient(90deg, transparent, #E9501C 30%, #F28B2D 70%, transparent)",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 1.5rem",
        }}
      >
        <span className="section-label" style={{ color: "#F28B2D" }}>
          {label}
        </span>
        <h1
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            fontWeight: 900,
            color: "#ffffff",
            marginTop: "0.5rem",
            marginBottom: "1rem",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          {title}
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: "1.1rem",
            maxWidth: "550px",
            lineHeight: 1.6,
          }}
        >
          {subtitle}
        </p>
      </div>
    </section>
  );
}
