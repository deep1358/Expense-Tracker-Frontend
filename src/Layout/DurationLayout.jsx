import React, { useEffect, useState } from "react";
import Breadcrumb from "../Components/Breadcrumb/Breadcrumb";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentMonth, setCurrentYear } from "../store/expense";
import { checkMonthValidity } from "../utils/CheckMonthValidity";

const DurationLayout = () => {
	const [crumbItems, setCrumbItems] = useState([]);
	const [activeLinkIndex, setActiveLinkIndex] = useState("");

	const location = useLocation();
	const dispatch = useDispatch();

	const { currentMonth, currentYear } = useSelector((state) => state.expense);
	const { months } = useSelector((state) => state.utils);
	const navigate = useNavigate();

	useEffect(() => {
		const paths = location.pathname.split("/").slice(1);
		let year = currentYear;
		let month = paths[2] ? paths[2] : months[currentMonth - 1];

		if (paths[1] && !isNaN(paths[1]) && +paths[1] > 99) {
			year = paths[1];
			dispatch(setCurrentYear(year));
		}

		if (paths[2]) {
			const validMonth = checkMonthValidity(paths[2], months);
			if (validMonth) {
				dispatch(setCurrentMonth(months.indexOf(validMonth) + 1));
				month = validMonth;

				if (month !== months[paths[2] - 1])
					navigate(`/years/${year}/${month}`);
			}
		}

		setActiveLinkIndex(paths.length - 1);

		setCrumbItems([
			{
				label: "Years",
				to: "/years",
			},
			{
				label: year,
				to: `/years/${year}`,
			},
			{
				label: month,
				to: `/years/${year}/${month}`,
			},
		]);
	}, [location.pathname.length]);

	return (
		<>
			<Breadcrumb
				crumbItems={crumbItems}
				activeLinkIndex={activeLinkIndex}
			/>
			<Outlet />
		</>
	);
};

export default DurationLayout;
