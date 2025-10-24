import React from 'react';
import * as Tabs from "@radix-ui/react-tabs";

/**
 * Composant de navigation latérale pour articles
 * @param {Array} sections - Liste des sections {id, label}
 * @param {string} selectedSection - ID de la section active
 * @param {Function} onSectionChange - Callback lors du changement de section
 */
const SidebarNav = ({ sections, selectedSection, onSectionChange }) => {
    if (!sections || sections.length === 0) return null;

    return (
        <>
            {/* Navigation latérale (Desktop) */}
            <Tabs.List
                className="hidden lg:block lg:sticky lg:top-24 lg:self-start w-64 flex-shrink-0 border-l"
                aria-label="Navigation de l'article"
            >
                <div >
                    {sections.map((section) => (
                        <Tabs.Trigger
                            key={section.id}
                            className="w-full group outline-none border-l-2 border-white text-gray-500 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 text-left"
                            value={section.id}
                        >
                            <div className="py-2 px-4 rounded-lg duration-150 group-hover:text-indigo-600 group-hover:bg-gray-50 font-medium text-sm">
                                {section.label}
                            </div>
                        </Tabs.Trigger>
                    ))}
                </div>
            </Tabs.List>

            {/* Navigation mobile (Dropdown) */}
            <div className="relative text-gray-500 lg:hidden mb-6">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="pointer-events-none w-5 h-5 absolute right-3 inset-y-0 my-auto"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                    />
                </svg>
                <select
                    value={selectedSection}
                    className="py-2 px-3 pr-10 w-full bg-white appearance-none outline-none border rounded-lg shadow-sm focus:border-indigo-600 text-sm font-medium"
                    onChange={(e) => onSectionChange(e.target.value)}
                >
                    {sections.map((section) => (
                        <option key={section.id} value={section.id}>
                            {section.label}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
};

export default SidebarNav;