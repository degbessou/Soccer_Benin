

/**
 * Composant Table réutilisable
 * @param {Object} props
 * @param {string} props.title - Titre du tableau
 * @param {string} props.description - Description du tableau (optionnel)
 * @param {Array<Object>} props.rows - Lignes de données avec {category, year, competition, participation, result, detail, record}
 */
const Table = ({ title, description, rows }) => {
    const headers = ['Année', 'Compétition', 'Résultat', 'Participation', 'Détails', 'Record (V-N-D)'];

    return (
        <div className="max-w-screen-xl mx-auto px-4 py-10 md:px-8">
            <div className="max-w-lg">
                <h3 className="text-red-800 text-xl font-bold sm:text-3xl">
                    {title}
                </h3>
                {description && (
                    <p className="mt-2">
                        {description}
                    </p>
                )}
            </div>
            <div className="mt-8 shadow-sm border border-gray-200 rounded-lg overflow-x-auto">
                <table className="w-full table-auto text-sm text-left">
                    <thead className="bg-gray-50 font-medium border-b border-gray-200">
                        <tr className="divide-x divide-gray-200">
                            {headers.map((header, idx) => (
                                <th key={idx} className="py-3 px-2 text-center whitespace-nowrap">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 divide-y divide-gray-200">
                        {rows.map((row, idx) => (
                            <tr key={idx} className="divide-x divide-gray-200 hover:bg-green-50">
                                <td className="px-4 py-2">{row.year}</td>
                                <td className="px-2 py-2">{row.competition}</td>
                                <td className="px-2 py-2">{row.result}</td>
                                <td className="px-2 py-2">{row.participation}</td>
                                <td className="px-2 py-2">{row.detail}</td>
                                <td className="px-2 py-2">{row.record}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;