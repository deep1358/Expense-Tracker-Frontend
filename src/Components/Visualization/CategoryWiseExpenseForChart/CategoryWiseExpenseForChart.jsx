import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadingOverlay, Alert, Center, Title } from "@mantine/core";
import { AlertCircle } from "tabler-icons-react";
import { useMediaQuery } from "@mantine/hooks";
import { getCategoryWiseExpenseForChart } from "../../../store/expense/ThunkFunctions/getCategoryWiseExpenseForChart";
import BarOrAreaChart from "../BarOrAreaChart/BarOrAreaChart";
import DonutChart from "../DonutChart/DonutChart";
import CustomLoader from "../../CustomLoader";
import CategoryWiseFilterDrawer from "./CategoryWiseFilterDrawer/CategoryWiseFilterDrawer";
import FilteredChips from "../FilteredChips";

const CategoryWiseExpenseForChart = ({
	yearWiseExpense,
	categoryWiseFilterOpened,
	setCategoryWiseFilterOpened,
}) => {
	const dispatch = useDispatch();

	const {
		categoryWiseExpenseForChart,
		gettingCategoryWiseExpenseForChart,
		categoryWiseExpenseForChartError,
	} = useSelector((state) => state.expense);

	const { months } = useSelector((state) => state.utils);

	const { user } = useSelector((state) => state.user);

	const [appliedFilters, setAppliedFilters] = useState({
		month: "All",
		year: "All",
		day: "All",
		payment_mode: "All",
		chartType: "bar",
	});

	const { year, month, day, payment_mode, chartType } = appliedFilters;

	useEffect(() => {
		if (user)
			dispatch(
				getCategoryWiseExpenseForChart([
					year || "All",
					months.indexOf(month) === -1 ? "All" : months.indexOf(month) + 1,
					day || "All",
					payment_mode || "All",
				])
			);
	}, []);

	const handleAppliedFilters = (value, type) => {
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
	};

	const smallerScreen = useMediaQuery("(max-width: 400px)");

	return (
		<>
			<CategoryWiseFilterDrawer
				categoryWiseFilterOpened={categoryWiseFilterOpened}
				setCategoryWiseFilterOpened={setCategoryWiseFilterOpened}
				yearWiseExpense={yearWiseExpense}
				month={month}
				year={year}
				day={day}
				payment_mode={payment_mode}
				chartType={chartType}
				handleAppliedFilters={handleAppliedFilters}
			/>

			<Center style={{ width: smallerScreen ? "86%" : "100%" }}>
				<Title mt={4} mb={2} ml={1} order={4}>
					Category Wise Expense
				</Title>
			</Center>

			<FilteredChips
				appliedFilters={appliedFilters}
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
		</>
	);
};

export default memo(CategoryWiseExpenseForChart);
