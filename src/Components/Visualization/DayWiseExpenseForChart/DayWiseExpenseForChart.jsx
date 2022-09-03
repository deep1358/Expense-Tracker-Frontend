import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDayWiseExpenseForChart } from "../../../store/expense/ThunkFunctions/getDayWiseExpenseForChart";
import { getYearWiseExpense } from "../../../store/expense/ThunkFunctions/getYearWiseExpense";
import BarOrAreaChart from "../BarOrAreaChart/BarOrAreaChart";
import { LoadingOverlay, Alert, Title, Center } from "@mantine/core";
import CustomLoader from "../../CustomLoader";
import { AlertCircle } from "tabler-icons-react";
import DayWiseFilterDrawer from "./DayWiseFilterDrawer/DayWiseFilterDrawer";
import { useMediaQuery } from "@mantine/hooks";
import DayWiseFilter from "./DayWiseFilter/DayWiseFilter";

const DayWiseExpenseForChart = ({
	yearWiseExpense,
	chartCategories,
	dayWiseFilterOpened,
	setDayWiseFilterOpened,
}) => {
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

	const [appliedFilters, setAppliedFilters] = useState({
		month: "",
		year: "",
		category: "All",
	});

	const { year, month, category } = appliedFilters;

	useEffect(() => {
		if (user)
			dispatch(
				getDayWiseExpenseForChart([currentYear, currentMonth, category])
			);
	}, []);

	useEffect(() => {
		if (user) {
			setAppliedFilters({
				...appliedFilters,
				month: months[currentMonth - 1],
				year: currentYear,
			});
			dispatch(getYearWiseExpense());
		}
	}, [Object(yearWiseExpense).length]);

	const handleAppliedFilters = (value, type) => {
		setAppliedFilters({ ...appliedFilters, [type]: value });
		dispatch(
			getDayWiseExpenseForChart([
				type === "year" ? value : year || currentYear,
				type === "month"
					? months.indexOf(month) === -1
						? "All"
						: months.indexOf(month)
					: months.indexOf(month) + 1,
				type === "category" ? value : category,
			])
		);
	};

	const smallerScreen = useMediaQuery("(max-width: 400px)");

	return (
		<>
			<DayWiseFilterDrawer
				dayWiseFilterOpened={dayWiseFilterOpened}
				setDayWiseFilterOpened={setDayWiseFilterOpened}
				yearWiseExpense={yearWiseExpense}
				month={month}
				year={year}
				category={category}
				chartCategories={chartCategories}
				handleAppliedFilters={handleAppliedFilters}
			/>

			<Center style={{ width: smallerScreen ? "82%" : "100%" }}>
				<Title mt={4} mb={2} ml={1} order={4}>
					Day Wise Expense
				</Title>
			</Center>

			<DayWiseFilter
				appliedFilters={appliedFilters}
				handleAppliedFilters={handleAppliedFilters}
			/>
			{gettingDayWiseExpenseForChart ? (
				<LoadingOverlay loader={<CustomLoader />} visible blur={2} />
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
		</>
	);
};

export default memo(DayWiseExpenseForChart);
