import { useState } from "react";

export default function Pagination({ totalPages, currentPage, onPageChange }) {
    const pages = Array.from({ length: totalPages }, (_, i) => (i + 1).toString());

    return (
        <div className="max-w-screen-xl mx-auto mt-12 px-4 md:px-8">
            <div className="hidden items-center justify-between sm:flex" aria-label="Pagination">
                <button
                    onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                    className="hover:text-yellow-700 flex items-center gap-x-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path
                            fillRule="evenodd"
                            d="M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Précédent
                </button>

                <ul className="flex items-center gap-1">
                    {pages.map((item) => (
                        <li key={item} className="text-sm">
                            <button
                                onClick={() => onPageChange(parseInt(item))}
                                aria-current={currentPage == item ? "page" : undefined}
                                className={`px-3 py-2 rounded-lg duration-150 hover:text-yellow-700 hover:bg-yellow-50 ${currentPage == item ? "bg-yellow-50 text-yellow-700 font-medium" : ""
                                    }`}
                            >
                                {item}
                            </button>
                        </li>
                    ))}
                </ul>

                <button
                    onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                    className="hover:text-yellow-700 flex items-center gap-x-2"
                >
                    Suivant
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path
                            fillRule="evenodd"
                            d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>
            {/* Mobile */}
            <div className="flex items-center justify-between text-sm font-medium sm:hidden">
                <button
                    onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                    className="px-4 py-2 duration-150 hover:bg-green-100 hover:text-green-700 hover:rounded-lg"
                >
                    Précédent
                </button>

                <div className="font-medium ">Page {currentPage} sur {totalPages}</div>

                <button
                    onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                    className="px-4 py-2 duration-150 hover:bg-green-100 hover:text-green-700 hover:rounded-lg"
                >
                    Suivant
                </button>
            </div>
        </div>
    );
}
