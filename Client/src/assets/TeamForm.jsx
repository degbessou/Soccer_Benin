// components/TeamForm.jsx
import { Check, X, Minus } from 'lucide-react';

const FORM_MAP = {
    V: { bg: 'bg-green-500', Icon: Check },
    D: { bg: 'bg-red-500', Icon: X },
    N: { bg: 'bg-gray-400', Icon: Minus },
};

export default function TeamForm({ form }) {
    if (!form) return null
    return (
        <div className="flex gap-1 items-center">
            {form.split('').reverse().map((char, i) => {
                const { bg, Icon } = FORM_MAP[char] ?? FORM_MAP.N;
                return (
                    <div
                        key={i}
                        className={`${bg} w-[22px] h-[22px] rounded-full flex items-center justify-center`}
                    >
                        <Icon size={12} color="white" strokeWidth={2.5} />
                    </div>
                );
            })}
        </div>
    );
}