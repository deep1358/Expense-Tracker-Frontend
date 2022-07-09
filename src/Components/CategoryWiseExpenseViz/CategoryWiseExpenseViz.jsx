import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryWiseExpenseViz } from "../../store/expense/ThunkFunctions/getCategoryWiseExpenseViz";
import BarOrAreaChart from "../BarOrAreaChart/BarOrAreaChart";
import DonutChart from "../DonutChart/DonutChart";

const CategoryWiseExpenseViz = ({
	months,
	yearWiseExpenses,
	fixedDays,
	_30DaysMonths,
	_31DaysMonths,
}) => {
	const dispatch = useDispatch();

	const {
		categoryWiseExpensesViz,
		gettingCategoryWiseExpensesViz,
		categoryWiseExpensesVizError,
	} = useSelector((state) => state.expense);

	const { user } = useSelector((state) => state.user);

	const [categoryWiseDays, setCategoryWiseDays] = useState([]);
	const [categoryWiseMonths, setCategoryWiseMonths] = useState(months);
	const [categoryWiseYears, setCategoryWiseYears] = useState([]);

	const [categoryWiseExpenseYear, setCategoryWiseExpenseYear] =
		useState("All");
	const [categoryWiseExpenseMonth, setCategoryWiseExpenseMonth] =
		useState("All");
	const [categoryWiseExpenseDay, setCategoryWiseExpenseDay] = useState("All");

	const [chartType, setChartType] = useState("bar");

	useEffect(() => {
		if (user) {
			dispatch(
				getCategoryWiseExpenseViz([
					categoryWiseExpenseYear,
					categoryWiseExpenseMonth,
					categoryWiseExpenseDay,
				])
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	useEffect(() => {
		if (
			categoryWiseExpenseYear === "All" &&
			categoryWiseExpenseMonth === "All"
		) {
			setCategoryWiseDays(fixedDays);
		} else if (categoryWiseExpenseMonth !== "All") {
			const tempYear =
				categoryWiseExpenseYear === "All" ? 2020 : +categoryWiseExpenseYear;
			const daysCount = new Date(
				tempYear,
				months.indexOf(categoryWiseExpenseMonth) + 1,
				0
			).getDate();
			setCategoryWiseDays(
				Array.from(Array(daysCount).keys())
					.map((i) => i + 1)
					.map((i) => i.toString())
					.map((i) => (i.length === 1 ? `0${i}` : i))
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [categoryWiseExpenseMonth, categoryWiseExpenseYear]);

	useEffect(() => {
		if (+categoryWiseExpenseDay === 31) {
			setCategoryWiseMonths(_31DaysMonths);
		} else if (+categoryWiseExpenseDay === 30) {
			setCategoryWiseMonths(_30DaysMonths);
		} else if (+categoryWiseExpenseDay === 29) {
			const tempYear = isNaN(+categoryWiseExpenseYear)
				? 2020
				: +categoryWiseExpenseYear;
			if (leapYear(tempYear)) setCategoryWiseMonths(months);
			else setCategoryWiseMonths(_30DaysMonths);
		} else {
			setCategoryWiseMonths(months);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [categoryWiseExpenseDay, categoryWiseExpenseYear]);

	useEffect(() => {
		setCategoryWiseYears(Object.keys(yearWiseExpenses).sort((a, b) => b - a));
		if (
			categoryWiseExpenseDay === "29" &&
			categoryWiseExpenseMonth === "February"
		)
			setCategoryWiseYears(
				categoryWiseYears.filter((year) => leapYear(+year))
			);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		// eslint-disable-next-line react-hooks/exhaustive-deps
		Object.keys(yearWiseExpenses).length,
		categoryWiseExpenseMonth,
		categoryWiseExpenseDay,
	]);

	function leapYear(year) {
		return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
	}

	const handleCategoryWiseExpenseYearChange = (e) => {
		setCategoryWiseExpenseYear(e.target.value);
		dispatch(
			getCategoryWiseExpenseViz([
				e.target.value,
				months.indexOf(categoryWiseExpenseMonth) === -1
					? "All"
					: months.indexOf(categoryWiseExpenseMonth) + 1,
				categoryWiseExpenseDay,
			])
		);
	};

	const handleCategoryWiseExpenseMonthChange = (e) => {
		setCategoryWiseExpenseMonth(e.target.value);
		dispatch(
			getCategoryWiseExpenseViz([
				categoryWiseExpenseYear,
				months.indexOf(e.target.value) === -1
					? "All"
					: months.indexOf(e.target.value) + 1,
				categoryWiseExpenseDay,
			])
		);
	};

	const handleCategoryWiseExpenseDayChange = (e) => {
		setCategoryWiseExpenseDay(e.target.value);
		dispatch(
			getCategoryWiseExpenseViz([
				categoryWiseExpenseYear,
				months.indexOf(categoryWiseExpenseMonth) === -1
					? "All"
					: months.indexOf(categoryWiseExpenseMonth) + 1,
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
				value={categoryWiseExpenseYear}
				onChange={handleCategoryWiseExpenseYearChange}
			>
				<option value="All">All</option>
				{categoryWiseYears.map((year) => (
					<option key={year} value={year}>
						{year}
					</option>
				))}
			</select>
			<select
				value={categoryWiseExpenseMonth}
				onChange={handleCategoryWiseExpenseMonthChange}
			>
				<option value="All">All</option>
				{categoryWiseMonths.map((month) => {
					return (
						<option key={month} value={month}>
							{month}
						</option>
					);
				})}
			</select>
			<select
				value={categoryWiseExpenseDay}
				onChange={handleCategoryWiseExpenseDayChange}
			>
				<option value="All">All</option>
				{categoryWiseDays.map((day) => {
					return (
						<option key={day} value={day}>
							{day}
						</option>
					);
				})}
			</select>
			<select value={chartType} onChange={handleChartTypeChange}>
				<option value="bar">Bar</option>
				<option value="donut">Donut</option>
			</select>
			{gettingCategoryWiseExpensesViz ? (
				<div>Category Loading...</div>
			) : categoryWiseExpensesVizError ? (
				<div>{categoryWiseExpensesVizError}</div>
			) : (
				categoryWiseExpensesViz &&
				(chartType === "donut" ? (
					<DonutChart data={categoryWiseExpensesViz} name="category" />
				) : (
					<BarOrAreaChart data={categoryWiseExpensesViz} name="category" />
				))
			)}
		</div>
	);
};

export default CategoryWiseExpenseViz;
