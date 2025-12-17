
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import HeroStatiq from "../Components/HeroStatiq";
import { getSupabaseImageUrl } from "../assets/Helpers"



export default function Privacy() {
    const features = [
        {
            title: "1. Collecte des données",
            desc: "Dans le cadre de l’abonnement à notre newsletter, nous collectons uniquement l’adresse e-mail fournie volontairement par l’utilisateur via le formulaire d’inscription présent sur le site. Aucune autre donnée personnelle n’est collectée sans votre consentement explicite."
        }, {
            title: "2. Utilisation des adresses e-mail",
            desc: "Les adresses e-mail collectées sont utilisées exclusivement pour : l’envoi de notre newsletter ; le partage d’actualités, contenus ou informations en lien avec nos activités ; la communication ponctuelle d’informations importantes concernant le site ou nos services. Les e-mails ne sont jamais utilisés à des fins commerciales non prévues, ni cédés, loués ou vendus à des tiers."
        }, {
            title: "3. Stockage et sécurité des données",
            desc: "Les adresses e-mail sont stockées de manière sécurisée. Nous mettons en œuvre des mesures techniques et organisationnelles raisonnables afin de protéger les données contre tout accès non autorisé, perte, altération ou divulgation."
        }, {
            title: "4. Durée de conservation",
            desc: "Les adresses e-mail sont conservées uniquement pendant la durée nécessaire à l’envoi de la newsletter. Elles sont supprimées dès que l’utilisateur se désabonne."
        }, {
            title: "5. Désabonnement",
            desc: "Chaque e-mail envoyé contient un lien de désinscription permettant de se désabonner à tout moment, simplement et gratuitement. Le désabonnement entraîne la suppression automatique de l’adresse e-mail de notre liste de diffusion."
        }, {
            title: "6. Droits des utilisateurs",
            desc: "Conformément aux réglementations en vigueur (RGPD), vous disposez des droits suivants concernant vos données personnelles : droit d’accès; droit de rectification; droit de suppression; droit d’opposition. Toute demande relative à l’exercice de ces droits peut être adressée via notre formulaire de contact ou par e-mail."
        }, {
            title: "7. Modifications de la politique",
            desc: "Nous nous réservons le droit de modifier la présente politique de confidentialité à tout moment. Toute modification sera publiée sur cette page et prendra effet immédiatement."
        }, {
            title: "8. Contact",
            desc: "Pour toute question concernant cette politique de confidentialité ou l’utilisation de votre adresse e-mail, vous pouvez nous contacter via le site."
        }
    ];

    return (
        <>
            <Navbar />
            <HeroStatiq src={getSupabaseImageUrl('medias/banner/damissa_un.jpg')} alt="équipe de damissa fc" />
            <section className="py-14">
                <div className="max-w-screen-lg mx-auto px-4 text-center md:px-8">
                    <div className="max-w-2xl mx-auto">
                        <h3 className="text-gray-800 text-3xl font-semibold underline underline-offset-3 sm:text-4xl">
                            Politique de confidentialité
                        </h3>
                    </div>
                    <div className="mt-12">
                        <ul className="gap-y-8 gap-x-12">
                            {
                                features.map((item, idx) => (
                                    <li key={idx} className="space-y-3">
                                        <div className="mx-auto my-4 py-2 bg-green-50 text-green-900 rounded-full flex items-center justify-center">
                                            {item.title}
                                        </div>
                                        <div className="space-y-3">
                                            <p>{item.desc}</p>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}