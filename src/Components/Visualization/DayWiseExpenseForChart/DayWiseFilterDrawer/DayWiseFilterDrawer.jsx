import { Drawer, Group, Select } from "@mantine/core";
import React from "react";
import { useSelector } from "react-redux";
import SelectPaymentMode from "../../SelectPaymentMode/SelectPaymentMode";

const DayWiseFilterDrawer = ({
	yearWiseExpense,
	chartCategories,
	dayWiseFilterOpened,
	setDayWiseFilterOpened,
	month,
	year,
	category,
	payment_mode,
	handleAppliedFilters,
}) => {
	const { currentYear } = useSelector((state) => state.expense);

	const { months } = useSelector((state) => state.utils);

	return (
		<Drawer
			position="right"
			opened={dayWiseFilterOpened}
			onClose={() => setDayWiseFilterOpened(false)}
			title="Day Wise Expense Filters"
			padding="xl"
			size={350}
			style={{ zIndex: 1000, opacity: 0.95 }}
		>
			<Group>
				<Select
					data-autofocus
					size="xs"
					style={{ width: "100%" }}
					data={Object.keys(yearWiseExpense)?.sort((a, b) => b - a)}
					label="Select a Year"
					value={
						!year
							? currentYear !== new Date().getFullYear()
								? `${currentYear}`
								: `${new Date().getFullYear()}`
							: `${year}`
					}
					onChange={(value) => handleAppliedFilters(value, "year")}
				/>
				<Select
					size="xs"
					style={{ width: "100%" }}
					data={months}
					label="Select a Month"
					value={month}
					onChange={(value) => handleAppliedFilters(value, "month")}
				/>
				<Select
					size="xs"
					style={{ width: "100%" }}
					data={["All", ...chartCategories]}
					label="Select a Category"
					value={category}
					onChange={(value) => handleAppliedFilters(value, "category")}
				/>
				<SelectPaymentMode
					payment_mode={payment_mode}
					handleAppliedFilters={handleAppliedFilters}
				/>
			</Group>
		</Drawer>
	);
};

export default DayWiseFilterDrawer;
