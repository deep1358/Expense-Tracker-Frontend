import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	useNavigate,
	// Link,
	useParams,
	// useSearchParams,
} from "react-router-dom";
import { getExpenses } from "../../store/expense/ThunkFunctions/getExpenses";
import { setCurrentMonth, setCurrentYear } from "../../store/expense/index";
import { deleteExpense } from "../../store/expense/ThunkFunctions/deleteExpense";

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

const DayWiseExpense = () => {
	const { expenses, gettingExpenses, deletingExpense } = useSelector(
		(state) => state.expense
	);
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const { year, month } = useParams();

	const navigate = useNavigate();

	useEffect(() => {
		dispatch(setCurrentMonth(months.indexOf(month) + 1));
		dispatch(setCurrentYear(year));
		user && dispatch(getExpenses([year, month]));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	const handleDelete = (id) => {
		dispatch(deleteExpense(id));
	};

	const handleUpdate = (id) => {
		navigate(`/updateExpense/${id}`);
	};

	if (gettingExpenses) return <div>Getting Expense</div>;
	if (deletingExpense) return <div>Deleting Expense</div>;

	return (
		<div>
			{expenses?.map((expense, index) => (
				<div key={index}>
					<p>{expense.category}</p>
					<p>{expense.amount}</p>
					<p>{expense.year}</p>
					<p>{expense.month}</p>
					<p>{expense.day}</p>
					<p>{expense.note}</p>
					<button onClick={() => handleDelete(expense._id)}>Delete</button>
					<button onClick={() => handleUpdate(expense._id)}>Update</button>
				</div>
			))}
		</div>
	);
};

export default DayWiseExpense;
