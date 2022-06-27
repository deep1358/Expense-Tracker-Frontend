import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getYearWiseExpenses } from "../../store/expense/ThunkFunctions/getYearWiseExpenses";
import { Link } from "react-router-dom";

const YearWiseExpense = () => {
	const dispatch = useDispatch();
	const { yearWiseExpenses, isGettingYearWiseExpenses } = useSelector(
		(state) => state.expense
	);
	const { user } = useSelector((state) => state.user);

	useEffect(() => {
		user && dispatch(getYearWiseExpenses());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	if (isGettingYearWiseExpenses) return <div>Getting Expenses...</div>;
	return (
		<div>
			{Object.keys(yearWiseExpenses)?.map((expense, index) => (
				<Link
					style={{ margin: "10px" }}
					key={index}
					to={`/year/${expense}`}
				>
					{expense}: {yearWiseExpenses[expense]}
				</Link>
			))}
		</div>
	);
};

export default YearWiseExpense;
