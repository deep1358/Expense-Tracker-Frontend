import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryWiseExpenseViz } from "../../store/expense/ThunkFunctions/getCategoryWiseExpenseViz";
import Barchart from "../../Components/BarChart/BarChart";

const Visulization = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.user);
	const { categoryWiseExpensesViz, gettingCategoryWiseExpensesViz } =
		useSelector((state) => state.expense);

	const [data, setData] = useState([]);

	useEffect(() => {
		if (user) {
			dispatch(getCategoryWiseExpenseViz(["2022", "All"]));
			setData(categoryWiseExpensesViz);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [categoryWiseExpensesViz.length, user, data]);

	return (
		<div style={{ width: "50vw", height: "80vh" }}>
			<button
				onClick={() => {
					dispatch(getCategoryWiseExpenseViz(["All", "7"]));
				}}
			>
				Click
			</button>
			{gettingCategoryWiseExpensesViz ? (
				<div>Loading...</div>
			) : (
				<Barchart data={categoryWiseExpensesViz} />
			)}
		</div>
	);
};

export default Visulization;
