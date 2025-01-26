import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="flex justify-center items-center gap-4 mt-4">
            <button 
                className={`bg-gray-300 px-4 py-2 rounded ${currentPage !== 1 && 'hover:cursor-pointer hover:bg-gray-400'}`} 
                onClick={handlePrevious} 
                disabled={currentPage === 1}
            >
                Previous
            </button>
            <span>{currentPage} of {totalPages}</span>
            <button 
                className={`bg-gray-300 px-4 py-2 rounded ${currentPage !== totalPages && 'hover:cursor-pointer hover:bg-gray-400'}`}
                onClick={handleNext}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;