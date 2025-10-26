import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default () => {
    const [state, setState] = useState(false)
    const [openDropdown, setOpenDropdown] = useState(null)
    const navigate = useNavigate();

    const navigation = [
        {
            title: "Le football béninois",
            path: "/NationalTeam",
            submenu: [
                { title: "Équipe nationale homme", path: "/NationalTeam" },
                { title: "Équipe nationale femme", path: "/national-team/women" },
                { title: "Équipe U20", path: "/national-team/u20" }
            ]
        },
        {
            title: "Championnats",
            path: "/championship",
            submenu: [
                { title: "Histoire", path: "/championship/history" },
                { title: "Ligue 1", path: "/championship/ligue1" },
                { title: "Ligue 2", path: "/championship/ligue2" }
            ]
        },
        { title: "Mercato", path: "/mercato" },
        { title: "Archives", path: "/page404" }
    ]

    useEffect(() => {
        document.onclick = (e) => {
            const target = e.target;
            if (!target.closest(".menu-btn") && !target.closest(".dropdown-item")) {
                setState(false);
                setOpenDropdown(null);
            }
        };
    }, [])

    const toggleDropdown = (idx) => {
        setOpenDropdown(openDropdown === idx ? null : idx);
    }

    const handleNavigation = (path) => {
        navigate(path);
        setState(false);
        setOpenDropdown(null);
    }

    return (
        <nav className={`bg-white pb-5 md:text-sm ${state ? "shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-2 md:mt-0" : ""}`}>
            <div className="gap-x-14 items-center max-w-screen-lg mx-auto px-4 md:flex md:px-8">
                <div className="flex items-center justify-between py-5 md:block">
                    <a href="/" onClick={(e) => { e.preventDefault(); handleNavigation("/"); }}>
                        <img
                            src="https://www.floatui.com/logo.svg"
                            width={120}
                            height={50}
                            alt="Float UI logo"
                        />
                    </a>
                    <div className="md:hidden">
                        <button className="menu-btn text-gray-500 hover:text-gray-800"
                            onClick={() => setState(!state)}
                        >
                            {
                                state ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
                                )
                            }
                        </button>
                    </div>
                </div>
                <div className={`flex-1 items-center mt-8 md:mt-0 md:flex ${state ? 'block' : 'hidden'} `}>
                    <ul className="justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                        {navigation.map((item, idx) => {
                            return (
                                <li key={idx} className="relative dropdown-item z-50">
                                    {item.submenu ? (
                                        <div>
                                            <button
                                                onClick={() => toggleDropdown(idx)}
                                                className="text-gray-700 hover:text-gray-900 flex items-center gap-1"
                                            >
                                                {item.title}
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    className={`w-4 h-4 transition-transform ${openDropdown === idx ? 'rotate-180' : ''}`}
                                                >
                                                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                            {openDropdown === idx && (
                                                <ul className="md:absolute md:top-full md:left-0 md:mt-2 md:bg-white md:shadow-lg md:rounded-lg md:min-w-[220px] md:py-2 md:z-50 mt-2 space-y-2 md:space-y-0 md:border">
                                                    {item.submenu.map((subItem, subIdx) => (
                                                        <li key={subIdx}>
                                                            <a
                                                                href={subItem.path}
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    handleNavigation(subItem.path);
                                                                }}
                                                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 md:rounded"
                                                            >
                                                                {subItem.title}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ) : (
                                        <a
                                            href={item.path}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleNavigation(item.path);
                                            }}
                                            className="block text-gray-700 hover:text-gray-900"
                                        >
                                            {item.title}
                                        </a>
                                    )}
                                </li>
                            )
                        })}
                    </ul>
                    <div className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
                        <a href="javascript:void(0)" className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex">
                            Newsletter
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    )
}