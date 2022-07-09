import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDayWiseExpenseViz } from "../../store/expense/ThunkFunctions/getDayWiseExpenseViz";
import { getYearWiseExpenses } from "../../store/expense/ThunkFunctions/getYearWiseExpenses";
import BarOrAreaChart from "../BarOrAreaChart/BarOrAreaChart";

const DayWiseExpenseViz = ({ months, yearWiseExpenses, vizCategories }) => {
	const dispatch = useDispatch();

	const {
		dayWiseExpensesViz,
		gettingDayWiseExpensesViz,
		dayWiseExpensesVizError,
		currentMonth,
		currentYear,
	} = useSelector((state) => state.expense);

	const { user } = useSelector((state) => state.user);

	const [dayWiseExpenseYear, setDayWiseExpenseYear] = useState("");
	const [dayWiseExpenseMonth, setDayWiseExpenseMonth] = useState("");
	const [dayWiseExpenseCategory, setDayWiseExpenseCategory] = useState("All");

	useEffect(() => {
		if (user)
			dispatch(
				getDayWiseExpenseViz([
					currentYear,
					currentMonth,
					dayWiseExpenseCategory,
				])
			);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	useEffect(() => {
		if (user) {
			dispatch(getYearWiseExpenses());

			setDayWiseExpenseYear(currentYear);
			setDayWiseExpenseMonth(months[currentMonth - 1]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, Object(yearWiseExpenses).length]);

	const handleDayWiseExpenseYearChange = (e) => {
		setDayWiseExpenseYear(e.target.value);
		dispatch(
			getDayWiseExpenseViz([
				e.target.value,
				months.indexOf(dayWiseExpenseMonth) === -1
					? "All"
					: months.indexOf(dayWiseExpenseMonth) + 1,
				dayWiseExpenseCategory,
			])
		);
	};

	const handleDayWiseExpenseMonthChange = (e) => {
		setDayWiseExpenseMonth(e.target.value);
		dispatch(
			getDayWiseExpenseViz([
				dayWiseExpenseYear,
				months.indexOf(e.target.value) === -1
					? "All"
					: months.indexOf(e.target.value) + 1,
				dayWiseExpenseCategory,
			])
		);
	};

	const handleDayWiseExpenseCategoryChange = (e) => {
		setDayWiseExpenseCategory(e.target.value);
		dispatch(
			getDayWiseExpenseViz([
				dayWiseExpenseYear,
				months.indexOf(dayWiseExpenseMonth) === -1
					? "All"
					: months.indexOf(dayWiseExpenseMonth) + 1,
				e.target.value,
			])
		);
	};

	return (
		<div>
			<select
				value={dayWiseExpenseYear}
				onChange={handleDayWiseExpenseYearChange}
			>
				{Object.keys(yearWiseExpenses)
					?.sort((a, b) => b - a)
					.map((year) => (
						<option key={year} value={year}>
							{year}
						</option>
					))}
			</select>
			<select
				value={dayWiseExpenseMonth}
				onChange={handleDayWiseExpenseMonthChange}
			>
				{months.map((month) => {
					return (
						<option key={month} value={month}>
							{month}
						</option>
					);
				})}
			</select>
			<select
				value={dayWiseExpenseCategory}
				onChange={handleDayWiseExpenseCategoryChange}
			>
				<option value="All">All</option>
				{vizCategories?.map((category) => {
					return (
						<option key={category} value={category}>
							{category}
						</option>
					);
				})}
			</select>
			{gettingDayWiseExpensesViz ? (
				<div>Day Loading...</div>
			) : dayWiseExpensesVizError ? (
				<div>{dayWiseExpensesVizError}</div>
			) : (
				<BarOrAreaChart
					name="day"
					data={dayWiseExpensesViz}
					chartType="area"
				/>
			)}
		</div>
	);
};

export default DayWiseExpenseViz;
