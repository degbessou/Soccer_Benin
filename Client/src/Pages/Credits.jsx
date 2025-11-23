
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import HeroStatiq from "../Components/HeroStatiq";
import { getSupabaseImageUrl } from "../assets/Helpers"

export default function Contact() {
    const faqsList = [
        {
            "label": "Images",
            "qas": [
                {
                    "a": "@FédérationBéninoiseFootball, @SilcomeHounye, @Uris-ProBenin, les différents réseaux sociaux des clubs et des ultras des clubs."
                }
            ]
        },
        {
            "label": "Actualités",
            "qas": [
                {
                    "a": "@FédérationBéninoiseFootball, @AriyoSPorts, @JoueursBéninois, @BéninFootball, @SuprasMag, @ObservatoireSportifBeninois, les différents réseaux sociaux des clubs et des ultras des clubs."
                }
            ]
        },
        {
            "label": "Scores et statistiques",
            "qas": [
                {
                    "a": "@AriyoSPorts, @AliboriSports, @JoueursBéninois, @ABMSports"
                }
            ]
        }
    ]



    return (
        <>
            <Navbar />
            <HeroStatiq src={getSupabaseImageUrl('medias/mnt/nt_neuf.jpg')} alt="équipe nationale homme" />
            <section className='pt-8'>
                <div className="max-w-screen-lg mx-auto px-4 md:px-8">
                    <div>
                        <h3 className='mt-3 text-gray-800 text-3xl text-center font-extrabold sm:text-4xl'>
                            Merci !
                        </h3>
                        <div className='mt-3 text-gray-600 text-center dark:text-gray-400'>
                            <p>
                                Un merci sincère aux pages et médias qui rendent les informations sur le football béninois accessibles.
                            </p>
                        </div>
                    </div>
                    <div className='mt-12 divide-y sm:mt-20'>
                        {
                            faqsList.map((list, idx) => (
                                <div key={idx} className="py-5 first:pt-0 sm:grid sm:grid-cols-4 sm:gap-8">
                                    <div className="max-w-sm pt-0 pb-6 sm:pt-0 lg:flex-grow">
                                        <h4 className="text-yellow-700 font-semibold">
                                            {list.label}
                                        </h4>
                                    </div>
                                    <ul className='flex-1 space-y-6 sm:col-span-3 sm:last:pb-6 sm:space-y-8'>
                                        {list.qas.map((item, idx) => (
                                            <li
                                                key={idx}>
                                                <p
                                                    dangerouslySetInnerHTML={{ __html: item.a }}
                                                    className='mt-3 text-gray-800 leading-relaxed'>
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

