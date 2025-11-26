import { useState } from 'react';

export default ({ isOpen, setIsOpen }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = () => {
        console.log('Inscription:', { name, email });
        // Ici tu ajouteras la logique Supabase
        setIsOpen(false);
        setEmail('');
        setName('');
    };

    return (
        <>
            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Overlay */}
                    <div
                        className="absolute inset-0 backdrop-blur-md bg-black/40"
                        onClick={() => setIsOpen(false)}
                    ></div>

                    {/* Contenu de la modal */}
                    <div className="relative z-10 w-full max-w-2xl">
                        <div className="relative overflow-hidden rounded-2xl bg-blue-600 px-6 py-12 md:px-10">
                            {/* Bouton fermer */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 z-10 text-white hover:text-gray-200 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <div className="relative z-10 max-w-xl mx-auto text-center">
                                <div className="space-y-3">
                                    <h3 className="text-3xl text-white font-bold">
                                        Abonnez-vous à notre newsletter
                                    </h3>
                                    <p className="text-blue-100 leading-relaxed">
                                        Restez informé des actualités, résultats et statistiques du football béninois. Inscrivez-vous dès maintenant !
                                    </p>
                                </div>

                                <div className="mt-8">
                                    <div className="space-y-4">
                                        {/* Input Nom */}
                                        <div className="bg-white rounded-lg p-1">
                                            <input
                                                type="text"
                                                placeholder="Votre nom"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="text-gray-700 w-full p-3 outline-none rounded-lg"
                                            />
                                        </div>

                                        {/* Input Email avec bouton */}
                                        <div className="flex items-center bg-white rounded-lg p-1 gap-2">
                                            <input
                                                type="email"
                                                placeholder="Votre email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="text-gray-700 w-full p-3 outline-none"
                                            />
                                            <button
                                                onClick={handleSubmit}
                                                className="p-3 px-6 rounded-lg font-medium text-white bg-yellow-700 hover:bg-yellow-900 active:bg-yellow-700 duration-150 outline-none shadow-md focus:shadow-none whitespace-nowrap"
                                            >
                                                S'abonner
                                            </button>
                                        </div>
                                    </div>

                                    <p className="mt-4 text-sm text-blue-100">
                                        Aucun spam, jamais. Nous respectons la protection de vos données.
                                        <br />
                                        Consultez notre{' '}
                                        <a className="underline hover:text-white transition-colors" href="#">
                                            Politique de confidentialité
                                        </a>
                                    </p>
                                </div>
                            </div>

                            {/* Gradient de fond */}
                            <div
                                className="absolute inset-0 w-full h-full pointer-events-none"
                                style={{
                                    background: "linear-gradient(268.24deg, rgba(161, 98, 7, 0.82) 50%, rgba(153, 27, 27, 0.55) 80.61%, rgba(5, 46, 22, 0) 117.35%)"




                                }}
                            ></div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}