
export default ({ src = "https://unsplash.com/fr/photos/court-de-tennis-vert-et-blanc-W9Bxj8bmu7k", alt = "Image par défaut" }) => {
    return (
        <section className="pt-8 pb-8">
            <div className="max-w-screen-lg mx-auto md:px-8">
                <div className="items-center gap-x-12 sm:px-4 md:px-0 lg:flex">
                    <div className="relative w-full h-38 overflow-hidden">
                        <img
                            src={src}
                            alt={alt}
                            className="absolute inset-0 w-full h-full object-cover rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}