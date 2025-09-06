import ImageCarousel from "../assets/ImageCarousel";

const carouselImages = [
    {
        src: "/steeve_mounie.jpg",
        alt: "Steeve Yago Mounié",
        caption: "Cover : Steeve Yago Mounié"
    },
    {
        src: "/women-soccer.jpeg",
        alt: "Équipe féminine de football",
        caption: "Cover : Équipe féminine de football"
    },
    {
        src: "/dadje-fc.jpeg",
        alt: "Dadjè FC",
        caption: "Dadjè FC, champion du Bénin 2025-2026"
    }
];

export default () => {
    return (
        <section className="pt-10 pb-8">
            <div className="max-w-screen-lg mx-auto md:px-8">
                <div className="items-center gap-x-12 sm:px-4 md:px-0 lg:flex">
                    <div className="flex-1 lg:block">
                        {/* Utilisation du composant Carousel */}
                        <ImageCarousel
                            images={carouselImages}
                            interval={5000}
                        />
                    </div>
                    <div className="md:block max-w-xl px-4 space-y-3 mt-6 sm:px-0 md:mt-0 md:py-4 lg:max-w-2xl">

                        <p className="text-gray-800 text-2xl font-extrabold sm:text-3xl">
                            Toute l’actualité du football béninois.
                        </p>
                        <p className="mt-3 text-gray-600">
                            Retrouvez en temps réel, les dernières nouvelles, résultats et coulisses sur le football béninois.
                            De la ligue locale aux compétitions internationales, ne manquez rien de ce qui fait vibrer les supporters au Bénin.
                            On vous dit tout ! Ici, le ballon ne s’arrête jamais et la passion se partage en grand.
                        </p>
                        {/*<a href="javascript:void(0)" className="inline-flex gap-x-1 items-center text-indigo-600 hover:text-indigo-500 duration-150 font-medium">
                            Learn more
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                            </svg>
                        </a>*/}
                    </div>
                </div>
            </div>
        </section>
    )
}