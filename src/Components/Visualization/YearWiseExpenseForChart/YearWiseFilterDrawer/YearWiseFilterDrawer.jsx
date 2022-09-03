import { Drawer, Group, Select } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const YearWiseFilterDrawer = ({
	yearWiseFilterOpened,
	setYearWiseFilterOpened,
	month,
	day,
	category,
	chartType,
	chartCategories,
	handleAppliedFilters,
}) => {
	const { months, fixedDays, _30DaysMonths, _31DaysMonths } = useSelector(
		(state) => state.utils
	);

	const [yearWiseDays, setYearWiseDays] = useState([]);
	const [yearWiseMonths, setYearWiseMonths] = useState(months);

	useEffect(() => {
		if (+day === 31) {
			setYearWiseMonths(_31DaysMonths);
		} else if (+day === 30) {
			setYearWiseMonths(_30DaysMonths);
		} else {
			setYearWiseMonths(months);
		}
	}, [day, months.length]);

	useEffect(() => {
		if (month === "All") {
			setYearWiseDays(fixedDays);
		} else {
			const daysCount = new Date(
				2020,
				months.indexOf(month) + 1,
				0
			).getDate();
			setYearWiseDays(
				Array.from(Array(daysCount).keys())
					.map((i) => i + 1)
					.map((i) => i.toString())
					.map((i) => (i.length === 1 ? `0${i}` : i))
			);
		}
	}, [month]);

	return (
		<Drawer
			opened={yearWiseFilterOpened}
			onClose={() => setYearWiseFilterOpened(false)}
			title="Category Wise Expense Filters"
			padding="xl"
			size={350}
			style={{ zIndex: 1000, opacity: 0.95 }}
		>
			<Group>
				<Select
					size="xs"
					data={["All", ...yearWiseMonths]}
					label="Select a Month"
					style={{ width: "100%" }}
					value={month}
					onChange={(value) => handleAppliedFilters(value, "month")}
				/>
				<Select
					size="xs"
					data={["All", ...yearWiseDays]}
					label="Select a Day"
					style={{ width: "100%" }}
					value={day}
					onChange={(value) => handleAppliedFilters(value, "day")}
				/>
				<Select
					size="xs"
					data={["All", ...chartCategories]}
					label="Select a Category"
					style={{ width: "100%" }}
					value={category}
					onChange={(value) => handleAppliedFilters(value, "category")}
				/>
				<Select
					size="xs"
					data={["bar", "donut"]}
					label="Select a Chart Type"
					style={{ width: "100%" }}
					value={chartType}
					onChange={(value) => handleAppliedFilters(value, "chartType")}
				/>
			</Group>
		</Drawer>
	);
};

export default YearWiseFilterDrawer;
