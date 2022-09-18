import { memo, useEffect, useState } from "react";
import { Navbar, Stack, Tooltip } from "@mantine/core";
import {
	ArrowBarLeft,
	ArrowBarRight,
	X,
	Apps,
	Wallet,
	Coin,
	CirclePlus,
} from "tabler-icons-react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import useStyles from "./LeftNavbar.style";

const LeftNavbar = ({ opened, setOpened, smallerScreen }) => {
	const { classes, cx } = useStyles({ opened, smallerScreen });
	const [activeNavLink, setActiveNavLink] = useState("");

	const location = useLocation();
	const { currentMonth, currentYear } = useSelector((state) => state.expense);

	const { months } = useSelector((state) => state.utils);

	useEffect(() => {
		setActiveNavLink(location.pathname);
	});

	const data = [
		{
			label: "My Expenses",
			link: `/years/${currentYear}/${months[currentMonth - 1]}`,
			icon: Coin,
		},
		{
			label: "Add Expense",
			link: "/addExpense",
			icon: CirclePlus,
		},
		{
			label: "My Categories",
			link: "/categories",
			icon: Apps,
		},
		{
			label: "My Payment Modes",
			link: "/payment_modes",
			icon: Wallet,
		},
	];

	const links = data.map((item) =>
		!opened && !smallerScreen ? (
			<Tooltip
				arrowSize={10}
				openDelay={100}
				withArrow
				position="right"
				key={item.label}
				label={item.label}
			>
				<Link
					className={cx(classes.link, {
						[classes.linkActive]: item.link.includes(activeNavLink),
					})}
					to={item.link}
					onClick={() => {
						setOpened((pre) => {
							if (smallerScreen) return false;
							return pre;
						});
						setActiveNavLink(item.link);
					}}
				>
					<item.icon className={classes.linkIcon} />
					{opened && <span>{item.label}</span>}
				</Link>
			</Tooltip>
		) : (
			<Link
				className={cx(classes.link, {
					[classes.linkActive]: item.link.includes(activeNavLink),
				})}
				key={item.label}
				to={item.link}
				onClick={() => {
					setOpened((pre) => {
						if (smallerScreen) return false;
						return pre;
					});
					setActiveNavLink(item.link);
				}}
			>
				<item.icon className={classes.linkIcon} />
				{opened && <span>{item.label}</span>}
			</Link>
		)
	);

	return (
		<Stack className={classes.stack}>
			<Navbar.Section grow>{links}</Navbar.Section>
			<Navbar.Section className={classes.footer}>
				<Tooltip
					arrowSize={10}
					openDelay={100}
					withArrow
					position="right"
					label="Open Sidebar"
				>
					<a
						href="#"
						className={classes.footerLink}
						onClick={(event) => {
							event.preventDefault();
							setOpened((pre) => !pre);
						}}
					>
						{smallerScreen ? (
							<X className={classes.linkIcon}></X>
						) : opened ? (
							<ArrowBarLeft className={classes.linkIcon} />
						) : (
							<ArrowBarRight className={classes.linkIcon} />
						)}
						{opened && (
							<span>
								{smallerScreen ? "Close Sidebar" : "Collapse Sidebar"}
							</span>
						)}
					</a>
				</Tooltip>
			</Navbar.Section>
		</Stack>
	);
};

export default memo(LeftNavbar);
