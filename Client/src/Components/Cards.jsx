const members = [
    {
        icon: "",
        tag: "Equipe Nationale Masculine Sénoir",
        infos: "Les Guépards ont entamé les préparatifs des 7e et 8e journées des Éliminatoires de la Coupe du Monde 2026-Zone Afrique depuis ce lundi 1er septembre à Abidjan.",
        date: "[01-09-2025]"
    },
    {
        icon: "",
        tag: "Joueurs",
        infos: "𝗔𝗡𝗗𝗥𝗘𝗔𝗦 𝗛𝗢𝗨𝗡𝗧𝗢𝗡𝗗𝗝𝗜 encore butteur avec le club allemand St. Pauli, dans une victoire 0-2 face au Hambourg SV. ",
        date: "[31-08-2025]"
    },
    {
        icon: "",
        tag: "Mercato",
        infos: "Yolande Gnammi s’engage avec l’AS FAR au Maroc en provenance d'Ittihad Football Féminin Ranger.",
        date: "[20-08-2025]"
    }
]

export default () => (
    <section className="py-28">
        <div className="max-w-screen-lg mx-auto px-4 md:px-8">
            <div className="max-w-md">
                <h1 className="text-gray-800 text-2xl font-extrabold sm:text-3xl">Open Positions</h1>
                <p className="text-gray-600 mt-2">We're currently looking talent software engineers, and designers to help us in our missions and to grow up.</p>
            </div>
            <ul className="mt-12 space-y-3">
                {
                    members.map((item, idx) => (
                        <li key={idx} className="px-4 py-5 duration-150 hover:border-white hover:rounded-xl hover:bg-gray-50">
                            <a className="space-y-3">
                                <div className="flex items-center gap-x-3">
                                    <div className="bg-white w-14 h-14 flex items-center justify-center">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-base text-gray-800 font-semibold mt-1">{item.tag}</h3>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="flex items-center gap-2">
                                        {item.date}
                                    </span>
                                    <p className="flex text-gray-600 sm:text-sm">
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