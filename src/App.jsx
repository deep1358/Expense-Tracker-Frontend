import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login/Login";
import BaseLayout from "./Layout/BaseLayout";
import Home from "./Pages/Home/Home";
import { useDispatch } from "react-redux";
import { fetchUser } from "./store/user/ThunkFunctions/fetchUser";
import ProtectedRoute from "./Components/ProtectedRoute";
import DayWiseExpense from "./Pages/DayWiseExpense/DayWiseExpense";

axios.defaults.withCredentials = true;

function App() {
	const dispatch = useDispatch();

	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const [currentMonth] = useState(new Date().getMonth());
	const [currentYear] = useState(new Date().getFullYear());

	useEffect(() => {
		dispatch(fetchUser());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route element={<ProtectedRoute />}>
					<Route path="/" element={<BaseLayout />}>
						<Route
							path="/"
							element={
								<Navigate
									to={`/year/${currentYear}/${months[currentMonth]}`}
								/>
							}
						/>
						<Route
							path={`/year/:year/:month`}
							element={<DayWiseExpense />}
						/>
					</Route>
				</Route>
				<Route path="/login" element={<Login />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
