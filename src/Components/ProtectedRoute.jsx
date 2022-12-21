import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
    const { loggedIn } = useSelector((state) => state.user);

    // Fetch url params and check if user is logged in or not and append the redirect url to the login page
    const { pathname } = useLocation();
    if (!loggedIn)
        return (
            <Navigate
                to={`/login?redirect_url=${encodeURIComponent(pathname)}`}
                replace
            />
        );
    return <Outlet />;
};

export default ProtectedRoute;
