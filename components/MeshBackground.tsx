// Server component — mesh uniquement en dégradés radiaux (sans filter: blur)

const blobPrimary =
  "radial-gradient(circle at 45% 42%, rgba(37,99,235,0.34) 0%, rgba(37,99,235,0.18) 18%, rgba(37,99,235,0.08) 36%, rgba(37,99,235,0.03) 52%, transparent 68%)";

const blobSecondary =
  "radial-gradient(circle at 55% 48%, rgba(59,130,246,0.22) 0%, rgba(59,130,246,0.11) 22%, rgba(59,130,246,0.04) 42%, transparent 65%)";

const blobDim =
  "radial-gradient(circle at 48% 45%, rgba(37,99,235,0.14) 0%, rgba(37,99,235,0.06) 28%, rgba(37,99,235,0.02) 48%, transparent 68%)";

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
          width: "880px",
          height: "880px",
          background: blobPrimary,
          top: "-15%",
          left: "-15%",
        }}
      />
      <div
        className="mesh-blob animate-mesh-2"
        style={{
          width: "540px",
          height: "540px",
          background: blobSecondary,
          top: "4%",
          right: "-8%",
        }}
      />
      <div
        className="mesh-blob animate-mesh-3"
        style={{
          width: "720px",
          height: "720px",
          background: blobDim,
          bottom: "2%",
          left: "20%",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 82% 62% at 50% 48%, transparent 0%, #050508 88%)",
        }}
      />
    </div>
  );
}
