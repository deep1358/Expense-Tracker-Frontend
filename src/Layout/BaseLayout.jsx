// import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
// import { useSelector } from "react-redux";

const BaseLayout = () => {
	return (
		<>
			<Navbar />
			<Outlet />
		</>
	);
};

export default BaseLayout;
