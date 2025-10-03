
const Title = ({ title = "Lorem ipsum dolor sit amet",
    description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
}) => {

    return (
        <div className="md:block text-center px-4 space-y-3 mt-6 sm:px-0 lg:text-justify md:mt-0 md:py-4 lg:max-w-2xl">
            <p className="text-gray-800 text-2xl font-extrabold sm:text-3xl">
                {title}
            </p>
            <p className="mt-3 mx-4 text-gray-600 lg:mx-0">
                {description}
            </p>
        </div>
    );
}

export default Title;