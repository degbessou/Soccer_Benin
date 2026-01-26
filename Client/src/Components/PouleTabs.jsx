// Components/PouleTabs.jsx
import * as Tabs from "@radix-ui/react-tabs";

export default function PouleTabs({ poules, defaultPoule, children }) {
    return (
        <Tabs.Root defaultValue={defaultPoule} className="mb-2">
            <Tabs.List className="flex gap-3 border-b border-gray-300">
                {poules.map(poule => (
                    <Tabs.Trigger
                        key={poule.value}
                        value={poule.value}
                        className="px-4 text-md font-medium border-b-2 border-transparent rounded-lg duration-150 data-[state=active]:border-yellow-600 data-[state=active]:font-bold"
                    >
                        {poule.label}
                    </Tabs.Trigger>
                ))}
            </Tabs.List>

            {children}
        </Tabs.Root>
    );
}

export const PouleContent = Tabs.Content;
