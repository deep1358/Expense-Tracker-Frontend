import { Alert, Drawer, LoadingOverlay } from "@mantine/core";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlertCircle } from "tabler-icons-react";
import { getYearWiseExpenseForChart } from "../../../store/expense/ThunkFunctions/getYearWiseExpenseForChart";
import CustomLoader from "../../CustomLoader";
import BarOrAreaChart from "../BarOrAreaChart";
import { useStyles } from "../Charts.style";
import DonutChart from "../DonutChart";
import YearChartFilters from "./YearChartFilters";

const YearChart = ({ yearWiseFilterOpened, setYearWiseFilterOpened }) => {
	const dispatch = useDispatch();

	const {
		yearWiseExpenseForChart,
		gettingYearWiseExpenseForChart,
		yearWiseExpenseForChartError,
	} = useSelector((state) => state.expense);

	const { months } = useSelector((state) => state.utils);

	const [appliedFilters, setAppliedFilters] = useState({
		month: "",
		day: "All",
		category: "All",
		payment_mode: "All",
		chartType: "bar",
	});

	const { month, day, category, chartType, payment_mode } = appliedFilters;

	const { user } = useSelector((state) => state.user);
	const { currentMonth } = useSelector((state) => state.expense);

	const { classes } = useStyles();

	useEffect(() => {
		if (user && yearWiseFilterOpened) {
			setAppliedFilters({
				...appliedFilters,
				month: months[currentMonth - 1],
			});
			dispatch(
				getYearWiseExpenseForChart([
					currentMonth,
					day,
					category,
					payment_mode,
				])
			);
		}
	}, [yearWiseFilterOpened]);

	const handleAppliedFilters = (value, type, reset = false) => {
		if (reset) {
			setAppliedFilters({
				month: currentMonth ? months[currentMonth - 1] : "All",
				day: "All",
				category: "All",
				payment_mode: "All",
				chartType: "bar",
			});
			dispatch(
				getYearWiseExpenseForChart([currentMonth, "All", "All", "All"])
			);
		} else {
			setAppliedFilters({ ...appliedFilters, [type]: value });
			if (type !== "chartType")
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
						type === "payment_mode" ? value : payment_mode,
					])
				);
		}
	};

	return (
		<Drawer
			position="right"
			opened={yearWiseFilterOpened}
			onClose={() => setYearWiseFilterOpened(false)}
			title="Year Wise Expense Chart"
			padding="xl"
			size={800}
			className={classes.Drawer}
		>
			<YearChartFilters
				month={month}
				day={day}
				category={category}
				payment_mode={payment_mode}
				chartType={chartType}
				handleAppliedFilters={handleAppliedFilters}
			/>
			{gettingYearWiseExpenseForChart ? (
				<div style={{ height: 250 }}>
					<LoadingOverlay loader={<CustomLoader />} visible blur={2} />
				</div>
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
		</Drawer>
	);
};

export default memo(YearChart);
