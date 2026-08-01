import React from "react";

function Pagination({ page, totalPages, onPageChange }) {
    return (
        <div className="pagination">
            <button disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
                &larr; Prev
            </button>
            <span>Page {page} of {totalPages}</span>
            <button disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>
                Next &rarr;
            </button>
        </div>
    );
}

export default Pagination;
