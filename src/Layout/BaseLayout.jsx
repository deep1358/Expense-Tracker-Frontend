// import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
// import { useSelector } from "react-redux";

const BaseLayout = () => {
	// const { isLoading, error } = useSelector((state) => state.user);

	// const navigate = useNavigate();
	// console.log(isLoading, error, isLoggedIn);

	// useEffect(() => {
	// 	// console.log(isLoading, error, isLoggedIn);
	// 	if (!isLoggedIn) navigate("/login");
	// }, []);

	return (
		<>
			{/* {isLoading && <div>Loading...</div>}
			{error && (
				<div>
					{error.status} {error.message}
				</div>
			)} */}
			<Navbar />
			<Outlet />
		</>
	);
};

export default BaseLayout;
