import "./App.css";
import React, { useEffect, useState } from "react";
// import axios from "axios";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login/Login";
import BaseLayout from "./Layout/BaseLayout";
import { useDispatch } from "react-redux";
import { fetchUser } from "./store/user/ThunkFunctions/fetchUser";
import ProtectedRoute from "./Components/ProtectedRoute";
import DayWiseExpense from "./Pages/DayWiseExpense/DayWiseExpense";
import AddOrUpdateExpense from "./Pages/AddExpense/AddOrUpdateExpense";
import Categories from "./Pages/Category/Categories";
import YearWiseExpense from "./Pages/YearWiseExpense/YearWiseExpense";
import MonthWiseExpense from "./Pages/MonthWiseExpense.jsx/MonthWiseExpense";
import Visulization from "./Pages/Visulization/Visulization";

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
						<Route path="/addExpense" element={<AddOrUpdateExpense />} />
						<Route
							path="/updateExpense/:id"
							element={<AddOrUpdateExpense />}
						/>
						<Route path={`/visulization`} element={<Visulization />} />
						<Route path={`/year`} element={<YearWiseExpense />} />
						<Route path={`/year/:year`} element={<MonthWiseExpense />} />
						<Route
							path={`/year/:year/:month`}
							element={<DayWiseExpense />}
						/>
						<Route path="/categories" element={<Categories />} />
					</Route>
				</Route>
				<Route path="/login" element={<Login />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
