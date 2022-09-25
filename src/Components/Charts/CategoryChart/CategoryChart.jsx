import { Alert, Drawer, LoadingOverlay } from "@mantine/core";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlertCircle } from "tabler-icons-react";
import { getCategoryWiseExpenseForChart } from "../../../store/expense/ThunkFunctions/getCategoryWiseExpenseForChart";
import CategoryChartFilters from "./CategoryChartFilters";
import BarOrAreaChart from "../BarOrAreaChart";
import DonutChart from "../DonutChart";
import CustomLoader from "../../CustomLoader";
import { useStyles } from "../Charts.style";

const CategoryChart = ({
	categoryWiseChartOpened,
	setCategoryWiseChartOpened,
}) => {
	const dispatch = useDispatch();

	const {
		categoryWiseExpenseForChart,
		gettingCategoryWiseExpenseForChart,
		categoryWiseExpenseForChartError,
	} = useSelector((state) => state.expense);

	const { months } = useSelector((state) => state.utils);

	const { user } = useSelector((state) => state.user);

	const { currentMonth, currentYear } = useSelector((state) => state.expense);

	const [appliedFilters, setAppliedFilters] = useState({
		month: "",
		year: "",
		day: "All",
		payment_mode: "All",
		chartType: "bar",
	});

	const { classes } = useStyles();

	const { year, month, day, payment_mode, chartType } = appliedFilters;

	useEffect(() => {
		if (user && categoryWiseChartOpened) {
			dispatch(
				getCategoryWiseExpenseForChart([
					year || currentYear,
					months.indexOf(month) === -1
						? currentMonth
						: months.indexOf(month) + 1,
					day || "All",
					payment_mode || "All",
				])
			);
		}
	}, [categoryWiseChartOpened]);

	const handleAppliedFilters = (
		value,
		type,
		reset = false,
		isExpense = false
	) => {
		if (reset) {
			setAppliedFilters({
				month: isExpense ? "All" : months[currentMonth - 1],
				year: isExpense ? "All" : currentYear,
				day: "All",
				payment_mode: "All",
				chartType: "bar",
			});
			dispatch(
				getCategoryWiseExpenseForChart([
					isExpense ? "All" : currentYear,
					isExpense ? "All" : currentMonth,
					"All",
					"All",
				])
			);
		} else {
			setAppliedFilters({ ...appliedFilters, [type]: value });
			dispatch(
				getCategoryWiseExpenseForChart([
					type === "year" ? value : year,
					type === "month"
						? months.indexOf(value) === -1
							? "All"
							: months.indexOf(value) + 1
						: months.indexOf(month) === -1
						? "All"
						: months.indexOf(month) + 1,
					type === "day" ? value : day,
					type === "payment_mode" ? value : payment_mode,
				])
			);
		}
	};

	return (
		<Drawer
			position="right"
			opened={categoryWiseChartOpened}
			onClose={() => setCategoryWiseChartOpened(false)}
			title="Category Wise Expense Chart"
			padding="xl"
			size={800}
			className={classes.Drawer}
		>
			<CategoryChartFilters
				month={month}
				year={year}
				day={day}
				payment_mode={payment_mode}
				chartType={chartType}
				handleAppliedFilters={handleAppliedFilters}
			/>
			{gettingCategoryWiseExpenseForChart ? (
				<div style={{ height: 250 }}>
					<LoadingOverlay loader={<CustomLoader />} visible blur={2} />
				</div>
			) : categoryWiseExpenseForChartError ? (
				<Alert
					mt={50}
					icon={<AlertCircle size={16} />}
					title="Error!"
					color="red"
				>
					{categoryWiseExpenseForChartError}
				</Alert>
			) : (
				categoryWiseExpenseForChart &&
				(chartType === "donut" ? (
					<DonutChart data={categoryWiseExpenseForChart} name="category" />
				) : (
					<BarOrAreaChart
						data={categoryWiseExpenseForChart}
						name="category"
					/>
				))
			)}
		</Drawer>
	);
};

export default memo(CategoryChart);
