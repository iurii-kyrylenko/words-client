import { Outlet } from "react-router-dom";
import AppBar from "../components/AppBar";

const Layout = () => {
    return (   
        <div className="h-screen flex flex-col">
            <AppBar />
            <div className="flex-1 bg-zinc-50 dark:bg-slate-700">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
