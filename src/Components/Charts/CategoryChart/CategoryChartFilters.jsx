import { Button, Group, Select } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SelectPaymentMode from "../../SelectPaymentMode/SelectPaymentMode";
import { useStyles } from "../Charts.style";

const CategoryChartFilters = ({
	day,
	month,
	year,
	payment_mode,
	chartType,
	handleAppliedFilters,
}) => {
	const { months, fixedDays, _30DaysMonths, _31DaysMonths } = useSelector(
		(state) => state.utils
	);

	const { yearWiseExpense, currentYear } = useSelector(
		(state) => state.expense
	);

	const [categoryWiseDays, setCategoryWiseDays] = useState([]);
	const [categoryWiseMonths, setCategoryWiseMonths] = useState(months);
	const [categoryWiseYears, setCategoryWiseYears] = useState([]);

	const { classes } = useStyles();

	useEffect(() => {
		if (year === "All" && month === "All") setCategoryWiseDays(fixedDays);
		else if (month !== "All") {
			const tempYear = year === "All" ? 2020 : +year;
			const daysCount = new Date(
				tempYear,
				months.indexOf(month) + 1,
				0
			).getDate();
			setCategoryWiseDays(
				Array.from(Array(daysCount).keys())
					.map((i) => i + 1)
					.map((i) => i.toString())
					.map((i) => (i.length === 1 ? `0${i}` : i))
			);
		}
	}, [month, year]);

	useEffect(() => {
		if (+day === 31) setCategoryWiseMonths(_31DaysMonths);
		else if (+day === 30) setCategoryWiseMonths(_30DaysMonths);
		else if (+day === 29) {
			const tempYear = isNaN(+year) ? 2020 : +year;
			if (leapYear(tempYear)) setCategoryWiseMonths(months);
			else setCategoryWiseMonths(_30DaysMonths);
		} else setCategoryWiseMonths(months);
	}, [day, year]);

	useEffect(() => {
		setCategoryWiseYears(Object.keys(yearWiseExpense).sort((a, b) => b - a));
		if (day === "29" && month === "February")
			setCategoryWiseYears(
				categoryWiseYears.filter((year) => leapYear(+year))
			);
	}, [Object.keys(yearWiseExpense).length, month, day]);

	const smallerScreen = useMediaQuery("(max-width: 500px)");

	const handleReset = () => {
		if (categoryWiseYears.includes(`${currentYear}`))
			handleAppliedFilters("All", "All", true);
		else handleAppliedFilters("All", "All", true, true);
	};

	useEffect(() => {
		if (categoryWiseYears.length) {
			if (categoryWiseYears.includes(`${currentYear}`))
				handleAppliedFilters("All", "All", true);
			else handleAppliedFilters("All", "All", true, true);
		}
	}, [categoryWiseYears.length]);

	return (
		<Group className={classes.Group}>
			<Select
				data-autofocus
				className={classes.Select}
				size="sm"
				data={["All", ...categoryWiseYears]}
				label="Year"
				value={year}
				onChange={(value) => handleAppliedFilters(value, "year")}
			/>
			<Select
				className={classes.Select}
				size="sm"
				data={["All", ...categoryWiseMonths]}
				label="Month"
				value={month}
				onChange={(value) => handleAppliedFilters(value, "month")}
			/>
			<Select
				className={classes.Select}
				size="sm"
				data={["All", ...categoryWiseDays]}
				label="Day"
				value={day}
				onChange={(value) => handleAppliedFilters(value, "day")}
			/>
			<Select
				size="sm"
				className={classes.Select}
				data={["bar", "donut"]}
				label="Chart Type"
				value={chartType}
				onChange={(value) => handleAppliedFilters(value, "chartType")}
			/>
			<SelectPaymentMode
				payment_mode={payment_mode}
				handleAppliedFilters={handleAppliedFilters}
				placeHolder="Payment Mode"
				width={smallerScreen ? "96%" : "30%"}
			/>
			<Button
				onClick={handleReset}
				className={classes.Resetbutton}
				variant="light"
			>
				Reset
			</Button>
		</Group>
	);
};

export default memo(CategoryChartFilters);
