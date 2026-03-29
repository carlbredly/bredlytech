// Server component — no interactivity needed, pure CSS animation

export default function MeshBackground() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Primary blue blob — top-left */}
      <div
        className="mesh-blob animate-mesh-1"
        style={{
          width: "700px",
          height: "700px",
          background:
            "radial-gradient(circle, rgba(37,99,235,0.22) 0%, transparent 65%)",
          top: "-15%",
          left: "-8%",
        }}
      />
      {/* Secondary glow blob — top-right */}
      <div
        className="mesh-blob animate-mesh-2"
        style={{
          width: "550px",
          height: "550px",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.14) 0%, transparent 65%)",
          top: "5%",
          right: "-6%",
        }}
      />
      {/* Dim anchor blob — bottom center */}
      <div
        className="mesh-blob animate-mesh-3"
        style={{
          width: "800px",
          height: "800px",
          background:
            "radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 65%)",
          bottom: "5%",
          left: "15%",
        }}
      />
      {/* Vignette darkening toward edges */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, transparent 0%, #050508 90%)",
        }}
      />
    </div>
  );
}
