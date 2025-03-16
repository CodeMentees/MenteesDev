import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <nav className="flex justify-center mt-4">
      <ul className="inline-flex items-center -space-x-px">
        {/* Previous Button */}
        <li>
          <button
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-2 border rounded-l-lg ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100"}`}
          >
            Prev
          </button>
        </li>
        
        {/* Page Numbers */}
        {[...Array(totalPages).keys()].map((_, index) => {
          const page = index + 1;
          return (
            <li key={page}>
              <button
                onClick={() => handlePageClick(page)}
                className={`px-3 py-2 border ${currentPage === page ? "bg-blue-500 text-white" : "hover:bg-gray-100"}`}
              >
                {page}
              </button>
            </li>
          );
        })}
        
        {/* Next Button */}
        <li>
          <button
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 border rounded-r-lg ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100"}`}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
