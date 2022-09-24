import { Group, Select } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import SelectPaymentMode from "../../SelectPaymentMode/SelectPaymentMode";
import { useStyles } from "../Charts.style";

const DayChartFilters = ({
	month,
	year,
	category,
	payment_mode,
	handleAppliedFilters,
	yearWiseExpense,
}) => {
	const { currentYear } = useSelector((state) => state.expense);

	const { months } = useSelector((state) => state.utils);

	const {
		user: { categories },
	} = useSelector((state) => state.user);

	const { classes } = useStyles();

	const smallerScreen = useMediaQuery("(max-width: 500px)");

	return (
		<Group mb={10}>
			<Select
				data-autofocus
				size="sm"
				className={classes.Select}
				data={Object.keys(yearWiseExpense)?.sort((a, b) => b - a)}
				label="Year"
				value={
					!year
						? currentYear !== new Date().getFullYear()
							? `${currentYear}`
							: `${new Date().getFullYear()}`
						: `${year}`
				}
				onChange={(value) => handleAppliedFilters(value, "year")}
			/>
			<Select
				size="sm"
				className={classes.Select}
				data={months}
				label="Month"
				value={month}
				onChange={(value) => handleAppliedFilters(value, "month")}
			/>
			<Select
				size="sm"
				className={classes.Select}
				data={["All", ...(categories || [])]}
				label="Category"
				value={category}
				onChange={(value) => handleAppliedFilters(value, "category")}
			/>
			<SelectPaymentMode
				payment_mode={payment_mode}
				handleAppliedFilters={handleAppliedFilters}
				placeHolder="Payment Mode"
				width={smallerScreen ? "45%" : "30%"}
			/>
		</Group>
	);
};

export default memo(DayChartFilters);
