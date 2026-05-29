import { useEffect, useState } from 'react';
import * as Select from '@radix-ui/react-select';
import TeamForm from '../assets/TeamForm';

function SelectItem({ value, children }) {
    return (
        <Select.Item
            value={value}
            className="px-3 py-2 cursor-pointer hover:bg-yellow-50 hover:text-yellow-600 outline-none rounded"
        >
            <Select.ItemText>{children}</Select.ItemText>
        </Select.Item>
    );
}

export default function FormStats({ showPhaseFilter = true, supabaseQuery }) {
    const [selectedPhase, setSelectedPhase] = useState('aller');
    const [teams, setTeams] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchStanding = async () => {
            if (supabaseQuery) {
                const data = await supabaseQuery(selectedPhase)
                console.log(data)
                setTeams(data || [])
            }
            setLoading(false)
        }
        fetchStanding()
    }, [supabaseQuery, selectedPhase])

    return (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <div className="max-w-lg">
                <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                    Forme des équipes
                </h3>
                <p className="text-gray-600 mt-2">
                    La forme de chaque équipe est représentée par une série de cercles colorés, indiquant les résultats de leurs derniers matchs.
                </p>
            </div>

            {/* Filtre Phase */}
            {showPhaseFilter && (
                <div className="flex items-center gap-2 mt-6">
                    <Select.Root value={selectedPhase} onValueChange={setSelectedPhase}>
                        <Select.Trigger className="w-48 inline-flex items-center justify-between px-3 py-2 text-sm text-yellow-600 bg-white border border-gray-300 rounded-lg shadow-sm outline-none focus:ring-offset-2 focus:ring-yellow-600 focus:ring-2">
                            <Select.Value placeholder="Choisir une phase" />
                            <Select.Icon className="text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                </svg>
                            </Select.Icon>
                        </Select.Trigger>
                        <Select.Portal>
                            <Select.Content position="popper" side="bottom" align="start" sideOffset={5}
                                className="w-[var(--radix-select-trigger-width)] overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg text-sm z-50">
                                <Select.Viewport>
                                    <SelectItem value="aller">ALLER</SelectItem>
                                    <SelectItem value="retour">RETOUR</SelectItem>
                                </Select.Viewport>
                            </Select.Content>
                        </Select.Portal>
                    </Select.Root>
                </div>
            )}

            <div className="mt-6 rounded-lg overflow-x-auto">
                <table className="w-full table-auto text-sm text-left">
                    <thead className="bg-gray-50 font-medium border-b border-gray-300">
                        <tr className="">
                            <th className="py-3 px-6 sticky left-0 bg-gray-50 z-10"></th>
                            <th className="py-3 px-6">Forme récente &nbsp;
                                <span className="text-green-500">G.</span>{' '}
                                <span className="text-gray-400">N.</span>{' '}
                                <span className="text-red-500">P.</span>
                                <span className="text-gray-400 text-xs sm:pl-2 block sm:inline">(← plus ancien · plus récent →)</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300">
                        {teams.map((item, idx) => (
                            <tr key={idx} className="">
                                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-x-7 sticky left-0 bg-white z-10">
                                    <span className="text-gray-400 w-4">{idx + 1}</span>
                                    {item.equipe}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <TeamForm form={item.forme_recente} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}