import { Group, Select } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { memo } from "react";
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

	const { yearWiseExpense } = useSelector((state) => state.expense);

	const smallerScreen = useMediaQuery("(max-width: 500px)");

	const { classes } = useStyles();

	return (
		<Group>
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
			<SelectPaymentMode
				payment_mode={payment_mode}
				handleAppliedFilters={handleAppliedFilters}
				placeHolder="Payment Mode"
				width={smallerScreen ? "45%" : "30%"}
			/>
			<Select
				size="sm"
				data={["bar", "donut"]}
				label="Chart Type"
				className={classes.Select}
				value={chartType}
				onChange={(value) => handleAppliedFilters(value, "chartType")}
			/>
		</Group>
	);
};

export default memo(MonthChartFilters);
