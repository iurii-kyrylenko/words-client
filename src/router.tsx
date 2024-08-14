import { Route, createRoutesFromElements, createBrowserRouter } from "react-router-dom";
import ErrorBoundary from "./pages/ErrorBoundary";
import Layout from "./pages/Layout";
import Helper from "./pages/Helper";
import Settings from "./pages/Settings";

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" Component={Layout} ErrorBoundary={ErrorBoundary}>
        <Route index Component={Helper} />
        <Route path="settings" Component={Settings} />
    </Route>
));

export default router;
