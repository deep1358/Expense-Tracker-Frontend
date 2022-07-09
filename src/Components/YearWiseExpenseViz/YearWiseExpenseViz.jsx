import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getYearWiseExpenseViz } from "../../store/expense/ThunkFunctions/getYearWiseExpenseViz";
import BarOrAreaChart from "../BarOrAreaChart/BarOrAreaChart";
import DonutChart from "../DonutChart/DonutChart";

const YearWiseExpenseViz = ({
	months,
	fixedDays,
	_30DaysMonths,
	_31DaysMonths,
	vizCategories,
}) => {
	const dispatch = useDispatch();

	const {
		yearWiseExpensesViz,
		gettingYearWiseExpensesViz,
		yearWiseExpensesVizError,
	} = useSelector((state) => state.expense);

	const { user } = useSelector((state) => state.user);

	const [yearWiseDays, setYearWiseDays] = useState([]);
	const [yearWiseMonths, setYearWiseMonths] = useState(months);

	const [yearWiseExpenseMonth, setYearWiseExpenseMonth] = useState("All");
	const [yearWiseExpenseDay, setYearWiseExpenseDay] = useState("All");
	const [yearWiseExpenseCategory, setYearWiseExpenseCategory] =
		useState("All");

	const [chartType, setChartType] = useState("bar");

	useEffect(() => {
		if (user)
			dispatch(
				getYearWiseExpenseViz([
					yearWiseExpenseMonth,
					yearWiseExpenseDay,
					yearWiseExpenseCategory,
				])
			);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	useEffect(() => {
		if (+yearWiseExpenseDay === 31) {
			setYearWiseMonths(_31DaysMonths);
		} else if (+yearWiseExpenseDay === 30) {
			setYearWiseMonths(_30DaysMonths);
		} else {
			setYearWiseMonths(months);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [yearWiseExpenseDay, months.length]);

	useEffect(() => {
		if (yearWiseExpenseMonth === "All") {
			setYearWiseDays(fixedDays);
		} else {
			const daysCount = new Date(
				2020,
				months.indexOf(yearWiseExpenseMonth) + 1,
				0
			).getDate();
			setYearWiseDays(
				Array.from(Array(daysCount).keys())
					.map((i) => i + 1)
					.map((i) => i.toString())
					.map((i) => (i.length === 1 ? `0${i}` : i))
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [yearWiseExpenseMonth]);

	const handleYearWiseExpenseMonthChange = (e) => {
		setYearWiseExpenseMonth(e.target.value);
		dispatch(
			getYearWiseExpenseViz([
				months.indexOf(e.target.value) === -1
					? "All"
					: months.indexOf(e.target.value) + 1,
				yearWiseExpenseDay,
				yearWiseExpenseCategory,
			])
		);
	};

	const handleYearWiseExpenseDayChange = (e) => {
		setYearWiseExpenseDay(e.target.value);
		dispatch(
			getYearWiseExpenseViz([
				months.indexOf(yearWiseExpenseMonth) === -1
					? "All"
					: months.indexOf(yearWiseExpenseMonth) + 1,
				e.target.value,
				yearWiseExpenseCategory,
			])
		);
	};

	const handleYearWiseExpenseCategoryChange = (e) => {
		setYearWiseExpenseCategory(e.target.value);
		dispatch(
			getYearWiseExpenseViz([
				months.indexOf(yearWiseExpenseMonth) === -1
					? "All"
					: months.indexOf(yearWiseExpenseMonth) + 1,
				yearWiseExpenseDay,
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
				value={yearWiseExpenseMonth}
				onChange={handleYearWiseExpenseMonthChange}
			>
				<option value="All">All</option>
				{yearWiseMonths.map((month) => {
					return (
						<option key={month} value={month}>
							{month}
						</option>
					);
				})}
			</select>
			<select
				value={yearWiseExpenseDay}
				onChange={handleYearWiseExpenseDayChange}
			>
				<option value="All">All</option>
				{yearWiseDays.map((day) => {
					return (
						<option key={day} value={day}>
							{day}
						</option>
					);
				})}
			</select>
			<select
				value={yearWiseExpenseCategory}
				onChange={handleYearWiseExpenseCategoryChange}
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
			{gettingYearWiseExpensesViz ? (
				<div>Year Loading...</div>
			) : yearWiseExpensesVizError ? (
				<div>{yearWiseExpensesVizError}</div>
			) : (
				yearWiseExpensesViz &&
				(chartType === "donut" ? (
					<DonutChart data={yearWiseExpensesViz} name="year" />
				) : (
					<BarOrAreaChart data={yearWiseExpensesViz} name="year" />
				))
			)}
		</div>
	);
};

export default YearWiseExpenseViz;
