export default () => {

    const footerNavs = [
        {
            href: 'javascript:void()',
            name: 'Crédits'
        },
        {
            href: 'javascript:void()',
            name: 'Contact'
        },
        {
            href: 'javascript:void()',
            name: 'Carrière'
        },
        {
            href: 'javascript:void()',
            name: 'À propos'
        }
    ]
    return (
        <footer className="pt-10">
            <div className="max-w-screen-lg mx-auto px-4 md:px-8 text-yellow-700">
                <div className="mt-10 py-10 border-t items-center justify-between sm:flex">
                    <p>© 2025 Soccer Bénin. All rights reserved.</p>
                    <ul className="flex flex-wrap items-center gap-4 mt-6 sm:text-sm sm:mt-0">
                        {
                            footerNavs.map((item, idx) => (
                                <li className="hover:text-gray-500 duration-150">
                                    <a key={idx} href={item.href}>
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