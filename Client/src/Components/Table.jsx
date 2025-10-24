/**
 * Composant Table réutilisable
 * @param {Object} props
 * @param {string} props.title - Titre du tableau
 * @param {string} props.description - Description du tableau (optionnel)
 * @param {Array<Object>} props.rows - Lignes de données avec {category, year, competition, participation, result, detail, record}
 */
const Table = ({ title, description, rows }) => {
    const headers = ['Category', 'Year', 'Competition', 'Participation', 'Result', 'Detail', 'Record'];

    return (
        <section id="table-section" className="scroll-mt-24 py-8">
            <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                <div className="max-w-lg mb-8">
                    <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                        {title}
                    </h3>
                    {description && (
                        <p className="text-gray-600 mt-2">
                            {description}
                        </p>
                    )}
                </div>
                <div className="shadow-sm border rounded-lg overflow-x-auto">
                    <table className="w-full table-auto text-sm text-left">
                        <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                            <tr className="divide-x">
                                {headers.map((header, idx) => (
                                    <th key={idx} className="py-3 px-2">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 divide-y">
                            {rows.map((row, idx) => (
                                <tr key={idx} className="divide-x">
                                    <td className="px-6 py-4 whitespace-nowrap">{row.category}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{row.year}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{row.competition}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{row.participation}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{row.result}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{row.detail}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{row.record}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};
export default Table;

