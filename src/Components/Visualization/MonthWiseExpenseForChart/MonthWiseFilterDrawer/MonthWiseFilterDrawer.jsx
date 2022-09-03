import { Drawer, Group, Select } from "@mantine/core";
import React from "react";
import { useSelector } from "react-redux";

const MonthWiseFilterDrawer = ({
	monthWiseFilterOpened,
	setMonthWiseFilterOpened,
	yearWiseExpense,
	handleAppliedFilters,
	chartCategories,
	year,
	day,
	category,
	chartType,
}) => {
	const { fixedDays } = useSelector((state) => state.utils);

	return (
		<Drawer
			opened={monthWiseFilterOpened}
			onClose={() => setMonthWiseFilterOpened(false)}
			title="Category Wise Expense Filters"
			padding="xl"
			size={350}
			style={{ zIndex: 1000, opacity: 0.95 }}
		>
			<Group>
				<Select
					size="sm"
					data={[
						"All",
						...Object.keys(yearWiseExpense)?.sort((a, b) => b - a),
					]}
					label="Select a Year"
					style={{ width: "100%" }}
					value={year}
					onChange={(value) => handleAppliedFilters(value, "year")}
				/>
				<Select
					size="sm"
					data={["All", ...fixedDays]}
					label="Select a Day"
					style={{ width: "100%" }}
					value={day}
					onChange={(value) => handleAppliedFilters(value, "day")}
				/>
				<Select
					size="sm"
					data={["All", ...chartCategories]}
					label="Select a Category"
					style={{ width: "100%" }}
					value={category}
					onChange={(value) => handleAppliedFilters(value, "category")}
				/>
				<Select
					size="sm"
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

export default MonthWiseFilterDrawer;
