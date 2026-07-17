"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
          fontSize: "clamp(48px, 8vw, 72px)",
          fontWeight: 700,
          fontFamily: "var(--font-display)",
          letterSpacing: "-0.04em",
          lineHeight: 0.9,
          color: "var(--accent)",
        }}
      >
        Oops
      </div>
      <h1
        style={{
          fontSize: "clamp(24px, 3vw, 32px)",
          fontFamily: "var(--font-display)",
          marginTop: "var(--space-4)",
        }}
      >
        Something went wrong
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
        An unexpected error occurred. Try refreshing the page, or start over
        from the homepage.
      </p>
      <div
        style={{
          display: "flex",
          gap: "var(--space-3)",
          marginTop: "var(--space-6)",
        }}
      >
        <button onClick={reset} className="btn btn-primary">
          Try again
        </button>
        <a href="/" className="btn btn-secondary">
          Go home
        </a>
      </div>
    </div>
  );
}
