import Link from "next/link";

export default function DocsNotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        textAlign: "center",
        padding: "4rem 2rem",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(48px, 8vw, 96px)",
          fontWeight: 700,
          letterSpacing: "-0.04em",
          color: "var(--accent)",
          lineHeight: 1,
          marginBottom: "1rem",
        }}
      >
        404
      </h1>
      <h2
        style={{ fontSize: "clamp(20px, 3vw, 28px)", marginBottom: "0.75rem" }}
      >
        Page not found
      </h2>
      <p
        style={{
          color: "var(--muted)",
          maxWidth: "420px",
          marginBottom: "2rem",
          fontSize: "15px",
          lineHeight: 1.6,
        }}
      >
        This documentation page doesn&apos;t exist. It may have been removed,
        renamed, or isn&apos;t available in the version you&apos;re viewing.
      </p>
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Link href="/docs" className="btn btn-primary">
          Browse docs
        </Link>
        <Link href="/" className="btn btn-secondary">
          Go home
        </Link>
      </div>
    </div>
  );
}
