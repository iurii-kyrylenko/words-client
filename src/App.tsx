import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import store from "./store";

const App = () => (
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);

export default App;
