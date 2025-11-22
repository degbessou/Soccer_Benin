
import React, { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import HeroStatiq from '../Components/HeroStatiq';
import { getSupabaseImageUrl } from "../assets/Helpers"
import emailjs from "@emailjs/browser";
import Alert from '../assets/Alert';

export default function Contact() {
    const [alert, setAlert] = useState({ show: false, message: "", type: "" });
    const [errors, setErrors] = useState({
        user_name: false,
        user_email: false,
        message: false
    });
    const contactMethods = [
        {
            icon:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-yellow-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
            ,
            contact: "support@bencofoot.com"
        },
        {
            icon:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-yellow-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
            ,
            contact: "+1 (555) 000-000"
        },
        {
            icon:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-yellow-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
            ,
            contact: "Quebec City, Quebec, Canada"
        },
    ]


    useEffect(() => {
        let timer;
        if (alert.show) {
            timer = setTimeout(() => {
                setAlert({ show: false, message: "", type: "" });
            }, 5000);
        }
        return () => clearTimeout(timer); // Nettoyage du timeout si le composant est démonté
    }, [alert.show]);

    // Fonction de validation personnalisée
    const validateForm = (formData) => {
        const newErrors = {
            user_name: false,
            user_email: false,
            message: false
        };
        const errorMessages = [];

        // Validation du nom (requis)
        if (!formData.user_name || formData.user_name.trim() === '') {
            newErrors.user_name = true;
            errorMessages.push('Le nom est requis');
        }

        // Validation de l'email (requis et format)
        if (!formData.user_email || formData.user_email.trim() === '') {
            newErrors.user_email = true;
            errorMessages.push('L\'email est requis');
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.user_email)) {
                newErrors.user_email = true;
                errorMessages.push('Format d\'email invalide');
            }
        }

        // Validation du message (requis et longueur minimale)
        if (!formData.message || formData.message.trim() === '') {
            newErrors.message = true;
            errorMessages.push('Le message est requis');
        } else if (formData.message.trim().length < 10) {
            newErrors.message = true;
            errorMessages.push('Le message doit contenir au moins 10 caractères');
        }

        setErrors(newErrors);
        return errorMessages;
    };

    const sendEmail = (e) => {
        e.preventDefault();

        // Récupération des données du formulaire
        const formData = {
            user_name: e.target.user_name.value,
            user_email: e.target.user_email.value,
            message: e.target.message.value
        };

        // Validation du formulaire
        const errors = validateForm(formData);

        if (errors.length > 0) {
            // Affichage de l'alerte de validation
            setAlert({
                show: true,
                message: errors.join(', '),
                type: 'warning'
            });

            return; // Arrêter l'exécution si il y a des erreurs
        }

        emailjs.sendForm(import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_TEMPLATE_ID, e.target, import.meta.env.VITE_PUBLIC_KEY)
            .then((result) => {
                setAlert({ show: true, message: "Votre message a été envoyé avec succès", type: "success" });
                //setTimeout(() => ({ show: false, message: "", type: "" }), 1000);
            }
                , (error) => {
                    setAlert({ show: true, message: "Une erreur s'est produite. Veuillez réessayer.", type: "error" });
                    //setTimeout(() => ({ show: false, message: "", type: "" }), 5000);
                });
        e.target.reset();
    }

    return (
        <>
            <Navbar />
            <HeroStatiq src={getSupabaseImageUrl('medias/mnt/nt_fan_benin.jpg')} alt="équipe de damissa fc" />
            <main className="py-14">
                {/* Composant d'alerte */}
                <Alert alert={alert} setAlert={setAlert} />
                <div className="max-w-screen-lg mx-auto px-4 text-gray-600 md:px-8">
                    <div className="max-w-lg mx-auto gap-12 justify-between lg:flex lg:max-w-none">
                        <div className="max-w-lg space-y-3">
                            <h3 className="text-yellow-700 font-semibold">
                                Contact
                            </h3>
                            <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                                Dites-nous comment nous pouvons vous aider
                            </p>
                            <p>
                                Nous sommes là pour vous aider et répondre à toutes vos questions. Nous attendons votre message avec impatience ! Veuillez remplir le formulaire ou utiliser les coordonnées ci-dessous.                            </p>
                            <div>
                                <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-6 items-center">
                                    {
                                        contactMethods.map((item, idx) => (
                                            <li key={idx} className="flex items-center gap-x-3">
                                                <div className="flex-none text-gray-400">
                                                    {item.icon}
                                                </div>
                                                <p>{item.contact}</p>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="flex-1 mt-12 sm:max-w-lg lg:max-w-md">
                            <form
                                className="contact_form space-y-5" onSubmit={sendEmail} noValidate
                            >
                                <div>
                                    <label className="font-medium text-yellow-700">
                                        Nom complet
                                    </label>
                                    <input
                                        type="text"
                                        name="user_name"
                                        required
                                        className={`input w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-yellow-600 shadow-sm rounded-lg ${errors.user_name ? 'input-error' : ''}`} placeholder="Nom"
                                    />
                                </div>
                                <div>
                                    <label className="font-medium text-yellow-700">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="user_email"
                                        required
                                        className={`input w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-yellow-600 shadow-sm rounded-lg ${errors.user_email ? 'input-error' : ''}`} placeholder="Email"
                                    />
                                </div>
                                <div>
                                    <label className="font-medium text-yellow-700">
                                        Message
                                    </label>
                                    <textarea name="message" required className={`textarea w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-yellow-600 shadow-sm rounded-lg ${errors.message ? 'textarea-error' : ''}`} placeholder="Message"></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 text-white font-medium bg-yellow-600 hover:bg-red-600 active:bg-green-600 rounded-lg duration-150"
                                >
                                    Envoyez
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )

}
