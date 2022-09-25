import { Button, Group, Select } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SelectPaymentMode from "../../SelectPaymentMode/SelectPaymentMode";
import { useStyles } from "../Charts.style";

const YearChartFilters = ({
	month,
	day,
	category,
	payment_mode,
	chartType,
	handleAppliedFilters,
}) => {
	const { months, fixedDays, _30DaysMonths, _31DaysMonths } = useSelector(
		(state) => state.utils
	);

	const {
		user: { categories },
	} = useSelector((state) => state.user);

	const [yearWiseDays, setYearWiseDays] = useState([]);
	const [yearWiseMonths, setYearWiseMonths] = useState(months);

	useEffect(() => {
		if (+day === 31) {
			setYearWiseMonths(_31DaysMonths);
		} else if (+day === 30) {
			setYearWiseMonths(_30DaysMonths);
		} else {
			setYearWiseMonths(months);
		}
	}, [day, months.length]);

	useEffect(() => {
		if (month === "All") {
			setYearWiseDays(fixedDays);
		} else {
			const daysCount = new Date(
				2020,
				months.indexOf(month) + 1,
				0
			).getDate();
			setYearWiseDays(
				Array.from(Array(daysCount).keys())
					.map((i) => i + 1)
					.map((i) => i.toString())
					.map((i) => (i.length === 1 ? `0${i}` : i))
			);
		}
	}, [month]);

	const smallerScreen = useMediaQuery("(max-width: 500px)");

	const { classes } = useStyles();

	const handleReset = () => {
		handleAppliedFilters("All", "All", true);
	};

	return (
		<Group className={classes.Group}>
			<Select
				data-autofocus
				size="sm"
				data={["All", ...yearWiseMonths]}
				label="Month"
				className={classes.Select}
				value={month}
				onChange={(value) => handleAppliedFilters(value, "month")}
			/>
			<Select
				size="sm"
				data={["All", ...yearWiseDays]}
				label="Day"
				className={classes.Select}
				value={day}
				onChange={(value) => handleAppliedFilters(value, "day")}
			/>
			<Select
				size="sm"
				data={["All", ...(categories || [])]}
				label="Category"
				className={classes.Select}
				value={category}
				onChange={(value) => handleAppliedFilters(value, "category")}
			/>
			<Select
				size="sm"
				data={["bar", "donut"]}
				label="Chart Type"
				className={classes.Select}
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

export default memo(YearChartFilters);
