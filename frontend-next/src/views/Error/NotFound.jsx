'use client';

/**
 * NotFound — 404 page
 */
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white px-6" style={{ background: '#000005' }}>
      <div className="text-center max-w-lg">
        <h1 className="text-8xl font-black text-orange-500 mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <a
          href="/"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
