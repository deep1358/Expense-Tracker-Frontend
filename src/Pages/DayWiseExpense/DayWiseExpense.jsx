import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	Link,
	useLocation,
	useParams,
	useSearchParams,
} from "react-router-dom";
import { getExpenses } from "../../store/expense/ThunkFunctions/getExpenses";
import { addExpense } from "../../store/expense/ThunkFunctions/addExpense";
import { setCurrentMonth } from "../../store/expense/index";
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
	const expense = useSelector((state) => state.expense);
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const { year, month } = useParams();

	const currentDate = new Date();

	const [form, setForm] = useState({
		amount: 0,
		date: currentDate.toISOString().split("T")[0],
		category: "",
		note: "",
	});

	const { amount, date, category, note } = form;

	const { search } = useSearchParams();

	useEffect(() => {
		dispatch(getExpenses([year, month]));
		// console.log(months.indexOf(month), year, month);
		dispatch(setCurrentMonth(months.indexOf(month) + 1));
		console.log(expense.expense);
		// eslint-disable-next-line react-hooks/exhaustive-deps
		console.log(year, month);
	}, [search]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// console.log(form);
		dispatch(addExpense(form));
	};

	const handleDelete = (id) => {
		dispatch(deleteExpense(id));
	};

	return (
		<div>
			<Link to="/year/2022/June">June </Link>
			<Link to="/year/2022/May">May</Link>
			<form>
				{/* Form for adding expense */}
				<select name="category" value={category} onChange={handleChange}>
					<option defaultValue="Select Category">Select Category</option>
					{user?.categories?.map((category, index) => (
						<option value={category} key={index}>
							{category}
						</option>
					))}
				</select>
				<input
					value={amount}
					name="amount"
					onChange={handleChange}
					type="number"
					placeholder="Amount"
				/>
				<input
					value={date}
					name="date"
					onChange={handleChange}
					type="date"
					placeholder="Date"
				/>
				<input
					value={note}
					name="note"
					onChange={handleChange}
					type="text"
					placeholder="Note"
				/>
				<button onClick={handleSubmit}>Add Expense</button>
			</form>
			{expense?.expense?.map((expense, index) => (
				<div key={index}>
					<p>{expense.category}</p>
					<p>{expense.amount}</p>
					<p>{expense.year}</p>
					<p>{expense.month}</p>
					<p>{expense.date}</p>
					<p>{expense.note}</p>
					<button onClick={() => handleDelete(expense._id)}>Delete</button>
				</div>
			))}
		</div>
	);
};

export default DayWiseExpense;
