import React from "react";
import LoadingSpinner from "../UI/LoadingSpinner";

/** Themed full-page loader — replaces the old gray bg version */
function Loading({ message = "Loading..." }) {
  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ background: "rgb(var(--bg))" }}
    >
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner size="lg" />
        <p className="text-sm font-medium" style={{ color: "rgb(var(--text-secondary))" }}>
          {message}
        </p>
      </div>
    </div>
  );
}

export default Loading;
