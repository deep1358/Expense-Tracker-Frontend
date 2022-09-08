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
import FilteredChips from "../../FilteredChips/FilteredChips";

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
		payment_mode: "All",
	});

	const { year, month, category, payment_mode } = appliedFilters;

	useEffect(() => {
		if (user)
			dispatch(
				getDayWiseExpenseForChart([
					currentYear,
					currentMonth,
					category,
					payment_mode,
				])
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
					? months.indexOf(value) === -1
						? "All"
						: months.indexOf(value) + 1
					: months.indexOf(month) + 1,
				type === "category" ? value : category,
				type === "payment_mode" ? value : payment_mode,
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
				payment_mode={payment_mode}
				chartCategories={chartCategories}
				handleAppliedFilters={handleAppliedFilters}
			/>

			<Center style={{ width: smallerScreen ? "96%" : "100%" }}>
				<Title mt={4} mb={2} ml={1} order={4}>
					Day Wise Expense
				</Title>
			</Center>

			<FilteredChips
				nonRemoveTypes={["month", "year"]}
				appliedFilters={appliedFilters}
				handleAppliedFilters={handleAppliedFilters}
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
		</>
	);
};

export default memo(DayWiseExpenseForChart);
