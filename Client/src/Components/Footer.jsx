export default () => {

    const footerNavs = [
        {
            href: '/Credits',
            name: 'Crédits'
        },
        {
            href: '/Contact',
            name: 'Contact'
        },
        {
            href: '/Careers',
            name: 'Carrière'
        },
        {
            href: '/About',
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
                        <span className="ml-1 px-2 py-0.5 text-[10px] bg-yellow-700 text-white rounded align-top -translate-y-1">
                            v2.2.1
                        </span>
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
                    </ul>
                </div>
            </div>
        </footer>
    )
}