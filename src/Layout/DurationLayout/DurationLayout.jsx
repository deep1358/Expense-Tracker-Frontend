import React, { useEffect, useState } from "react";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentMonth, setCurrentYear } from "../../store/expense";
import { checkMonthValidity } from "../../utils/CheckMonthValidity";
import { ActionIcon, Container, Tooltip } from "@mantine/core";
import DayChart from "../../Components/Charts/DayChart/DayChart";
import MonthChart from "../../Components/Charts/MonthChart/MonthChart";
import YearChart from "../../Components/Charts/YearChart/YearChart";
import { ChartBar } from "tabler-icons-react";
import { useStyles } from "./DurationLayout.style";

const DurationLayout = () => {
	const [crumbItems, setCrumbItems] = useState([]);
	const [activeLinkIndex, setActiveLinkIndex] = useState("");

	const [dayWiseFilterOpened, setDayWiseFilterOpened] = useState(false);
	const [monthWiseFilterOpened, setMonthWiseFilterOpened] = useState(false);
	const [yearWiseFilterOpened, setYearWiseFilterOpened] = useState(false);

	const location = useLocation();
	const dispatch = useDispatch();

	const { currentMonth, currentYear } = useSelector((state) => state.expense);
	const { months } = useSelector((state) => state.utils);
	const navigate = useNavigate();

	const { classes } = useStyles();

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

	const handleChartOpen = () => {
		const pathLength = location.pathname.split("/").length;

		if (pathLength === 4) {
			setDayWiseFilterOpened(true);
			setMonthWiseFilterOpened(false);
			setYearWiseFilterOpened(false);
		} else if (pathLength === 3) {
			setDayWiseFilterOpened(false);
			setMonthWiseFilterOpened(true);
			setYearWiseFilterOpened(false);
		} else if (pathLength === 2) {
			setDayWiseFilterOpened(false);
			setMonthWiseFilterOpened(false);
			setYearWiseFilterOpened(true);
		}
	};

	return (
		<Container size={1440}>
			<Breadcrumb
				crumbItems={crumbItems}
				activeLinkIndex={activeLinkIndex}
			/>

			<Tooltip
				className={classes.barIcon}
				label="Insights"
				withArrow
				arrowSize={5}
			>
				<ActionIcon onClick={handleChartOpen} variant="filled">
					<ChartBar size={16} />
				</ActionIcon>
			</Tooltip>
			<DayChart
				dayWiseFilterOpened={dayWiseFilterOpened}
				setDayWiseFilterOpened={setDayWiseFilterOpened}
			/>
			<MonthChart
				monthWiseFilterOpened={monthWiseFilterOpened}
				setMonthWiseFilterOpened={setMonthWiseFilterOpened}
			/>
			<YearChart
				yearWiseFilterOpened={yearWiseFilterOpened}
				setYearWiseFilterOpened={setYearWiseFilterOpened}
			/>
			<Outlet />
		</Container>
	);
};

export default DurationLayout;
