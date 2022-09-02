import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getExpenses } from "../../store/expense/ThunkFunctions/getExpenses";
import DayWiseExpenseTable from "../../Components/DayWiseExpense/DayWiseExpenseTable/DayWiseExpenseTable";
import { Container, ScrollArea, Stack } from "@mantine/core";
import { showAlert, toggleLoadingOverlay } from "../../store/utils";
import DeleteExpenseConfirmModal from "../../Components/DayWiseExpense/DeleteExpenseConfirmModal/DeleteExpenseConfirmModal";
import ViewExpenseModal from "../../Components/DayWiseExpense/ViewExpenseModal/ViewExpenseModal";
import { checkMonthValidity } from "../../utils/CheckMonthValidity";
import FilterButtons from "../../Components/DayWiseExpense/FilterButtons/FilterButtons";

const DayWiseExpense = () => {
	const [sortedData, setSortedData] = useState([]);
	const [sortBy, setSortBy] = useState(null);
	const [reverseSortDirection, setReverseSortDirection] = useState(false);

	const [categoryExpense, setCategoryExpense] = useState("All");
	const [paymentModeExpense, setPaymentModeExpense] = useState({
		label: "All",
	});

	const [deleteModalOpened, setDeleteModalOpened] = useState(false);
	const [deleteExpenseID, setDeleteExpenseID] = useState("");

	const [viewModalOpened, setViewModalOpened] = useState(false);
	const [viewExpenseID, setViewExpenseID] = useState("");

	const { expenses, deletingExpense } = useSelector((state) => state.expense);
	const { months } = useSelector((state) => state.utils);

	const dispatch = useDispatch();
	const { year, month } = useParams();

	useEffect(() => {
		setSortedData(expenses);
	}, [expenses]);

	useEffect(() => {
		const tempMonth = checkMonthValidity(month, months);

		if (!tempMonth)
			dispatch(
				showAlert({
					alertMessage: "Invalid Month",
				})
			);
		else dispatch(getExpenses([year, tempMonth]));
	}, []);

	useEffect(() => {
		dispatch(toggleLoadingOverlay(deletingExpense));
	}, [deletingExpense]);

	useEffect(() => {
		filterData();
	}, [categoryExpense, paymentModeExpense]);

	function filterData(data = expenses) {
		if (categoryExpense === "All" && paymentModeExpense.label === "All")
			return setSortedData(data);
		else if (categoryExpense === "All")
			return setSortedData(
				data.filter(
					(expense) => expense.payment_mode === paymentModeExpense.label
				)
			);
		else if (paymentModeExpense.label === "All")
			return setSortedData(
				data.filter((expense) => expense.category === categoryExpense)
			);
		else
			return setSortedData(
				data.filter(
					(expense) =>
						expense.category === categoryExpense &&
						expense.payment_mode === paymentModeExpense.label
				)
			);
	}

	function sortData(data, payload) {
		const { sortBy, reversed } = payload;
		return filterData(
			data.slice().sort((a, b) => {
				if (reversed) {
					if (sortBy === "date") {
						return (
							new Date(b.year, b.month, b.day) -
							new Date(a.year, a.month, a.day)
						);
					} else if (sortBy === "amount") return b.amount - a.amount;
					return b[sortBy].localeCompare(a[sortBy]);
				}
				if (sortBy === "date") {
					return (
						new Date(a.year, a.month, a.day) -
						new Date(b.year, b.month, b.day)
					);
				} else if (sortBy === "amount") return a.amount - b.amount;
				return a[sortBy].localeCompare(b[sortBy]);
			})
		);
	}

	return (
		<>
			<DeleteExpenseConfirmModal
				deleteModalOpened={deleteModalOpened}
				setDeleteModalOpened={setDeleteModalOpened}
				deleteExpenseID={deleteExpenseID}
			/>
			<ViewExpenseModal
				viewModalOpened={viewModalOpened}
				setViewModalOpened={setViewModalOpened}
				viewExpenseID={viewExpenseID}
				setViewExpenseID={setViewExpenseID}
				setDeleteModalOpened={setDeleteModalOpened}
				setDeleteExpenseID={setDeleteExpenseID}
			/>
			<Container style={{ marginTop: "-2vh" }}>
				<Stack align="flex-end">
					<FilterButtons
						categoryExpense={categoryExpense}
						setCategoryExpense={setCategoryExpense}
						paymentModeExpense={paymentModeExpense}
						setPaymentModeExpense={setPaymentModeExpense}
					/>
					<ScrollArea sx={{ height: "calc(75vh - 70px)", width: "100%" }}>
						<DayWiseExpenseTable
							sortedData={sortedData}
							setSortedData={setSortedData}
							sortData={sortData}
							sortBy={sortBy}
							setSortBy={setSortBy}
							reverseSortDirection={reverseSortDirection}
							setReverseSortDirection={setReverseSortDirection}
							setDeleteExpenseID={setDeleteExpenseID}
							setDeleteModalOpened={setDeleteModalOpened}
							setViewExpenseID={setViewExpenseID}
							setViewModalOpened={setViewModalOpened}
						/>
					</ScrollArea>
				</Stack>
			</Container>
		</>
	);
};

export default DayWiseExpense;
