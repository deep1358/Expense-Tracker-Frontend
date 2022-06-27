import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getMonthWiseExpenses } from "../../store/expense/ThunkFunctions/getMonthWiseExpenses";
import { setCurrentYear } from "../../store/expense";

const MonthWiseExpense = () => {
	const dispatch = useDispatch();
	const { monthWiseExpenses, isGettingMonthWiseExpenses } = useSelector(
		(state) => state.expense
	);
	const { user } = useSelector((state) => state.user);

	const { year } = useParams();

	useEffect(() => {
		dispatch(setCurrentYear(year));
		user && dispatch(getMonthWiseExpenses(year));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	if (isGettingMonthWiseExpenses) return <div>Getting Expenses...</div>;
	return (
		<div>
			{Object.keys(monthWiseExpenses)?.map((expense, index) => (
				<Link
					style={{ margin: "10px" }}
					key={index}
					to={`/year/${year}/${expense}`}
				>
					{expense}: {monthWiseExpenses[expense]}
				</Link>
			))}
		</div>
	);
};

export default MonthWiseExpense;
