import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getYearWiseExpenseForChart } from "../../../store/expense/ThunkFunctions/getYearWiseExpenseForChart";
import BarOrAreaChart from "../BarOrAreaChart/BarOrAreaChart";
import DonutChart from "../DonutChart/DonutChart";
import { LoadingOverlay, Alert, Center, Title } from "@mantine/core";
import CustomLoader from "../../CustomLoader";
import { AlertCircle } from "tabler-icons-react";
import YearWiseFilterDrawer from "./YearWiseFilterDrawer/YearWiseFilterDrawer";
import MonthWiseFilter from "../MonthWiseExpenseForChart/MonthWiseFilter/MonthWiseFilter";

const YearWiseExpenseForChart = ({
	chartCategories,
	yearWiseFilterOpened,
	setYearWiseFilterOpened,
}) => {
	const dispatch = useDispatch();

	const {
		yearWiseExpenseForChart,
		gettingYearWiseExpenseForChart,
		yearWiseExpenseForChartError,
	} = useSelector((state) => state.expense);

	const { months } = useSelector((state) => state.utils);

	const [appliedFilters, setAppliedFilters] = useState({
		month: "All",
		day: "All",
		category: "All",
		chartType: "bar",
	});

	const { month, day, category, chartType } = appliedFilters;

	const { user } = useSelector((state) => state.user);

	useEffect(() => {
		if (user) dispatch(getYearWiseExpenseForChart([month, day, category]));
	}, []);

	const handleAppliedFilters = (value, type) => {
		setAppliedFilters({ ...appliedFilters, [type]: value });
		dispatch(
			getYearWiseExpenseForChart([
				type === "month"
					? months.indexOf(value) === -1
						? "All"
						: months.indexOf(value) + 1
					: months.indexOf(month) === -1
					? "All"
					: months.indexOf(month) + 1,
				type === "day" ? value : day,
				type === "category" ? value : category,
			])
		);
	};

	return (
		<>
			<YearWiseFilterDrawer
				handleAppliedFilters={handleAppliedFilters}
				month={month}
				day={day}
				category={category}
				chartType={chartType}
				yearWiseFilterOpened={yearWiseFilterOpened}
				setYearWiseFilterOpened={setYearWiseFilterOpened}
				chartCategories={chartCategories}
			/>

			<Center style={{ width: "100%" }}>
				<Title mt={2} order={4}>
					Year Wise Expense
				</Title>
			</Center>

			<MonthWiseFilter
				appliedFilters={appliedFilters}
				handleAppliedFilters={handleAppliedFilters}
			/>

			{gettingYearWiseExpenseForChart ? (
				<LoadingOverlay loader={<CustomLoader />} visible blur={2} />
			) : yearWiseExpenseForChartError ? (
				<Alert
					mt={50}
					icon={<AlertCircle size={16} />}
					title="Error!"
					color="red"
				>
					{yearWiseExpenseForChartError}
				</Alert>
			) : (
				yearWiseExpenseForChart &&
				(chartType === "donut" ? (
					<DonutChart data={yearWiseExpenseForChart} name="year" />
				) : (
					<BarOrAreaChart data={yearWiseExpenseForChart} name="year" />
				))
			)}
		</>
	);
};

export default memo(YearWiseExpenseForChart);
