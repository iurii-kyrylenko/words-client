import { useRouteError } from "react-router-dom";

interface RouterError {
    status: number;
    statusText: string;
    error: Error;
}

const ErrorBoundary = () =>  {
    const error = useRouteError() as RouterError;

    return (
        <div id="error-page" style={{ textAlign: "center" }}>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{`${error.status}: ${error.statusText}`}</i>
            </p>
        </div>
    );
};

export default ErrorBoundary;
