import { Group } from "@mantine/core";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import CategoryFilterButton from "./CategoryFilterButton/CategoryFilterButton";
import PaymentModeButton from "./PaymentModeFilterButton/PaymentModeButton";

const FilterButtons = ({
	categoryExpense,
	setCategoryExpense,
	paymentModeExpense,
	setPaymentModeExpense,
}) => {
	const { expenses } = useSelector((state) => state.expense);

	return (
		<Group position="right">
			{expenses?.length > 0 && (
				<>
					<CategoryFilterButton
						categoryExpense={categoryExpense}
						setCategoryExpense={setCategoryExpense}
					/>
					<PaymentModeButton
						paymentModeExpense={paymentModeExpense}
						setPaymentModeExpense={setPaymentModeExpense}
					/>
				</>
			)}
		</Group>
	);
};

export default memo(FilterButtons);
