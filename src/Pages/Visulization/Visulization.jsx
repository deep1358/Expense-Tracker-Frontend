import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import CategoryWiseExpenseForChart from "../../Components/CategoryWiseExpenseForChart/CategoryWiseExpenseForChart";
import DayWiseExpenseForChart from "../../Components/DayWiseExpenseForChart/DayWiseExpenseForChart";
import MonthWiseExpenseForChart from "../../Components/MonthWiseExpenseForChart/MonthWiseExpenseForChart";
import YearWiseExpenseForChart from "../../Components/YearWiseExpenseForChart/YearWiseExpenseForChart";

const Visulization = () => {
	const { user } = useSelector((state) => state.user);
	const { yearWiseExpense } = useSelector((state) => state.expense);

	const [chartCategories, setChartCategories] = useState([]);

	useEffect(() => {
		if (user) setChartCategories(user.categories);
	}, [user]);

	return (
		<>
			<CategoryWiseExpenseForChart yearWiseExpense={yearWiseExpense} />
			<DayWiseExpenseForChart
				chartCategories={chartCategories}
				yearWiseExpense={yearWiseExpense}
			/>
			<MonthWiseExpenseForChart
				chartCategories={chartCategories}
				yearWiseExpense={yearWiseExpense}
			/>
			<YearWiseExpenseForChart chartCategories={chartCategories} />
		</>
	);
};

export default Visulization;
