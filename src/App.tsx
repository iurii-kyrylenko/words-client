import AppBar from "./components/AppBar";
import Hurdle from "./components/Hurdle";

export default function App() {
    return (
        <div className="h-screen flex flex-col">
            <AppBar />
            <div className="flex-1 bg-zinc-50 dark:bg-slate-600">
                <Hurdle />
            </div>
        </div>
    );
}
