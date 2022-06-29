import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addExpense } from "../../store/expense/ThunkFunctions/addExpense";
import { getExpense } from "../../store/expense/ThunkFunctions/getExpense";
import { updateExpense } from "../../store/expense/ThunkFunctions/updateExpense";
import { setFocusedExpense } from "../../store/expense/index";

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

const AddOrUpdateExpense = () => {
	const { user } = useSelector((state) => state.user);
	const { creatingExpense, focusedExpense, updatingExpense } = useSelector(
		(state) => state.expense
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const currentDate = new Date();

	const [form, setForm] = useState({
		amount: 0,
		date: currentDate.toISOString().split("T")[0],
		category: "",
		note: "",
	});

	const { amount, date, category, note } = form;

	const { id } = useParams();

	// console.log("Page updated");

	useEffect(() => {
		// console.log(id);
		if (id !== undefined) {
			dispatch(getExpense(id));
			if (Object.keys(focusedExpense).length > 0)
				setForm({
					amount: focusedExpense.amount,
					date: "",
					category: focusedExpense.category,
					note: focusedExpense.note,
				});
		} else {
			setForm({
				amount: 0,
				date: currentDate.toISOString().split("T")[0],
				category: "",
				note: "",
			});
			dispatch(setFocusedExpense({}));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [Object.values(focusedExpense).length, id]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSaveOrUpdate = (e) => {
		e.preventDefault();
		if (id === undefined) {
			const year = date.split("-")[0];
			const month = date.split("-")[1];
			dispatch(
				addExpense({ form, year, month: months[month - 1], navigate })
			);
		} else
			dispatch(
				updateExpense({
					form,
					year: focusedExpense.year,
					month: months[focusedExpense.month - 1],
					id,
					navigate,
				})
			);
	};

	const handleAddMore = () => {
		const year = date.split("-")[0];
		const month = date.split("-")[1];
		dispatch(addExpense({ form, year, month: months[month - 1] }));
		setForm({
			amount: 0,
			date: currentDate.toISOString().split("T")[0],
			category: "",
			note: "",
		});
	};

	if (creatingExpense) return <div>Creating Expense</div>;
	if (updatingExpense) return <div>Updating Expense</div>;

	return (
		<form onSubmit={handleSaveOrUpdate}>
			{/* Form for adding expense */}
			<select
				required
				name="category"
				value={category}
				onChange={handleChange}
			>
				<option defaultValue="Select Category">Select Category</option>
				{user?.categories?.map((category, index) => (
					<option value={category} key={index}>
						{category}
					</option>
				))}
			</select>
			<input
				required
				value={amount}
				name="amount"
				onChange={handleChange}
				type="number"
				placeholder="Amount"
			/>
			{!id && (
				<input
					value={date}
					name="date"
					onChange={handleChange}
					type="date"
					placeholder="Date"
				/>
			)}
			<input
				value={note}
				name="note"
				onChange={handleChange}
				type="text"
				placeholder="Note"
			/>
			{!Object.keys(focusedExpense).length > 0 && (
				<button onClick={handleAddMore}>Add More</button>
			)}
			<button type="submit">Save</button>
		</form>
	);
};

export default AddOrUpdateExpense;
