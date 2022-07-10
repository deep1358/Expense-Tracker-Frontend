import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getMonthWiseExpense } from "../../store/expense/ThunkFunctions/getMonthWiseExpense";
import { setCurrentYear } from "../../store/expense";

const MonthWiseExpense = () => {
	const dispatch = useDispatch();
	const { monthWiseExpense, gettingMonthWiseExpense } = useSelector(
		(state) => state.expense
	);
	const { user } = useSelector((state) => state.user);

	const { year } = useParams();

	useEffect(() => {
		dispatch(setCurrentYear(year));
		user && dispatch(getMonthWiseExpense(year));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	if (gettingMonthWiseExpense) return <div>Getting Expenses...</div>;
	return (
		<div>
			{Object.keys(monthWiseExpense)?.map((expense, index) => (
				<Link
					style={{ margin: "10px" }}
					key={index}
					to={`/year/${year}/${expense}`}
				>
					{expense}: {monthWiseExpense[expense]}
				</Link>
			))}
		</div>
	);
};

export default MonthWiseExpense;
