import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import CategoryWiseExpenseForChart from "../../Components/Visualization/CategoryWiseExpenseForChart/CategoryWiseExpenseForChart";
import DayWiseExpenseForChart from "../../Components/Visualization/DayWiseExpenseForChart/DayWiseExpenseForChart";
import MonthWiseExpenseForChart from "../../Components/Visualization/MonthWiseExpenseForChart/MonthWiseExpenseForChart";
import YearWiseExpenseForChart from "../../Components/Visualization/YearWiseExpenseForChart/YearWiseExpenseForChart";
import { Container, Paper } from "@mantine/core";
import FilterIcon from "../../Components/Visualization/FilterIcon";
import PaymentModeWiseExpenseForChart from "../../Components/Visualization/PaymentModeWiseExpenseForChart/PaymentModeWiseExpenseForChart";
import { Grid } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const Visualization = () => {
	const { user } = useSelector((state) => state.user);
	const { yearWiseExpense } = useSelector((state) => state.expense);

	const [chartCategories, setChartCategories] = useState([]);

	useEffect(() => {
		if (user) setChartCategories(user.categories);
	}, [user]);

	const [categoryWiseFilterOpened, setCategoryWiseFilterOpened] =
		useState(false);
	const [paymentModeWiseFilterOpened, setPaymentModeWiseFilterOpened] =
		useState(false);
	const [dayWiseFilterOpened, setDayWiseFilterOpened] = useState(false);
	const [monthWiseFilterOpened, setMonthWiseFilterOpened] = useState(false);
	const [yearWiseFilterOpened, setYearWiseFilterOpened] = useState(false);

	const mediumScreen = useMediaQuery("(max-width: 900px)");

	const charts = [
		{
			opened: setDayWiseFilterOpened,
			chart: (
				<DayWiseExpenseForChart
					chartCategories={chartCategories}
					yearWiseExpense={yearWiseExpense}
					dayWiseFilterOpened={dayWiseFilterOpened}
					setDayWiseFilterOpened={setDayWiseFilterOpened}
				/>
			),
			span: 12,
		},
		{
			opened: setCategoryWiseFilterOpened,
			chart: (
				<CategoryWiseExpenseForChart
					yearWiseExpense={yearWiseExpense}
					categoryWiseFilterOpened={categoryWiseFilterOpened}
					setCategoryWiseFilterOpened={setCategoryWiseFilterOpened}
				/>
			),
			span: mediumScreen ? 12 : 6,
		},
		{
			opened: setPaymentModeWiseFilterOpened,
			chart: (
				<PaymentModeWiseExpenseForChart
					chartCategories={chartCategories}
					yearWiseExpense={yearWiseExpense}
					paymentModeWiseFilterOpened={paymentModeWiseFilterOpened}
					setPaymentModeWiseFilterOpened={setPaymentModeWiseFilterOpened}
				/>
			),
			span: mediumScreen ? 12 : 6,
		},
		{
			opened: setMonthWiseFilterOpened,
			chart: (
				<MonthWiseExpenseForChart
					chartCategories={chartCategories}
					yearWiseExpense={yearWiseExpense}
					monthWiseFilterOpened={monthWiseFilterOpened}
					setMonthWiseFilterOpened={setMonthWiseFilterOpened}
				/>
			),
			span: mediumScreen ? 12 : 6,
		},
		{
			opened: setYearWiseFilterOpened,
			chart: (
				<YearWiseExpenseForChart
					chartCategories={chartCategories}
					yearWiseExpense={yearWiseExpense}
					yearWiseFilterOpened={yearWiseFilterOpened}
					setYearWiseFilterOpened={setYearWiseFilterOpened}
				/>
			),
			span: mediumScreen ? 12 : 6,
		},
	];

	return (
		<Container size={1440}>
			<Grid mb={10} columns={12}>
				{charts.map(({ opened, chart, span }, index) => (
					<Grid.Col span={span} key={index}>
						<Paper
							style={{
								position: "relative",
							}}
							withBorder
							shadow="md"
							size="md"
							radius="md"
						>
							<FilterIcon setOpened={opened} />
							{chart}
						</Paper>
					</Grid.Col>
				))}
			</Grid>
		</Container>
	);
};

export default Visualization;
