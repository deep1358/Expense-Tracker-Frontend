import { Button, Group, Select } from "@mantine/core";
import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useStyles } from "../Charts.style";

const PaymentModeChartFilters = ({
	day,
	month,
	year,
	category,
	chartType,
	handleAppliedFilters,
}) => {
	const { months, fixedDays, _30DaysMonths, _31DaysMonths } = useSelector(
		(state) => state.utils
	);

	const [paymentModeWiseDays, setPaymentModeWiseDays] = useState([]);
	const [paymentModeWiseMonths, setPaymentModeWiseMonths] = useState(months);
	const [paymentModeWiseYears, setPaymentModeWiseYears] = useState([]);

	const {
		user: { categories },
	} = useSelector((state) => state.user);
	const { yearWiseExpense, currentYear } = useSelector(
		(state) => state.expense
	);

	const { classes } = useStyles({ inline: true });

	useEffect(() => {
		if (year === "All" && month === "All") setPaymentModeWiseDays(fixedDays);
		else if (month !== "All") {
			const tempYear = year === "All" ? 2020 : +year;
			const daysCount = new Date(
				tempYear,
				months.indexOf(month) + 1,
				0
			).getDate();
			setPaymentModeWiseDays(
				Array.from(Array(daysCount).keys())
					.map((i) => i + 1)
					.map((i) => i.toString())
					.map((i) => (i.length === 1 ? `0${i}` : i))
			);
		}
	}, [month, year]);

	useEffect(() => {
		if (+day === 31) setPaymentModeWiseMonths(_31DaysMonths);
		else if (+day === 30) setPaymentModeWiseMonths(_30DaysMonths);
		else if (+day === 29) {
			const tempYear = isNaN(+year) ? 2020 : +year;
			if (leapYear(tempYear)) setPaymentModeWiseMonths(months);
			else setPaymentModeWiseMonths(_30DaysMonths);
		} else setPaymentModeWiseMonths(months);
	}, [day, year]);

	useEffect(() => {
		setPaymentModeWiseYears(
			Object.keys(yearWiseExpense).sort((a, b) => b - a)
		);
		if (day === "29" && month === "February")
			setPaymentModeWiseYears(
				paymentModeWiseYears.filter((year) => leapYear(+year))
			);
	}, [Object.keys(yearWiseExpense).length, month, day]);

	const leapYear = (year) =>
		(year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

	const handleReset = () => {
		if (paymentModeWiseYears.includes(`${currentYear}`))
			handleAppliedFilters("All", "All", true);
		else handleAppliedFilters("All", "All", true, true);
	};

	useEffect(() => {
		if (paymentModeWiseYears.length) {
			if (paymentModeWiseYears.includes(`${currentYear}`))
				handleAppliedFilters("All", "All", true);
			else handleAppliedFilters("All", "All", true, true);
		}
	}, [paymentModeWiseYears.length]);

	return (
		<Group className={classes.Group}>
			<Select
				data-autofocus
				size="sm"
				className={classes.Select}
				data={["All", ...paymentModeWiseYears]}
				label="Year"
				value={year}
				onChange={(value) => handleAppliedFilters(value, "year")}
			/>
			<Select
				size="sm"
				className={classes.Select}
				data={["All", ...paymentModeWiseMonths]}
				label="Month"
				value={month}
				onChange={(value) => handleAppliedFilters(value, "month")}
			/>
			<Select
				size="sm"
				className={classes.Select}
				data={["All", ...paymentModeWiseDays]}
				label="Day"
				value={day}
				onChange={(value) => handleAppliedFilters(value, "day")}
			/>
			<Select
				size="sm"
				className={classes.Select}
				data={["All", ...(categories || [])]}
				label="Category"
				value={category}
				onChange={(value) => handleAppliedFilters(value, "category")}
			/>
			<Select
				size="sm"
				className={classes.Select}
				data={["bar", "donut"]}
				label="Chart Type"
				value={chartType}
				onChange={(value) => handleAppliedFilters(value, "chartType")}
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

export default memo(PaymentModeChartFilters);
