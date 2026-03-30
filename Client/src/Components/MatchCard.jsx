import { useNavigate } from "react-router-dom";
import { getSupabaseImageUrl } from "../assets/Helpers";
import LiveBadge from "./ui/LiveBadge";

const StatusBadge = ({ status, isLive }) => {
    if (isLive) return <LiveBadge />;

    const config = {
        a_venir: { label: "À venir", className: 'bg-orange-100 text-orange-700' },
        termine: { label: "Terminé", className: 'bg-green-100 text-green-700' },
    };

    const badge = config[status];
    if (!badge) return null;

    return (
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium tracking-wide ${badge.className}`}>
            {badge.label}
        </span>
    );
};

const MatchCard = ({ img, date, heure, title, desc, isLive, slug, status }) => {
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        navigate(`/live/${slug}`);
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [day, month, year] = dateStr.split("-");
        return new Date(`${year}-${month}-${day}`).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "short",
            year: "numeric"
        }).replace(".", "");
    };

    return (
        <li className="w-[240px] rounded-xl overflow-hidden bg-gray-200 shadow-sm group cursor-pointer flex-shrink-0">
            <a onClick={handleClick}>
                <div className="relative">
                    <img
                        src={getSupabaseImageUrl(img)}
                        loading="lazy"
                        alt={title}
                        className="w-full h-[160px] px-0.5 pt-0.5 rounded-t-xl object-cover"
                    />
                    <div className="absolute top-2 right-2">
                        <StatusBadge status={status} isLive={isLive} />
                    </div>
                </div>

                <div className="bg-gray-200 px-3 py-2.5 space-y-1 hover:bg-neutral-300">
                    <span className="block text-yellow-800 text-xs">{formatDate(date)}</span>
                    <h3 className="text-gray-900 text-lg font-semibold leading-snug line-clamp-2">
                        {title}
                    </h3>
                    <p className="text-gray-500 text-sm">
                        {desc} | {heure}
                    </p>
                </div>
            </a>
        </li>
    );
};

export default MatchCard;