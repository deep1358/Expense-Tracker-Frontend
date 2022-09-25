import { Button, Group, Select } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import SelectPaymentMode from "../../SelectPaymentMode/SelectPaymentMode";
import { useStyles } from "../Charts.style";

const MonthChartFilters = ({
	year,
	day,
	category,
	payment_mode,
	chartType,
	handleAppliedFilters,
}) => {
	const {
		user: { categories },
	} = useSelector((state) => state.user);

	const { fixedDays } = useSelector((state) => state.utils);

	const { yearWiseExpense, currentYear } = useSelector(
		(state) => state.expense
	);

	const smallerScreen = useMediaQuery("(max-width: 500px)");

	const { classes } = useStyles();

	const handleReset = () => {
		if (Object.keys(yearWiseExpense).includes(`${currentYear}`))
			handleAppliedFilters("All", "All", true);
		else handleAppliedFilters("All", "All", true, true);
	};

	useEffect(() => {
		if (Object.keys(yearWiseExpense).length) {
			if (Object.keys(yearWiseExpense).includes(`${currentYear}`))
				handleAppliedFilters("All", "All", true);
			else handleAppliedFilters("All", "All", true, true);
		}
	}, [Object.keys(yearWiseExpense).length]);

	return (
		<Group className={classes.Group}>
			<Select
				data-autofocus
				size="sm"
				data={[
					"All",
					...Object.keys(yearWiseExpense)?.sort((a, b) => b - a),
				]}
				label="Year"
				className={classes.Select}
				value={year}
				onChange={(value) => handleAppliedFilters(value, "year")}
			/>
			<Select
				size="sm"
				data={["All", ...fixedDays]}
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

export default memo(MonthChartFilters);
