import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMonthWiseExpenseViz } from "../../store/expense/ThunkFunctions/getMonthWiseExpensesViz";
import BarOrAreaChart from "../BarOrAreaChart/BarOrAreaChart";
import DonutChart from "../DonutChart/DonutChart";

const MonthWiseExpenseViz = ({
	vizCategories,
	fixedDays,
	yearWiseExpenses,
}) => {
	const dispatch = useDispatch();

	const {
		monthWiseExpensesViz,
		gettingMonthWiseExpensesViz,
		monthWiseExpensesVizError,
	} = useSelector((state) => state.expense);

	const { user } = useSelector((state) => state.user);

	const [monthWiseExpenseYear, setMonthWiseExpenseYear] = useState("All");
	const [monthWiseExpenseDay, setMonthWiseExpenseDay] = useState("All");
	const [monthWiseExpenseCategory, setMonthWiseExpenseCategory] =
		useState("All");

	const [chartType, setChartType] = useState("bar");

	const handleMonthWiseExpenseYearChange = (e) => {
		setMonthWiseExpenseYear(e.target.value);
		dispatch(
			getMonthWiseExpenseViz([
				e.target.value,
				monthWiseExpenseDay,
				monthWiseExpenseCategory,
			])
		);
	};

	const handleMonthWiseExpenseDayChange = (e) => {
		setMonthWiseExpenseDay(e.target.value);
		dispatch(
			getMonthWiseExpenseViz([
				monthWiseExpenseYear,
				e.target.value,
				monthWiseExpenseCategory,
			])
		);
	};

	useEffect(() => {
		if (user)
			dispatch(
				getMonthWiseExpenseViz([
					monthWiseExpenseYear,
					monthWiseExpenseDay,
					monthWiseExpenseCategory,
				])
			);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	const handleMonthWiseExpenseCategoryChange = (e) => {
		setMonthWiseExpenseCategory(e.target.value);
		dispatch(
			getMonthWiseExpenseViz([
				monthWiseExpenseYear,
				monthWiseExpenseDay,
				e.target.value,
			])
		);
	};

	const handleChartTypeChange = (e) => {
		setChartType(e.target.value);
	};

	return (
		<div>
			<select
				value={monthWiseExpenseYear}
				onChange={handleMonthWiseExpenseYearChange}
			>
				<option value="All">All</option>
				{Object.keys(yearWiseExpenses)
					?.sort((a, b) => b - a)
					.map((year) => (
						<option key={year} value={year}>
							{year}
						</option>
					))}
			</select>
			<select
				value={monthWiseExpenseDay}
				onChange={handleMonthWiseExpenseDayChange}
			>
				<option value="All">All</option>
				{fixedDays.map((day) => {
					return (
						<option key={day} value={day}>
							{day}
						</option>
					);
				})}
			</select>
			<select
				value={monthWiseExpenseCategory}
				onChange={handleMonthWiseExpenseCategoryChange}
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
			<select value={chartType} onChange={handleChartTypeChange}>
				<option value="bar">Bar</option>
				<option value="donut">Donut</option>
			</select>
			{gettingMonthWiseExpensesViz ? (
				<div>Month Loading...</div>
			) : monthWiseExpensesVizError ? (
				<div>{monthWiseExpensesVizError}</div>
			) : (
				monthWiseExpensesViz &&
				(chartType === "donut" ? (
					<DonutChart data={monthWiseExpensesViz} name="month" />
				) : (
					<BarOrAreaChart data={monthWiseExpensesViz} name="month" />
				))
			)}
		</div>
	);
};

export default MonthWiseExpenseViz;
