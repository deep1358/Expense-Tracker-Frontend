import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logoutUser } from "../../store/user/ThunkFunctions/logoutUser";
import useStyles from "./Navbar.style";
import { Avatar, Menu } from "@mantine/core";
import { Anchor } from "@mantine/core";
import { Text } from "@mantine/core";
import {
	createStyles,
	Header,
	Container,
	Group,
	Burger,
	Paper,
	Transition,
} from "@mantine/core";
import { useBooleanToggle } from "@mantine/hooks";
import { useDisclosure } from "@mantine/hooks";

const Navbar = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.user);
	const { currentMonth, currentYear } = useSelector((state) => state.expense);

	const { months } = useSelector((state) => state.utils);

	const [menuOpened, handlers] = useDisclosure(false);

	// const { classes } = useStyles();

	const HEADER_HEIGHT = 60;

	const useStyles = createStyles((theme) => ({
		root: {
			position: "relative",
			zIndex: 1,
		},

		header: {
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
			height: "100%",
		},
		links: {
			[theme.fn.smallerThan("md")]: {
				display: "none",
			},
		},

		link: {
			display: "block",
			lineHeight: 1,
			// padding: "8px 12px",
			borderRadius: theme.radius.sm,
			textDecoration: "none",
			color:
				theme.colorScheme === "dark"
					? theme.colors.dark[0]
					: theme.colors.gray[7],
			fontSize: theme.fontSizes.sm,
			fontWeight: 500,

			"&:hover": {
				backgroundColor:
					theme.colorScheme === "dark"
						? theme.colors.dark[6]
						: theme.colors.gray[0],
			},

			[theme.fn.smallerThan("sm")]: {
				borderRadius: 0,
				padding: theme.spacing.md,
			},
		},

		linkActive: {
			"&, &:hover": {
				backgroundColor:
					theme.colorScheme === "dark"
						? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
						: theme.colors[theme.primaryColor][0],
				color: theme.colors[theme.primaryColor][
					theme.colorScheme === "dark" ? 3 : 7
				],
			},
		},

		Text: {
			fontSize: "2rem",
			fontFamily: "Rubik Moonrocks, cursive",
			textDecoration: "none",
		},

		avatar: {
			[theme.fn.smallerThan("md")]: {
				display: "none",
			},
		},

		menu: {
			[theme.fn.largerThan("md")]: {
				display: "none",
			},
			cursor: "pointer",
		},
	}));

	const links = [
		{
			label: "Add Expense",
			link: "/addExpense",
		},
		{
			label: "My Categories",
			link: "/categories",
		},
		{
			label: "Visualize your data",
			link: "/visulization",
		},
	];

	const { classes, cx } = useStyles();

	const location = useLocation();
	const [active, setActive] = useState("");

	useEffect(() => {
		setActive(location.pathname);
	});

	const items = links.map((link) => (
		<Anchor
			component={Link}
			to={link.link}
			key={link.label}
			className={cx(classes.link, {
				[classes.linkActive]: active === link.link,
			})}
			onClick={() => {
				setActive(link.link);
			}}
		>
			{link.label}
		</Anchor>
	));

	if (user)
		return (
			<Header height={HEADER_HEIGHT} mb={30} className={classes.root}>
				<Container size="xl" className={classes.header}>
					<Text
						className={classes.Text}
						weight={700}
						size="xl"
						transform="uppercase"
					>
						Expense Tracker
					</Text>

					<Group spacing={5} className={classes.links}>
						{items}
					</Group>

					<Avatar
						className={classes.avatar}
						size="md"
						src="https://lh3.googleusercontent.com/a-/AFdZucpZhHrhJV6uDqTe0mLecr0vUxHjpu_ADWbQ1w1YHg=s96-c"
						alt="no image here"
						color="indigo"
						radius="xl"
					/>

					<Menu
						className={classes.menu}
						control={
							<Avatar
								size="md"
								src="https://lh3.googleusercontent.com/a-/AFdZucpZhHrhJV6uDqTe0mLecr0vUxHjpu_ADWbQ1w1YHg=s96-c"
								alt="no image here"
								color="indigo"
								radius="xl"
							/>
						}
						opened={menuOpened}
						onOpen={handlers.open}
						onClose={handlers.close}
					>
						{/* {items.map((item) => (
							<Menu.Item key={item.key}>{item}</Menu.Item>
						))} */}
						{/* <Menu.Item>Transfer my data</Menu.Item>
						<Menu.Item color="red">Delete my account</Menu.Item> */}
					</Menu>
				</Container>
			</Header>
		);
	else return <p>Loading...</p>;
};

export default Navbar;

// <p>{user.userName}</p>
// <button onClick={() => dispatch(logoutUser())}>Logout</button>
// <Anchor component={Link} to="year">
// 	React router link
// </Anchor>
// <button>
// 	<Link to="/year">Year</Link>
// </button>
// <button>
// 	<Link to={`/year/${currentYear}`}>{currentYear}</Link>
// </button>
// <button>
// 	<Link to={`/year/${currentYear}/${months[currentMonth - 1]}`}>
// 		{months[currentMonth - 1]}
// 	</Link>
// </button>
// <button>
// 	<Link to="addExpense">Add Expense</Link>
// </button>
// <button>
// 	<Link to="categories">My Categories</Link>
// </button>
// <button>
// 	<Link to="visulization">Vizulization</Link>
// </button>
