import "./App.css";
import React, { useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import BaseLayout from "./Layout/BaseLayout";
import Home from "./Pages/Home/Home";
import { useDispatch } from "react-redux";
import { fetchUser } from "./store/user/ThunkFunctions/fetchUser";
import ProtectedRoute from "./Components/ProtectedRoute";

axios.defaults.withCredentials = true;

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchUser());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route element={<ProtectedRoute />}>
					<Route path="/" element={<BaseLayout />}>
						<Route index element={<Home />} />
					</Route>
				</Route>
				<Route path="/login" element={<Login />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
