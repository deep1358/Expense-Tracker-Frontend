import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import CategoryWiseExpenseForChart from "../../Components/Visualization/CategoryWiseExpenseForChart/CategoryWiseExpenseForChart";
import DayWiseExpenseForChart from "../../Components/Visualization/DayWiseExpenseForChart/DayWiseExpenseForChart";
import MonthWiseExpenseForChart from "../../Components/Visualization/MonthWiseExpenseForChart/MonthWiseExpenseForChart";
import YearWiseExpenseForChart from "../../Components/Visualization/YearWiseExpenseForChart/YearWiseExpenseForChart";
import { Container, SimpleGrid, Paper } from "@mantine/core";
import FilterIcon from "../../Components/Visualization/FilterIcon";

const Visualization = () => {
	const { user } = useSelector((state) => state.user);
	const { yearWiseExpense } = useSelector((state) => state.expense);

	const [chartCategories, setChartCategories] = useState([]);

	useEffect(() => {
		if (user) setChartCategories(user.categories);
	}, [user]);

	const [categoryWiseFilterOpened, setCategoryWiseFilterOpened] =
		useState(false);
	const [dayWiseFilterOpened, setDayWiseFilterOpened] = useState(false);
	const [monthWiseFilterOpened, setMonthWiseFilterOpened] = useState(false);
	const [yearWiseFilterOpened, setYearWiseFilterOpened] = useState(false);

	const charts = [
		{
			opened: setCategoryWiseFilterOpened,
			chart: (
				<CategoryWiseExpenseForChart
					yearWiseExpense={yearWiseExpense}
					categoryWiseFilterOpened={categoryWiseFilterOpened}
					setCategoryWiseFilterOpened={setCategoryWiseFilterOpened}
				/>
			),
		},
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
		},
	];

	return (
		<Container size={1440}>
			<SimpleGrid mb={10} breakpoints={[{ minWidth: 1000, cols: 2 }]}>
				{charts.map(({ opened, chart }, index) => (
					<Paper
						style={{
							position: "relative",
						}}
						withBorder
						shadow="md"
						size="md"
						radius="md"
						key={index}
					>
						<FilterIcon setOpened={opened} />
						{chart}
					</Paper>
				))}
			</SimpleGrid>
		</Container>
	);
};

export default Visualization;
