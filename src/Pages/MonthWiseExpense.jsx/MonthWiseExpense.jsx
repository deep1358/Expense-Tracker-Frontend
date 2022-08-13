import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getMonthWiseExpense } from "../../store/expense/ThunkFunctions/getMonthWiseExpense";
import ExpenseCard from "../../Components/ExpenseCard/ExpenseCard";
import { Container, Group } from "@mantine/core";
import ExpenseCardSkeleton from "../../Components/ExpenseCard/ExpenseCardSkeleton";

const MonthShortNames = [
	"JAN",
	"FEB",
	"MAR",
	"APR",
	"MAY",
	"JUNE",
	"JULY",
	"AUG",
	"SEP",
	"OCT",
	"NOV",
	"DEC",
];

const MonthWiseExpense = () => {
	const dispatch = useDispatch();
	const { monthWiseExpense, gettingMonthWiseExpense, currentYear } =
		useSelector((state) => state.expense);

	const navigate = useNavigate();

	const { year } = useParams();

	useEffect(() => {
		if (!isNaN(year) && +year > 99) {
			dispatch(getMonthWiseExpense(year));
		} else {
			navigate(`/years/${currentYear}`);
		}
	}, [navigate]);

	return (
		<Container size="xl">
			<Group mb="xs" position="center">
				{gettingMonthWiseExpense
					? [...Array(12)].map((_, index) => (
							<ExpenseCardSkeleton key={index} />
					  ))
					: Object.entries(monthWiseExpense)?.map(
							([month, amount], index) => (
								<ExpenseCard
									key={index}
									name={MonthShortNames[index]}
									amount={amount}
									month={month}
									year={year}
								/>
							)
					  )}
			</Group>
		</Container>
	);
};

export default MonthWiseExpense;
