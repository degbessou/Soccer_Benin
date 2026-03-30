// src/components/MovingBorderDemo.jsx
import { Button } from "./ui/moving-border";

export function MovingBorderDemo({ text, className, onClick }) {
    return (
        <div className={`md:ml-auto ${className || ''}`}>
            <Button
                borderRadius="1.75rem"
                className="bg-white text-red-700 font-bold text-sm"
                onClick={onClick}
            >
                {text}
            </Button>
        </div>
    );
}