import { Drawer, Group, Select } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SelectPaymentMode from "../../../SelectPaymentMode/SelectPaymentMode";

const CategoryWiseFilterDrawer = ({
	yearWiseExpense,
	categoryWiseFilterOpened,
	setCategoryWiseFilterOpened,
	day,
	month,
	year,
	payment_mode,
	chartType,
	handleAppliedFilters,
}) => {
	const { months, fixedDays, _30DaysMonths, _31DaysMonths } = useSelector(
		(state) => state.utils
	);

	const [categoryWiseDays, setCategoryWiseDays] = useState([]);
	const [categoryWiseMonths, setCategoryWiseMonths] = useState(months);
	const [categoryWiseYears, setCategoryWiseYears] = useState([]);

	useEffect(() => {
		if (year === "All" && month === "All") setCategoryWiseDays(fixedDays);
		else if (month !== "All") {
			const tempYear = year === "All" ? 2020 : +year;
			const daysCount = new Date(
				tempYear,
				months.indexOf(month) + 1,
				0
			).getDate();
			setCategoryWiseDays(
				Array.from(Array(daysCount).keys())
					.map((i) => i + 1)
					.map((i) => i.toString())
					.map((i) => (i.length === 1 ? `0${i}` : i))
			);
		}
	}, [month, year]);

	useEffect(() => {
		if (+day === 31) setCategoryWiseMonths(_31DaysMonths);
		else if (+day === 30) setCategoryWiseMonths(_30DaysMonths);
		else if (+day === 29) {
			const tempYear = isNaN(+year) ? 2020 : +year;
			if (leapYear(tempYear)) setCategoryWiseMonths(months);
			else setCategoryWiseMonths(_30DaysMonths);
		} else setCategoryWiseMonths(months);
	}, [day, year]);

	useEffect(() => {
		setCategoryWiseYears(Object.keys(yearWiseExpense).sort((a, b) => b - a));
		if (day === "29" && month === "February")
			setCategoryWiseYears(
				categoryWiseYears.filter((year) => leapYear(+year))
			);
	}, [Object.keys(yearWiseExpense).length, month, day]);

	const leapYear = (year) =>
		(year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

	return (
		<Drawer
			position="right"
			opened={categoryWiseFilterOpened}
			onClose={() => setCategoryWiseFilterOpened(false)}
			title="Category Wise Expense Filters"
			padding="xl"
			size={350}
			style={{ zIndex: 1000, opacity: 0.95 }}
		>
			<Group style={{ width: "100%" }}>
				<Select
					data-autofocus
					size="xs"
					style={{ width: "100%" }}
					data={["All", ...categoryWiseYears]}
					label="Select a Year"
					value={year}
					onChange={(value) => handleAppliedFilters(value, "year")}
				/>
				<Select
					size="xs"
					style={{ width: "100%" }}
					data={["All", ...categoryWiseMonths]}
					label="Select a Month"
					value={month}
					onChange={(value) => handleAppliedFilters(value, "month")}
				/>
				<Select
					size="xs"
					style={{ width: "100%" }}
					data={["All", ...categoryWiseDays]}
					label="Select a Day"
					value={day}
					onChange={(value) => handleAppliedFilters(value, "day")}
				/>
				<SelectPaymentMode
					payment_mode={payment_mode}
					handleAppliedFilters={handleAppliedFilters}
				/>
				<Select
					size="xs"
					style={{ width: "100%" }}
					data={["bar", "donut"]}
					label="Select a Chart Type"
					value={chartType}
					onChange={(value) => handleAppliedFilters(value, "chartType")}
				/>
			</Group>
		</Drawer>
	);
};

export default CategoryWiseFilterDrawer;
