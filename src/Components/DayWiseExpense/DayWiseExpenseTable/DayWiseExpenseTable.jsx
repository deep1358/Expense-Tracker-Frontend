import React, { memo } from "react";
import { useMediaQuery } from "@mantine/hooks";
import {
	Table,
	UnstyledButton,
	Group,
	Text,
	Center,
	Button,
	ActionIcon,
	Stack,
	Image,
	Menu,
} from "@mantine/core";
import {
	Trash,
	Pencil,
	Selector,
	ChevronDown,
	ChevronUp,
	Eye,
	DotsVertical,
} from "tabler-icons-react";
import { useStyles } from "./DayWiseExpenseTable.style";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DayWiseExpenseTableSkeleton from "./DayWiseExpenseTableSkeleton";

const DayWiseExpenseTable = ({
	sortedData,
	sortData,
	sortBy,
	setSortBy,
	reverseSortDirection,
	setReverseSortDirection,
	setDeleteModalOpened,
	setDeleteExpenseID,
	setViewModalOpened,
	setViewExpenseID,
}) => {
	const smallerScreen = useMediaQuery("(max-width: 530px)");
	const inBetweenScreen = useMediaQuery("(max-width: 770px)");

	const { classes } = useStyles();

	const { expenses, gettingExpenses } = useSelector((state) => state.expense);

	function Th({ children, reversed, sorted, onSort }) {
		const { classes } = useStyles();
		const Icon = sorted ? (reversed ? ChevronUp : ChevronDown) : Selector;
		return (
			<th className={classes.th}>
				<UnstyledButton onClick={onSort} className={classes.control}>
					<Group position="center">
						<Text weight={500} size={smallerScreen ? "xs" : "sm"}>
							{children}
						</Text>
						<Center>
							<Icon size={smallerScreen ? 12 : 14} />
						</Center>
					</Group>
				</UnstyledButton>
			</th>
		);
	}

	const ths = (
		<tr>
			<Th
				sorted={sortBy === "date"}
				reversed={reverseSortDirection}
				onSort={() => setSorting("date")}
			>
				Date
			</Th>
			<Th
				sorted={sortBy === "category"}
				reversed={reverseSortDirection}
				onSort={() => setSorting("category")}
			>
				Category Name
			</Th>
			<Th
				sorted={sortBy === "amount"}
				reversed={reverseSortDirection}
				onSort={() => setSorting("amount")}
			>
				Amount
			</Th>
			<th className={classes.th}>
				<Text weight={500} size={smallerScreen ? "xs" : "sm"}>
					Actions
				</Text>
			</th>
		</tr>
	);

	const navigate = useNavigate();

	const handleView = (id) => {
		setViewModalOpened(true);
		setViewExpenseID(id);
	};

	const handleDelete = (id) => {
		setDeleteModalOpened(true);
		setDeleteExpenseID(id);
	};

	const handleUpdate = (id) => {
		navigate(`/updateExpense/${id}`);
	};

	const rows = sortedData.map((expense, index) => (
		<tr key={index}>
			<td className={classes.td}>
				<Text
					weight={500}
					size="sm"
				>{`${expense.day} / ${expense.month} / ${expense.year}`}</Text>
			</td>
			<td className={classes.td}>
				<Text weight={500} size="sm">
					{expense.category}
				</Text>
			</td>
			<td className={classes.td}>
				<Text weight={500} size="sm">
					{`₹ ${expense.amount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
				</Text>
			</td>
			<td className={classes.td}>
				{!inBetweenScreen ? (
					<>
						<Button
							leftIcon={<Eye />}
							onClick={() => handleView(expense._id)}
							variant="filled"
							color="blue"
							mr="sm"
							size="xs"
						>
							View
						</Button>
						<Button
							leftIcon={<Pencil />}
							onClick={() => handleUpdate(expense._id)}
							variant="light"
							color="blue"
							mr="sm"
							size="xs"
						>
							Edit
						</Button>
						<Button
							onClick={() => handleDelete(expense._id)}
							leftIcon={<Trash />}
							variant="light"
							color="red"
							size="xs"
						>
							Delete
						</Button>
					</>
				) : (
					<Menu
						size="xs"
						className={classes.Menu}
						control={
							<ActionIcon variant="filled">
								<DotsVertical size={14} />
							</ActionIcon>
						}
					>
						<Menu.Item size="xs">
							<Group onClick={() => handleView(expense._id)}>
								<Eye size={16} /> <Text size="xs">View</Text>
							</Group>
						</Menu.Item>
						<Menu.Item>
							<Group onClick={() => handleUpdate(expense._id)}>
								<Pencil size={16} /> <Text size="xs">Edit</Text>
							</Group>
						</Menu.Item>
						<Menu.Item>
							<Group onClick={() => handleDelete(expense._id)}>
								<Trash size={16} /> <Text size="xs">Delete</Text>
							</Group>
						</Menu.Item>
					</Menu>
				)}
			</td>
		</tr>
	));

	const setSorting = (field) => {
		const reversed = field === sortBy ? !reverseSortDirection : false;
		setReverseSortDirection(reversed);
		setSortBy(field);
		sortData(expenses, { sortBy: field, reversed });
	};

	return (
		<>
			<Table highlightOnHover fontSize="sm">
				<thead className={classes.header}>{ths}</thead>
				<tbody>
					{gettingExpenses ? (
						<DayWiseExpenseTableSkeleton />
					) : (
						expenses?.length > 0 && rows
					)}
				</tbody>
			</Table>
			{!gettingExpenses && (expenses?.length < 1 || sortedData?.length < 1) && (
				<Stack mt="lg" align="center">
					<Image
						className={classes.noResultImage}
						src="/no-result.svg"
						alt="no-result"
					/>
					<Text color="grey">No Expense found</Text>
				</Stack>
			)}
		</>
	);
};

export default memo(DayWiseExpenseTable);
