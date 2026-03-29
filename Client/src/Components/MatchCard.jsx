import LiveBadge from "./ui/LiveBadge";

const MatchCard = ({ href, img, date, heure, title, desc, isLive }) => {
    return (
        <li className="w-[240px] rounded-xl overflow-hidden bg-gray-200 shadow-sm group cursor-pointer flex-shrink-0">
            <a href={href}>
                <div className="relative">
                    <img
                        src={img}
                        loading="lazy"
                        alt={title}
                        className="w-full h-[160px] px-0.5 pt-0.5 rounded-t-xl object-cover"
                    />
                    {isLive && (
                        <div className="absolute top-2 right-2">
                            <LiveBadge />
                        </div>
                    )}
                </div>

                <div className="bg-gray-200 px-3 py-2.5 space-y-1 hover:bg-neutral-300">
                    <span className="block text-yellow-800 text-xs">{date}</span>
                    <h3 className="text-gray-900 text-lg font-semibold leading-snug line-clamp-2">
                        {title}
                    </h3>
                    <p className="text-black-400 text-sm">
                        {desc} | {heure}
                    </p>
                </div>
            </a>
        </li>
    );
};

export default MatchCard;