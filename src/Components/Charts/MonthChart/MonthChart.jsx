import { Alert, Drawer, LoadingOverlay } from "@mantine/core";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlertCircle } from "tabler-icons-react";
import { getMonthWiseExpenseForChart } from "../../../store/expense/ThunkFunctions/getMonthWiseExpenseForChart";
import { getYearWiseExpense } from "../../../store/expense/ThunkFunctions/getYearWiseExpense";
import CustomLoader from "../../CustomLoader";
import BarOrAreaChart from "../BarOrAreaChart";
import { useStyles } from "../Charts.style";
import DonutChart from "../DonutChart";
import MonthChartFilters from "./MonthChartFilters";

const MonthChart = ({ monthWiseFilterOpened, setMonthWiseFilterOpened }) => {
	const dispatch = useDispatch();

	const {
		monthWiseExpenseForChart,
		gettingMonthWiseExpenseForChart,
		monthWiseExpenseForChartError,
	} = useSelector((state) => state.expense);

	const { user } = useSelector((state) => state.user);
	const { currentYear } = useSelector((state) => state.expense);

	const [appliedFilters, setAppliedFilters] = useState({
		year: "",
		day: "All",
		category: "All",
		payment_mode: "All",
		chartType: "bar",
	});

	const { year, day, category, chartType, payment_mode } = appliedFilters;

	const { classes } = useStyles();

	useEffect(() => {
		if (user && monthWiseFilterOpened) {
			setAppliedFilters({ ...appliedFilters, year: currentYear });
			dispatch(
				getMonthWiseExpenseForChart([
					currentYear,
					day,
					category,
					payment_mode,
				])
			);
			dispatch(getYearWiseExpense());
		}
	}, [monthWiseFilterOpened]);

	const handleAppliedFilters = (
		value,
		type,
		reset = false,
		isExpense = false
	) => {
		if (reset) {
			setAppliedFilters({
				year: isExpense ? "All" : currentYear,
				day: "All",
				category: "All",
				payment_mode: "All",
				chartType: "bar",
			});
			dispatch(
				getMonthWiseExpenseForChart([
					isExpense ? "All" : currentYear,
					"All",
					"All",
					"All",
				])
			);
		} else {
			setAppliedFilters({ ...appliedFilters, [type]: value });
			if (type !== "chartType")
				dispatch(
					getMonthWiseExpenseForChart([
						type === "year" ? value : year,
						type === "day" ? value : day,
						type === "category" ? value : category,
						type === "payment_mode" ? value : payment_mode,
					])
				);
		}
	};

	return (
		<Drawer
			position="right"
			opened={monthWiseFilterOpened}
			onClose={() => setMonthWiseFilterOpened(false)}
			title="Month Wise Expense Chart"
			padding="xl"
			size={800}
			className={classes.Drawer}
		>
			<MonthChartFilters
				year={year}
				day={day}
				payment_mode={payment_mode}
				chartType={chartType}
				category={category}
				handleAppliedFilters={handleAppliedFilters}
			/>

			{gettingMonthWiseExpenseForChart ? (
				<div style={{ height: 250 }}>
					<LoadingOverlay loader={<CustomLoader />} visible blur={2} />
				</div>
			) : monthWiseExpenseForChartError ? (
				<Alert
					mt={50}
					icon={<AlertCircle size={16} />}
					title="Error!"
					color="red"
				>
					{monthWiseExpenseForChartError}
				</Alert>
			) : (
				monthWiseExpenseForChart &&
				(chartType === "donut" ? (
					<DonutChart data={monthWiseExpenseForChart} name="month" />
				) : (
					<BarOrAreaChart data={monthWiseExpenseForChart} name="month" />
				))
			)}
		</Drawer>
	);
};

export default memo(MonthChart);
