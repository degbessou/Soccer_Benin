
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import HeroStatiq from "../Components/HeroStatiq";
import { getSupabaseImageUrl } from "../assets/Helpers"



export default function About() {
    const faqsList = [
        {
            "label": "Notre vision",
            "qas": [
                {
                    "q": "Pourquoi avoir créé cette plateforme ?",
                    "a": "Nous avons lancé ce site pour offrir un espace moderne, fiable et entièrement dédié au football béninois. L’objectif est de valoriser les équipes nationales, les clubs, les joueurs et de rendre l’information accessible à tous."
                },
                {
                    "q": "Quelle est la mission du projet ?",
                    "a": "Notre mission est de centraliser l'actualité du football béninois, les données du championnat (ligue 1, ligue 2, etc...) et de contribuer à une meilleure visibilité du football béninois."
                }
            ]
        },
        {
            "label": "Fonctionnement du site",
            "qas": [
                {
                    "q": "Que trouve-t-on sur le site ?",
                    "a": "Le site propose de l'information sur les équipes nationales, des actus, des résultats, et du contenu dédié au championnat béninois, le tout sous une forme claire et accessible."
                }
            ]
        },
        {
            "label": "Collecte des données",
            "qas": [
                {
                    "q": "Comment obtenez-vous les données ?",
                    "a": "Les données proviennent de différentes sources sur les réseaux sociaux principalement."
                },
                {
                    "q": "Puis-je aider à enrichir les données ?",
                    "a": "Oui ! Toute personne désirant contribuer à la collecte ou à la vérification d’informations peut participer. Il suffit de nous contacter via la page prévue à cet effet."
                }
            ]
        },
        {
            "label": "Communauté et participation",
            "qas": [
                {
                    "q": "À qui s’adresse cette plateforme ?",
                    "a": "Aux supporters, journalistes, joueurs, staffs techniques et à toute personne qui souhaite suivre le championnat béninois de manière simple et complète."
                },
                {
                    "q": "Comment rejoindre le projet ?",
                    "a": "Vous pouvez rejoindre notre équipe en nous écrivant directement. Nous sommes toujours heureux d'accueillir de nouveaux passionnés souhaitant contribuer au développement du site."
                }
            ]
        }
    ]



    return (
        <>
            <Navbar />
            <HeroStatiq src={getSupabaseImageUrl('medias/banner/sobemap_un.jpg')} alt="équipe de damissa fc" />
            <section className='pt-8'>
                <div className="max-w-screen-lg mx-auto px-4 md:px-8">
                    <div>
                        <h3 className='mt-3 text-gray-800 text-3xl text-center font-extrabold sm:text-4xl'>
                            Qui sommes nous ?
                        </h3>
                        <div className='mt-3 text-gray-600 text-center dark:text-gray-400'>
                            <p>
                                Vous ne retrouvez pas l'information que vous recherchez ?{" "}
                                <a
                                    className='text-yellow-700 font-semibold whitespace-nowrap'
                                    href='javascript:void(0)'>
                                    Contactez-nous
                                </a>
                                .
                            </p>
                        </div>
                    </div>
                    <div className='mt-12 divide-y sm:mt-20'>
                        {
                            faqsList.map((list, idx) => (
                                <div key={idx} className="py-5 first:pt-0 sm:grid sm:grid-cols-4 sm:gap-8">
                                    <div className="max-w-sm pt-0 pb-6 sm:pt-0 lg:flex-grow">
                                        <h4 className="text-green-700 font-semibold">
                                            {list.label}
                                        </h4>
                                    </div>
                                    <ul className='flex-1 space-y-6 sm:col-span-3 sm:last:pb-6 sm:space-y-8'>
                                        {list.qas.map((item, idx) => (
                                            <li
                                                key={idx}>
                                                <summary
                                                    className="flex items-center justify-between font-semibold text-yellow-700">
                                                    {item.q}
                                                </summary>
                                                <p
                                                    dangerouslySetInnerHTML={{ __html: item.a }}
                                                    className='mt-3 text-gray-600 leading-relaxed'>
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}