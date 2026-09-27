'use client';

import React from 'react';

/**
 * Pagination — reusable pagination component.
 */
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (!totalPages || totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1.5 rounded-lg text-sm disabled:opacity-30 disabled:cursor-not-allowed
                   bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
      >
        ← Prev
      </button>

      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1.5 rounded-lg text-sm border transition-colors
            ${page === currentPage
              ? 'bg-orange-500 border-orange-500 text-white font-semibold'
              : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
            }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1.5 rounded-lg text-sm disabled:opacity-30 disabled:cursor-not-allowed
                   bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
      >
        Next →
      </button>
    </div>
  );
}
