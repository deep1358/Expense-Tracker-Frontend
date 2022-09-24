import { Alert, Drawer, LoadingOverlay } from "@mantine/core";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlertCircle } from "tabler-icons-react";
import { getPaymentModeWiseExpenseForChart } from "../../../store/expense/ThunkFunctions/getPaymentModeWiseExpenseForChart";
import CustomLoader from "../../CustomLoader";
import BarOrAreaChart from "../BarOrAreaChart";
import { useStyles } from "../Charts.style";
import DonutChart from "../DonutChart";
import PaymentModeChartFilters from "./PaymentModeChartFilters";

const PaymentModeChart = ({
	paymentModeWiseChartOpened,
	setPaymentModeWiseChartOpened,
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

	const { classes } = useStyles();

	const { year, month, day, category, chartType } = appliedFilters;

	useEffect(() => {
		if (user && paymentModeWiseChartOpened)
			dispatch(
				getPaymentModeWiseExpenseForChart([
					year || "All",
					months.indexOf(month) === -1 ? "All" : months.indexOf(month) + 1,
					day || "All",
					category || "All",
				])
			);
	}, [paymentModeWiseChartOpened]);

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

	return (
		<Drawer
			position="right"
			opened={paymentModeWiseChartOpened}
			onClose={() => setPaymentModeWiseChartOpened(false)}
			title="PaymentMode Wise Expense Chart"
			padding="xl"
			size={800}
			className={classes.Drawer}
		>
			<PaymentModeChartFilters
				day={day}
				month={month}
				year={year}
				handleAppliedFilters={handleAppliedFilters}
				category={category}
				chartType={chartType}
			/>
			{gettingPaymentModeWiseExpenseForChart ? (
				<div style={{ height: 250 }}>
					<LoadingOverlay loader={<CustomLoader />} visible blur={2} />
				</div>
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
		</Drawer>
	);
};

export default memo(PaymentModeChart);
