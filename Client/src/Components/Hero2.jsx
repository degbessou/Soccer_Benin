import ImageCarousel from "../assets/ImageCarousel";
import Title from "../assets/Title";

const carouselImages = [
    {
        src: "/img_liguepro_1.jpg",
        alt: "Steeve Yago Mounié",
        caption: "Cover : Coton FC"
    },
    {
        src: "/img_liguepro_2.jpg",
        alt: "Équipe féminine de football",
        caption: "Cover : Coton FC"
    },
    {
        src: "/img_liguepro_3.jpg",
        alt: "Dadjè FC",
        caption: "Cover : Coton FC"
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
                    <Title title="Le mercato béninois, c'est ici."
                        description="Suivez pas à pas l’actualité du marché des transferts des béninois d'ici et d'ailleurs. Rumeurs, officialisations et mouvements de joueurs : ne manquez aucune information sur vos clubs et stars préférés." />
                </div>
            </div>
        </section>
    )
}