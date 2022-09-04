import { Drawer, Group, Select } from "@mantine/core";
import React from "react";
import { useSelector } from "react-redux";
import SelectPaymentMode from "../../SelectPaymentMode/SelectPaymentMode";

const MonthWiseFilterDrawer = ({
	monthWiseFilterOpened,
	setMonthWiseFilterOpened,
	yearWiseExpense,
	handleAppliedFilters,
	chartCategories,
	year,
	day,
	category,
	payment_mode,
	chartType,
}) => {
	const { fixedDays } = useSelector((state) => state.utils);

	return (
		<Drawer
			position="right"
			opened={monthWiseFilterOpened}
			onClose={() => setMonthWiseFilterOpened(false)}
			title="Category Wise Expense Filters"
			padding="xl"
			size={350}
			style={{ zIndex: 1000, opacity: 0.95 }}
		>
			<Group>
				<Select
					data-autofocus
					size="xs"
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
					size="xs"
					data={["All", ...fixedDays]}
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
				<SelectPaymentMode
					payment_mode={payment_mode}
					handleAppliedFilters={handleAppliedFilters}
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

export default MonthWiseFilterDrawer;
