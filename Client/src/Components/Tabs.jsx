import * as Tabs from "@radix-ui/react-tabs";

export default ({ defaultTab = "calendrier", children }) => (
    <div className="max-w-screen-lg mx-auto px-4 md:px-8">
        <Tabs.Root defaultValue={defaultTab}>
            {children}
        </Tabs.Root>
    </div>
);

export const TabsList = ({ items }) => (
    <Tabs.List
        className="w-full border-b border-t border-gray-300 flex items-center gap-x-3 overflow-x-auto text-sm mb-8"
        aria-label="Navigation"
    >
        {items.map((item, idx) => (
            <Tabs.Trigger
                key={idx}
                className="group outline-none py-1.5 border-b-2 border-white data-[state=active]:border-yellow-600 data-[state=active]:text-yellow-600"
                value={item.value}
            >
                <div className="py-1.5 px-3 rounded-lg duration-150 group-hover:text-yellow-600 group-hover:bg-gray-50 group-active:bg-yellow-100 font-medium">
                    {item.label}
                </div>
            </Tabs.Trigger>
        ))}
    </Tabs.List>
);

export const TabContent = Tabs.Content;