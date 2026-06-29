export default () => {

    const footerNavs = [
        {
            href: '/credits',
            name: 'Crédits'
        },
        {
            href: '/contact',
            name: 'Contact'
        },
        {
            href: '/carrieres',
            name: 'Carrière'
        },
        {
            href: '/a-propos',
            name: 'À propos'
        }
    ]
    return (
        <footer className="">
            <div className="max-w-screen-lg mx-auto px-4 md:px-8 text-yellow-700">
                <div className="mt-6 py-8 border-t items-center justify-between sm:flex">
                    <p >
                        © {new Date().getFullYear()} BencoFoot.
                        <span className="hidden md:inline"> • All rights reserved. </span>
                        {/*
                        <span className="ml-1 px-2 py-0.5 text-[10px] bg-yellow-700 text-white rounded align-top -translate-y-1">
                            v3.0.0
                        </span>
*/}
                    </p>
                    <ul className="flex flex-wrap items-center gap-4 mt-2 sm:mt-0">
                        {
                            footerNavs.map((item, idx) => (
                                <li key={idx} className="hover:font-semibold duration-150">
                                    <a href={item.href}>
                                        {item.name}
                                    </a>
                                </li>
                            ))
                        }
                        <li className="hover:font-semibold duration-150">
                            <a
                                href="https://www.facebook.com/benco.football"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="BencoFoot sur Facebook"
                                className="flex items-center gap-1"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}
