import React, { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMonthWiseExpenseForChart } from "../../../store/expense/ThunkFunctions/getMonthWiseExpenseForChart";
import BarOrAreaChart from "../BarOrAreaChart/BarOrAreaChart";
import DonutChart from "../DonutChart/DonutChart";
import { LoadingOverlay, Alert, Center, Title } from "@mantine/core";
import CustomLoader from "../../CustomLoader";
import { AlertCircle } from "tabler-icons-react";
import MonthWiseFilterDrawer from "./MonthWiseFilterDrawer/MonthWiseFilterDrawer";
import FilteredChips from "../FilteredChips";

const MonthWiseExpenseForChart = ({
	chartCategories,
	yearWiseExpense,
	setMonthWiseFilterOpened,
	monthWiseFilterOpened,
}) => {
	const dispatch = useDispatch();

	const {
		monthWiseExpenseForChart,
		gettingMonthWiseExpenseForChart,
		monthWiseExpenseForChartError,
	} = useSelector((state) => state.expense);

	const { user } = useSelector((state) => state.user);

	const [appliedFilters, setAppliedFilters] = useState({
		year: "All",
		day: "All",
		category: "All",
		chartType: "bar",
	});

	const { year, day, category, chartType } = appliedFilters;

	useEffect(() => {
		if (user) dispatch(getMonthWiseExpenseForChart([year, day, category]));
	}, []);

	const handleAppliedFilters = (value, type) => {
		setAppliedFilters({ ...appliedFilters, [type]: value });
		dispatch(
			getMonthWiseExpenseForChart([
				type === "year" ? value : year,
				type === "day" ? value : day,
				type === "category" ? value : category,
			])
		);
	};

	return (
		<>
			<MonthWiseFilterDrawer
				monthWiseFilterOpened={monthWiseFilterOpened}
				setMonthWiseFilterOpened={setMonthWiseFilterOpened}
				yearWiseExpense={yearWiseExpense}
				handleAppliedFilters={handleAppliedFilters}
				chartCategories={chartCategories}
				year={year}
				day={day}
				category={category}
				chartType={chartType}
			/>

			<Center style={{ width: "100%" }}>
				<Title mt={2} order={4}>
					Month Wise Expense
				</Title>
			</Center>

			<FilteredChips
				appliedFilters={appliedFilters}
				handleAppliedFilters={handleAppliedFilters}
			/>

			{gettingMonthWiseExpenseForChart ? (
				<LoadingOverlay loader={<CustomLoader />} visible blur={2} />
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
		</>
	);
};

export default memo(MonthWiseExpenseForChart);
