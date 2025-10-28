import * as Tabs from "@radix-ui/react-tabs";

const tabItems = [
    "CALENDRIER",
    "CLASSEMENT",
    "STATS"
];

export default () => (
    <Tabs.Root
        className="max-w-screen-lg mx-auto px-4 py-8 md:px-8"
        defaultValue="Overview"
    >
        <Tabs.List
            className="w-full border-b border-t border-gray-300 flex items-center gap-x-3 overflow-x-auto text-sm"
            aria-label="Manage your account"
        >
            {tabItems.map((item, idx) => (
                <Tabs.Trigger
                    key={idx}
                    className="group outline-none text-gray-500 py-1.5 border-b-2 border-white data-[state=active]:border-yellow-600 data-[state=active]:text-yellow-600"
                    value={item}
                >
                    <div className="py-1.5 px-3 rounded-lg duration-150 group-hover:text-yellow-600 group-hover:bg-gray-50 group-active:bg-yellow-100 font-medium">
                        {item}
                    </div>
                </Tabs.Trigger>
            ))}
        </Tabs.List>
    </Tabs.Root>
);
