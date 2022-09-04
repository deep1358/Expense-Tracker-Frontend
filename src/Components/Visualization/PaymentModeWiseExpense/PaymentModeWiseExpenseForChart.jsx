import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadingOverlay, Alert, Center, Title } from "@mantine/core";
import { AlertCircle } from "tabler-icons-react";
import { useMediaQuery } from "@mantine/hooks";
import { getPaymentModeWiseExpenseForChart } from "../../../store/expense/ThunkFunctions/getPaymentModeWiseExpenseForChart";
import BarOrAreaChart from "../BarOrAreaChart/BarOrAreaChart";
import DonutChart from "../DonutChart/DonutChart";
import CustomLoader from "../../CustomLoader";
import PaymentModeWiseFilterDrawer from "./PaymentModeWiseFilterDrawer/PaymentModeWiseFilterDrawer";
import FilteredChips from "../FilteredChips";

const PaymentModeWiseExpenseForChart = ({
	yearWiseExpense,
	paymentModeWiseFilterOpened,
	setPaymentModeWiseFilterOpened,
	chartCategories,
}) => {
	const dispatch = useDispatch();

	const {
		paymentModeWiseExpenseForChart,
		gettingPaymentModeWiseExpenseForChart,
		paymentModeWiseExpenseForChartError,
	} = useSelector((state) => state.expense);

	const { months } = useSelector((state) => state.utils);

	const { user } = useSelector((state) => state.user);

	const [appliedFilters, setAppliedFilters] = useState({
		month: "All",
		year: "All",
		day: "All",
		category: "All",
		chartType: "bar",
	});

	const { year, month, day, category, chartType } = appliedFilters;

	useEffect(() => {
		if (user)
			dispatch(
				getPaymentModeWiseExpenseForChart([
					year || "All",
					months.indexOf(month) === -1 ? "All" : months.indexOf(month) + 1,
					day || "All",
					category || "All",
				])
			);
	}, []);

	const handleAppliedFilters = (value, type) => {
		setAppliedFilters({ ...appliedFilters, [type]: value });
		dispatch(
			getPaymentModeWiseExpenseForChart([
				type === "year" ? value : year,
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

	const smallerScreen = useMediaQuery("(max-width: 400px)");

	return (
		<>
			<PaymentModeWiseFilterDrawer
				paymentModeWiseFilterOpened={paymentModeWiseFilterOpened}
				setPaymentModeWiseFilterOpened={setPaymentModeWiseFilterOpened}
				yearWiseExpense={yearWiseExpense}
				month={month}
				year={year}
				day={day}
				category={category}
				chartType={chartType}
				handleAppliedFilters={handleAppliedFilters}
				chartCategories={chartCategories}
			/>

			<Center style={{ width: smallerScreen ? "86%" : "100%" }}>
				<Title mt={4} mb={2} ml={1} order={4}>
					PaymentMode Wise Expense
				</Title>
			</Center>

			<FilteredChips
				appliedFilters={appliedFilters}
				handleAppliedFilters={handleAppliedFilters}
			/>

			{gettingPaymentModeWiseExpenseForChart ? (
				<LoadingOverlay loader={<CustomLoader />} visible blur={2} />
			) : paymentModeWiseExpenseForChartError ? (
				<Alert
					mt={50}
					icon={<AlertCircle size={16} />}
					title="Error!"
					color="red"
				>
					{paymentModeWiseExpenseForChartError}
				</Alert>
			) : (
				paymentModeWiseExpenseForChart &&
				(chartType === "donut" ? (
					<DonutChart
						data={paymentModeWiseExpenseForChart}
						name="payment_mode"
					/>
				) : (
					<BarOrAreaChart
						data={paymentModeWiseExpenseForChart}
						name="payment_mode"
					/>
				))
			)}
		</>
	);
};

export default memo(PaymentModeWiseExpenseForChart);
