import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "var(--space-6)",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: "clamp(72px, 12vw, 120px)",
          fontWeight: 700,
          fontFamily: "var(--font-display)",
          letterSpacing: "-0.05em",
          lineHeight: 0.9,
          color: "var(--accent)",
        }}
      >
        404
      </div>
      <h1
        style={{
          fontSize: "clamp(24px, 3vw, 32px)",
          fontFamily: "var(--font-display)",
          marginTop: "var(--space-4)",
          letterSpacing: "-0.02em",
        }}
      >
        Page not found
      </h1>
      <p
        style={{
          color: "var(--ink-soft)",
          fontSize: "16px",
          lineHeight: 1.6,
          maxWidth: "440px",
          marginTop: "var(--space-3)",
        }}
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Try starting from the docs.
      </p>
      <div
        style={{
          display: "flex",
          gap: "var(--space-3)",
          marginTop: "var(--space-6)",
        }}
      >
        <Link href="/" className="btn btn-primary">
          Go home
        </Link>
        <Link href="/docs" className="btn btn-secondary">
          Browse docs
        </Link>
      </div>
    </div>
  );
}
