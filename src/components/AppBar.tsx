export default function AppBar() {
    return (
        <nav className="relative flex gap-4 flex-wrap items-center px-4 py-2 lg:py-4 shadow-md bg-zinc-50 dark:bg-neutral-700 dark:text-white">
            <div className="flex-0">
                <div className="flex items-center">
                    <img
                        className="mr-2 h-10"
                        src="https://cdn-icons-png.flaticon.com/512/8541/8541712.png"
                        alt="Words Logo"
                        loading="lazy" />
                    <span className="font-semibold">Words</span>
                </div>
            </div>
            <div className="flex-1 hover:underline">Hurdle</div>
            <div className="flex-0 hover:underline">Example</div>
        </nav>
    );
}
