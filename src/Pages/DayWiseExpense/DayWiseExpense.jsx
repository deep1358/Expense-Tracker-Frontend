import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getExpenses } from "../../store/expense/ThunkFunctions/getExpenses";
import DayWiseExpenseTable from "../../Components/DayWiseExpense/DayWiseExpenseTable/DayWiseExpenseTable";
import {
	Container,
	ScrollArea,
	Stack,
	Group,
	Menu,
	UnstyledButton,
	Image,
	Text,
} from "@mantine/core";
import { showAlert, toggleLoadingOverlay } from "../../store/utils";
import DeleteExpenseConfirmModal from "../../Components/DayWiseExpense/DeleteExpenseConfirmModal/DeleteExpenseConfirmModal";
import ViewExpenseModal from "../../Components/DayWiseExpense/ViewExpenseModal/ViewExpenseModal";
import { checkMonthValidity } from "../../utils/CheckMonthValidity";
import { Selector } from "tabler-icons-react";
import { useStyles } from "./DayWiseExpense.style";

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

	const [_categoryOpened, setCategoryOpened] = useState(false);
	const [paymentModeOpened, setPaymentModeOpened] = useState(false);

	const { classes } = useStyles({ paymentModeOpened });

	const { expenses, deletingExpense } = useSelector((state) => state.expense);
	const { user } = useSelector((state) => state.user);
	const { months, payment_modes } = useSelector((state) => state.utils);

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

	const categoryItems = ["All", ...user?.categories].map((item) => (
		<Menu.Item onClick={() => setCategoryExpense(item)} key={item}>
			<Text className={classes.label}>{item}</Text>
		</Menu.Item>
	));

	const paymentModeItems = [{ label: "All" }, ...payment_modes].map((item) => (
		<Menu.Item
			icon={
				item.image && (
					<Image src={item.image} fit="contain" width={20} height={20} />
				)
			}
			onClick={() => setPaymentModeExpense(item)}
			key={item.label}
		>
			<Text className={classes.label}>{item.label}</Text>
		</Menu.Item>
	));

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
					<Group position="right">
						{expenses?.length > 0 && (
							<>
								<Stack spacing={2}>
									<Text className={classes.placeHolder}>
										Filter by Category
									</Text>
									<Menu
										onOpen={() => setCategoryOpened(true)}
										onClose={() => setCategoryOpened(false)}
										radius="sm"
										width="target"
									>
										<Menu.Target>
											<UnstyledButton className={classes.control}>
												<Text className={classes.label}>
													{categoryExpense}
												</Text>
												<Selector size={16} />
											</UnstyledButton>
										</Menu.Target>
										<Menu.Dropdown>
											<ScrollArea
												style={{
													height: 40 * categoryItems.length + 1,
													maxHeight: 250,
													minHeight: "fit-content",
												}}
											>
												{categoryItems}
											</ScrollArea>
										</Menu.Dropdown>
									</Menu>
								</Stack>
								<Stack spacing={2}>
									<Text className={classes.placeHolder}>
										Filter by Payment mode
									</Text>
									<Menu
										onOpen={() => setPaymentModeOpened(true)}
										onClose={() => setPaymentModeOpened(false)}
										radius="sm"
										width="target"
									>
										<Menu.Target>
											<UnstyledButton className={classes.control}>
												<Group spacing="xs">
													{paymentModeExpense.image && (
														<Image
															src={paymentModeExpense.image}
															width={25}
															height={25}
															fit="contain"
														/>
													)}
													<Text className={classes.label}>
														{paymentModeExpense.label}
													</Text>
												</Group>
												<Selector size={16} />
											</UnstyledButton>
										</Menu.Target>
										<Menu.Dropdown>
											<ScrollArea style={{ height: 250 }}>
												{paymentModeItems}
											</ScrollArea>
										</Menu.Dropdown>
									</Menu>
								</Stack>
							</>
						)}
					</Group>
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
