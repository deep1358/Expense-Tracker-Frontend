import { Button, Group, Select } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { memo, useEffect } from "react";
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

	const { classes } = useStyles({ inline: true });

	const smallerScreen = useMediaQuery("(max-width: 500px)");

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
		<Group mb={10} className={classes.Group}>
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
			<SelectPaymentMode
				payment_mode={payment_mode}
				handleAppliedFilters={handleAppliedFilters}
				placeHolder="Payment Mode"
				width={smallerScreen ? "96%" : "30%"}
			/>
			<Select
				size="sm"
				className={classes.Select}
				data={["All", ...(categories || [])]}
				label="Category"
				value={category}
				onChange={(value) => handleAppliedFilters(value, "category")}
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

export default memo(DayChartFilters);
