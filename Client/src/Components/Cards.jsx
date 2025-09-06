const members = [
    {
        icon: <svg className="w-8 h-8" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="32" y="96" width="448" height="320" fill="#6EBF5D" />
            <path
                d="M496,448H16c-8.836,0-16-7.164-16-16V80c0-8.836,7.164-16,16-16h480c8.836,0,16,7.164,16,16v352
            C512,440.836,504.836,448,496,448z M32,416h448V96H32V416z"
                fill="#003B54"
            />
            <path
                d="M336,256.016c0.016-38.703-27.492-70.985-64-78.406V96h-32v81.61
            c-36.515,7.422-64.015,39.703-64,78.406c-0.007,38.703,27.477,70.969,64,78.382V416h32v-81.602
            C308.508,326.985,336.016,294.719,336,256.016z M208.008,256.016c0.008-20.89,13.367-38.61,31.992-45.203v90.406
            C221.375,294.626,208.016,276.906,208.008,256.016z M272,301.211v-90.406c18.633,6.586,32,24.321,32,45.195
            C303.993,276.875,290.633,294.61,272,301.211z"
                fill="white"
            />
            <path
                d="M480.016,320c-8,0-7.234,0-16.032,0h-16c-8.797,0-16-7.202-16-16v-96c0-8.797,7.203-16,16-16H480
            c0.008,0,0.008,0,0.008,0l0.008-32c0,0-0.008,0-0.016,0h-32.016C421.586,160,400,181.61,400,208v96c0,26.406,21.586,48,47.984,48
            H480c0.008,0,0.008,0,0.008,0L480.016,320z"
                fill="white"
            />
            <path
                d="M31.984,192c8,0,7.234,0,16.032,0h16c8.797,0,16,7.203,16,16v96c0,8.798-7.203,16-16,16H32
            c0,0-0.008,0-0.016,0v32c0.008,0,0.008,0,0.008,0h32.024C90.414,352,112,330.406,112,304v-96c0-26.39-21.586-48-47.984-48H32
            c0,0-0.008,0-0.016,0V192z"
                fill="white"
            />
        </svg>
        ,
        tag: "Equipe Nationale Masculine Sénoir",
        infos: "Les Guépards ont entamé les préparatifs des 7e et 8e journées des Éliminatoires de la Coupe du Monde 2026-Zone Afrique depuis ce lundi 1er septembre à Abidjan.",
        date: "[01-09-2025]"
    },
    {
        icon: "⚽",
        tag: "Joueurs",
        infos: "𝗔𝗡𝗗𝗥𝗘𝗔𝗦 𝗛𝗢𝗨𝗡𝗧𝗢𝗡𝗗𝗝𝗜 encore butteur avec le club allemand St. Pauli, dans une victoire 0-2 face au Hambourg SV. ",
        date: "[31-08-2025]"
    },
    {
        icon: <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M36 0v6H0v6h36v6l12-9zM12 24 0 33l12 9v-6h36v-6H12z"
                fill="#07B737"
            />
        </svg>
        ,
        tag: "Mercato",
        infos: "Yolande Gnammi s’engage avec l’AS FAR au Maroc en provenance d'Ittihad Football Féminin Ranger.",
        date: "[20-08-2025]"
    }
]

export default () => (
    <section className="py-4">
        <div className="max-w-screen-lg mx-auto px-4 md:px-8">
            <div className="max-w-xl mb-8">
                <h1 className="text-gray-800 text-2xl font-extrabold sm:text-3xl">L’actualité de septembre 🍁</h1>
                {/*<p className="text-gray-600 mt-2 mb-8">Retrouvez en temps réel, les dernières nouvelles, résultats et coulisses sur le football béninois. De la ligue locale aux compétitions internationales, ne manquez rien de ce qui fait vibrer les supporters au Bénin.</p>*/}
            </div>
            <ul>
                {
                    members.map((item, idx) => (
                        <li key={idx} className="px-4 py-2 duration-150 hover:border-white hover:rounded-xl hover:bg-green-50">
                            <a >
                                <div className="flex items-center gap-x-3">
                                    <div className="bg-white w-4 h-4 flex items-center justify-center pt-1">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-red-700 text-sm font-semibold mt-1">{item.tag}</h3>
                                    </div>
                                </div>
                                <div className="items-center grid grid-cols-[auto_1fr] gap-4">
                                    <span className="items-center text-sm">
                                        {item.date}
                                    </span>
                                    <p className="text-sm">
                                        {item.infos}
                                    </p>
                                </div>
                            </a>
                        </li>
                    ))
                }
            </ul>
        </div>
    </section>
)