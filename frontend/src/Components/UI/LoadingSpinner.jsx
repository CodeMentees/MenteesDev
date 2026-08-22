import React from "react";

/** Inline spinner — use inside buttons or small containers */
export default function LoadingSpinner({ size = "md", className = "" }) {
  const sizes = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-2",
    lg: "w-12 h-12 border-4",
    xl: "w-16 h-16 border-4",
  };

  return (
    <div
      className={`inline-block ${sizes[size]} rounded-full animate-spin ${className}`}
      style={{
        borderColor: "rgba(249,115,22,0.2)",
        borderTopColor: "rgb(249,115,22)",
      }}
    />
  );
}

/** Full-screen overlay with backdrop blur */
export function LoadingOverlay({ message = "Loading..." }) {
  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)" }}>
      <div
        className="rounded-2xl p-8 flex flex-col items-center gap-4 shadow-2xl"
        style={{
          background: "rgb(var(--dash-panel))",
          border: "1px solid rgba(var(--dash-border))",
        }}
      >
        <LoadingSpinner size="xl" />
        <p className="text-sm font-semibold" style={{ color: "rgb(var(--dash-ink))" }}>
          {message}
        </p>
      </div>
    </div>
  );
}

/** Centered page-level spinner for route transitions */
export function PageLoader({ message = "Loading..." }) {
  return (
    <div className="min-h-screen flex items-center justify-center"
      style={{ background: "rgb(var(--bg))" }}>
      <div className="text-center flex flex-col items-center gap-4">
        <LoadingSpinner size="xl" />
        <p className="text-sm" style={{ color: "rgb(var(--text-secondary))" }}>
          {message}
        </p>
      </div>
    </div>
  );
}

/** Animated pulse skeleton — drop in while fetching course/blog cards */
export function SkeletonCard() {
  return (
    <div
      className="rounded-2xl p-5 animate-pulse"
      style={{
        background: "rgb(var(--surface))",
        border: "1px solid rgba(var(--border))",
      }}
    >
      {/* Image placeholder */}
      <div className="h-36 rounded-xl mb-4"
        style={{ background: "rgba(255,255,255,0.06)" }} />
      {/* Badge row */}
      <div className="flex gap-2 mb-3">
        <div className="h-5 w-16 rounded-full"
          style={{ background: "rgba(255,255,255,0.07)" }} />
      </div>
      {/* Title */}
      <div className="h-5 rounded mb-2"
        style={{ background: "rgba(255,255,255,0.07)", width: "75%" }} />
      <div className="h-4 rounded mb-4"
        style={{ background: "rgba(255,255,255,0.05)", width: "55%" }} />
      {/* Description lines */}
      <div className="space-y-2 mb-4">
        <div className="h-3 rounded" style={{ background: "rgba(255,255,255,0.05)" }} />
        <div className="h-3 rounded" style={{ background: "rgba(255,255,255,0.05)", width: "85%" }} />
        <div className="h-3 rounded" style={{ background: "rgba(255,255,255,0.05)", width: "70%" }} />
      </div>
      {/* Tags */}
      <div className="flex gap-2 mb-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-5 w-12 rounded"
            style={{ background: "rgba(255,255,255,0.06)" }} />
        ))}
      </div>
      {/* Divider */}
      <div className="h-px mb-4" style={{ background: "rgba(255,255,255,0.05)" }} />
      {/* CTA row */}
      <div className="flex justify-between">
        <div className="h-5 w-24 rounded" style={{ background: "rgba(249,115,22,0.15)" }} />
        <div className="h-7 w-20 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }} />
      </div>
    </div>
  );
}

/** Grid of SkeletonCards for list loading states */
export function SkeletonGrid({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
