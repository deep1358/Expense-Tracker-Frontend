// import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
// import interceptor from "../axios";
// import store from "../store";

const ProtectedRoute = () => {
	const { isLoggedIn } = useSelector((state) => state.user);

	// interceptor(store);
	// useEffect(() => {
	// 	interceptor(store);
	// }, []);
	// console.log(isLoggedIn);
	if (!isLoggedIn) return <Navigate to="/login" replace />;
	return <Outlet />;
};

export default ProtectedRoute;
