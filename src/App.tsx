import Ex01 from "./components/Ex01";

export default function App() {
    return (
        <div className="h-screen flex flex-col">
            <div className="bg-blue-600 dark:bg-slate-800 h-16 flex-none"></div>
            <div className="bg-yellow-200 dark:bg-slate-600 flex-grow">
                <Ex01 />
            </div>
        </div>
    );
}
