import { Alert, Drawer, LoadingOverlay } from "@mantine/core";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlertCircle } from "tabler-icons-react";
import { getDayWiseExpenseForChart } from "../../../store/expense/ThunkFunctions/getDayWiseExpenseForChart";
import { getYearWiseExpense } from "../../../store/expense/ThunkFunctions/getYearWiseExpense";
import CustomLoader from "../../CustomLoader";
import BarOrAreaChart from "../BarOrAreaChart";
import { useStyles } from "../Charts.style";
import DayChartFilters from "./DayChartFilters";

const DayChart = ({ dayWiseFilterOpened, setDayWiseFilterOpened }) => {
	const dispatch = useDispatch();

	const {
		dayWiseExpenseForChart,
		gettingDayWiseExpenseForChart,
		dayWiseExpenseForChartError,
		currentMonth,
		currentYear,
	} = useSelector((state) => state.expense);

	const { months } = useSelector((state) => state.utils);
	const { user } = useSelector((state) => state.user);
	const { yearWiseExpense } = useSelector((state) => state.expense);

	const [appliedFilters, setAppliedFilters] = useState({
		month: "",
		year: "",
		category: "All",
		payment_mode: "All",
	});

	const [chartCategories, setChartCategories] = useState([]);

	const { classes } = useStyles();

	useEffect(() => {
		if (user) setChartCategories(user.categories);
	}, [user]);

	const { year, month, category, payment_mode } = appliedFilters;

	useEffect(() => {
		if (user && dayWiseFilterOpened) {
			setAppliedFilters({
				...appliedFilters,
				month: months[currentMonth - 1],
				year: currentYear,
			});
			dispatch(getYearWiseExpense());
			dispatch(
				getDayWiseExpenseForChart([
					currentYear,
					currentMonth,
					category,
					payment_mode,
				])
			);
		}
	}, [
		Object(yearWiseExpense).length,
		currentYear,
		currentMonth,
		dayWiseFilterOpened,
	]);

	const handleAppliedFilters = (value, type) => {
		setAppliedFilters({ ...appliedFilters, [type]: value });
		dispatch(
			getDayWiseExpenseForChart([
				type === "year" ? value : year || currentYear,
				type === "month"
					? months.indexOf(value) === -1
						? "All"
						: months.indexOf(value) + 1
					: months.indexOf(month) + 1,
				type === "category" ? value : category,
				type === "payment_mode" ? value : payment_mode,
			])
		);
	};

	return (
		<Drawer
			position="right"
			opened={dayWiseFilterOpened}
			onClose={() => setDayWiseFilterOpened(false)}
			title="Day Wise Expense Chart"
			padding="xl"
			size={800}
			className={classes.Drawer}
		>
			<DayChartFilters
				handleAppliedFilters={handleAppliedFilters}
				appliedFilters={appliedFilters}
				month={month}
				yearWiseExpense={yearWiseExpense}
				year={year}
				category={category}
				payment_mode={payment_mode}
				chartCategories={chartCategories}
			/>
			{gettingDayWiseExpenseForChart ? (
				<div style={{ height: 250 }}>
					<LoadingOverlay
						style={{ zIndex: 10 }}
						loader={<CustomLoader />}
						visible
						blur={2}
					/>
				</div>
			) : dayWiseExpenseForChartError ? (
				<Alert
					mt={50}
					icon={<AlertCircle size={16} />}
					title="Error!"
					color="red"
				>
					{dayWiseExpenseForChartError}
				</Alert>
			) : (
				<BarOrAreaChart
					name="day"
					data={dayWiseExpenseForChart}
					chartType="area"
				/>
			)}
		</Drawer>
	);
};

export default memo(DayChart);
