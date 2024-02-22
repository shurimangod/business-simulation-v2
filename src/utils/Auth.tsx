import { useLocation, Navigate } from "react-router-dom";

export const setToken = (token: string): void => {
    localStorage.setItem('temitope', token); // make up your own token
};

export const fetchToken = (): string | null => {
    return localStorage.getItem('temitope');
};

export function RequireToken({ children }: { children: React.ReactNode }): JSX.Element | null {
    let auth = fetchToken();
    let location = useLocation();

    if (!auth) {
        return <Navigate to='/' state={{ from: location }} />;
    }

    return children as JSX.Element;
}
