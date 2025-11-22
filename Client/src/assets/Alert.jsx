import React from "react";

export default function Alert({ alert, setAlert }) {
    if (!alert.show) return null;

    const colorClass =
        alert.type === "success"
            ? "bg-green-50 border-green-300 text-green-800"
            : alert.type === "warning"
                ? "bg-yellow-50 border-yellow-300 text-yellow-800"
                : "bg-red-50 border-red-300 text-red-800";

    return (
        <div
            role="alert"
            className={`fixed top-4 right-4 z-50 flex items-center gap-3 rounded-lg px-4 py-3 shadow-lg border ${colorClass}`}
        >
            {/* Icône */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="h-6 w-6 shrink-0 stroke-current"
            >
                {alert.type === "warning" ? (
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                ) : (
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                )}
            </svg>

            {/* Message */}
            <span className="font-medium">{alert.message}</span>

            {/* Bouton fermer */}
            <button
                className="ml-2 rounded-md px-2 py-1 hover:bg-black/10 transition"
                onClick={() => setAlert({ show: false, message: "", type: "" })}
            >
                ✕
            </button>
        </div>
    );
}
