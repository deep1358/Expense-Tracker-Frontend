import { Drawer, Group, Select } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PaymentModeWiseFilterDrawer = ({
	yearWiseExpense,
	paymentModeWiseFilterOpened,
	setPaymentModeWiseFilterOpened,
	day,
	month,
	year,
	category,
	chartType,
	handleAppliedFilters,
	chartCategories,
}) => {
	const { months, fixedDays, _30DaysMonths, _31DaysMonths } = useSelector(
		(state) => state.utils
	);

	const [paymentModeWiseDays, setPaymentModeWiseDays] = useState([]);
	const [paymentModeWiseMonths, setPaymentModeWiseMonths] = useState(months);
	const [paymentModeWiseYears, setPaymentModeWiseYears] = useState([]);

	useEffect(() => {
		if (year === "All" && month === "All") setPaymentModeWiseDays(fixedDays);
		else if (month !== "All") {
			const tempYear = year === "All" ? 2020 : +year;
			const daysCount = new Date(
				tempYear,
				months.indexOf(month) + 1,
				0
			).getDate();
			setPaymentModeWiseDays(
				Array.from(Array(daysCount).keys())
					.map((i) => i + 1)
					.map((i) => i.toString())
					.map((i) => (i.length === 1 ? `0${i}` : i))
			);
		}
	}, [month, year]);

	useEffect(() => {
		if (+day === 31) setPaymentModeWiseMonths(_31DaysMonths);
		else if (+day === 30) setPaymentModeWiseMonths(_30DaysMonths);
		else if (+day === 29) {
			const tempYear = isNaN(+year) ? 2020 : +year;
			if (leapYear(tempYear)) setPaymentModeWiseMonths(months);
			else setPaymentModeWiseMonths(_30DaysMonths);
		} else setPaymentModeWiseMonths(months);
	}, [day, year]);

	useEffect(() => {
		setPaymentModeWiseYears(
			Object.keys(yearWiseExpense).sort((a, b) => b - a)
		);
		if (day === "29" && month === "February")
			setPaymentModeWiseYears(
				paymentModeWiseYears.filter((year) => leapYear(+year))
			);
	}, [Object.keys(yearWiseExpense).length, month, day]);

	const leapYear = (year) =>
		(year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

	return (
		<Drawer
			position="right"
			opened={paymentModeWiseFilterOpened}
			onClose={() => setPaymentModeWiseFilterOpened(false)}
			title="PaymentMode Wise Expense Filters"
			padding="xl"
			size={350}
			style={{ zIndex: 1000, opacity: 0.95 }}
		>
			<Group style={{ width: "100%" }}>
				<Select
					data-autofocus
					size="xs"
					style={{ width: "100%" }}
					data={["All", ...paymentModeWiseYears]}
					label="Select a Year"
					value={year}
					onChange={(value) => handleAppliedFilters(value, "year")}
				/>
				<Select
					size="xs"
					style={{ width: "100%" }}
					data={["All", ...paymentModeWiseMonths]}
					label="Select a Month"
					value={month}
					onChange={(value) => handleAppliedFilters(value, "month")}
				/>
				<Select
					size="xs"
					style={{ width: "100%" }}
					data={["All", ...paymentModeWiseDays]}
					label="Select a Day"
					value={day}
					onChange={(value) => handleAppliedFilters(value, "day")}
				/>
				<Select
					size="xs"
					style={{ width: "100%" }}
					data={["All", ...chartCategories]}
					label="Select a Category"
					value={category}
					onChange={(value) => handleAppliedFilters(value, "category")}
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

export default PaymentModeWiseFilterDrawer;
