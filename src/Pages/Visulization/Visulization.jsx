import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import CategoryWiseExpenseViz from "../../Components/CategoryWiseExpenseViz/CategoryWiseExpenseViz";
import DayWiseExpenseViz from "../../Components/DayWiseExpenseViz/DayWiseExpenseViz";
import MonthWiseExpenseViz from "../../Components/MonthWiseExpenseViz/MonthWiseExpenseViz";
import YearWiseExpenseViz from "../../Components/YearWiseExpenseViz/YearWiseExpenseViz";

const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const _31DaysMonths = [
	"January",
	"March",
	"May",
	"July",
	"August",
	"October",
	"December",
];
const _30DaysMonths = [
	"January",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const fixedDays = [
	"01",
	"02",
	"03",
	"04",
	"05",
	"06",
	"07",
	"08",
	"09",
	"10",
	"11",
	"12",
	"13",
	"14",
	"15",
	"16",
	"17",
	"18",
	"19",
	"20",
	"21",
	"22",
	"23",
	"24",
	"25",
	"26",
	"27",
	"28",
	"29",
	"30",
	"31",
];

const Visulization = () => {
	const { user } = useSelector((state) => state.user);
	const { yearWiseExpenses } = useSelector((state) => state.expense);

	const [vizCategories, setVizCategories] = useState([]);

	useEffect(() => {
		if (user) setVizCategories(user.categories);
	}, [user]);

	return (
		<>
			<CategoryWiseExpenseViz
				months={months}
				fixedDays={fixedDays}
				_30DaysMonths={_30DaysMonths}
				_31DaysMonths={_31DaysMonths}
				yearWiseExpenses={yearWiseExpenses}
			/>
			<DayWiseExpenseViz
				vizCategories={vizCategories}
				months={months}
				yearWiseExpenses={yearWiseExpenses}
			/>
			<MonthWiseExpenseViz
				vizCategories={vizCategories}
				fixedDays={fixedDays}
				yearWiseExpenses={yearWiseExpenses}
			/>
			<YearWiseExpenseViz
				vizCategories={vizCategories}
				months={months}
				fixedDays={fixedDays}
				_30DaysMonths={_30DaysMonths}
				_31DaysMonths={_31DaysMonths}
			/>
		</>
	);
};

export default Visulization;
