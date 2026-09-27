'use client';

/**
 * Unauth — Unauthorized access page
 */
export default function Unauth() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white px-6" style={{ background: '#000005' }}>
      <div className="text-center max-w-lg">
        <h1 className="text-8xl font-black text-red-500 mb-4">401</h1>
        <h2 className="text-3xl font-bold mb-4">Unauthorized</h2>
        <p className="text-gray-400 mb-8">
          You don&apos;t have permission to access this page.
        </p>
        <a
          href="/login"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
        >
          Login
        </a>
      </div>
    </div>
  );
}
