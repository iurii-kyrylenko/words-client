import AppBar from "./components/AppBar";
import Ex01 from "./components/Ex01";

export default function App() {
    return (
        <div className="h-screen flex flex-col">
            <AppBar />
            <div className="flex-1 bg-zinc-50 dark:bg-slate-600">
                <Ex01 />
            </div>
        </div>
    );
}
