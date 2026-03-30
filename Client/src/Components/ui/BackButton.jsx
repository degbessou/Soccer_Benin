// src/components/ui/BackButton.jsx
import { useNavigate } from "react-router-dom";

const BackButton = ({ to, label = "Retour" }) => {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(to)}
            className="flex items-center gap-2 text-sm text-yellow-600 py-4 font-medium inline-flex hover:text-yellow-800 transition-colors duration-150 group"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 transition-transform group-hover:-translate-x-1 duration-150"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {label}
        </button>
    );
};

export default BackButton;