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
        <footer className="pt-4">
            <div className="max-w-screen-lg mx-auto px-4 md:px-8 text-yellow-700">
                <div className="mt-10 py-10 border-t items-center justify-between sm:flex">
                    <p>© 2025 Soccer Bénin. All rights reserved.</p>
                    <ul className="flex flex-wrap items-center gap-4 mt-6 sm:text-sm sm:mt-0">
                        {
                            footerNavs.map((item, idx) => (
                                <li key={idx} className="hover:text-yellow-400 duration-150">
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