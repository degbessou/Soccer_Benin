
const TitleBis = ({ title = "Lorem ipsum dolor sit amet", description }) => {

    return (
        <div className="md:block text-center px-4 space-y-3 mt-6 sm:px-0 md:mt-0 md:py-4 lg:text-center lg:max-w-screen-lg lg:mx-auto">
            <p className="text-gray-800 text-2xl font-extrabold sm:text-3xl">
                {title}
            </p>
            <p className="mt-3 mx-4 text-gray-600 lg:mx-8">
                {description}
            </p>
        </div>
    );
}

export default TitleBis;