import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import { useSelector } from "react-redux";

const BaseLayout = () => {
	const { isLoading, error } = useSelector((state) => state.user);

	return (
		<>
			{isLoading && <div>Loading...</div>}
			{error && (
				<div>
					{error.status} {error.message}
				</div>
			)}
			<Navbar />
			<Outlet />
		</>
	);
};

export default BaseLayout;
