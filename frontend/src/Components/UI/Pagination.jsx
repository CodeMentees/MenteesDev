import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  // Generate page numbers with better UI handling
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5; // Limit number of buttons shown
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage > 2) pages.push(1, "..."); // Show first page + ellipsis if far from start
      for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 1) pages.push("...", totalPages); // Show last page + ellipsis if far from end
    }
    return pages;
  };

  return (
    <nav className="flex justify-center mt-4">
      <ul className="inline-flex items-center gap-1">
        {/* Previous Button */}
        <li>
          <button
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-2 border rounded-l-lg ${
              currentPage === 1 ? "text-gray-400 cursor-not-allowed bg-gray-200" : "hover:bg-gray-100"
            }`}
            aria-label="Previous Page"
          >
            Prev
          </button>
        </li>

        {/* Page Numbers */}
        {getPageNumbers().map((page, index) => (
          <li key={index}>
            {page === "..." ? (
              <span className="px-3 py-2 border text-gray-500">...</span>
            ) : (
              <button
                onClick={() => handlePageClick(page)}
                className={`px-3 py-2 border ${
                  currentPage === page ? "bg-blue-500 text-white" : "hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            )}
          </li>
        ))}

        {/* Next Button */}
        <li>
          <button
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 border rounded-r-lg ${
              currentPage === totalPages ? "text-gray-400 cursor-not-allowed bg-gray-200" : "hover:bg-gray-100"
            }`}
            aria-label="Next Page"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
