import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import useStyles from "./Navbar.style";
import {
	Header,
	Container,
	Group,
	Burger,
	Paper,
	Transition,
	Image,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Apps, CirclePlus, ChartBar, Coin, Check, X } from "tabler-icons-react";
import { toggleLoadingOverlay } from "../../store/utils";
import DeleteUserConfirmModal from "./DeleteUserConfirmModal/DeleteUserConfirmModal";
import AvatarMenu from "./AvatarMenu/AvatarMenu";
import { signOut } from "firebase/auth";
import { Auth } from "../../firebase";
import { MakeUnAuthenticated, loggingOutToggler } from "../../store/user";
import { showNotification } from "@mantine/notifications";

const Navbar = () => {
	const dispatch = useDispatch();

	const { deletingUser, loggingOut } = useSelector((state) => state.user);

	const { currentMonth, currentYear } = useSelector((state) => state.expense);

	const { months } = useSelector((state) => state.utils);

	const smallScreen = useMediaQuery("(max-width: 576px)");

	const { classes, cx } = useStyles();

	const location = useLocation();

	const [burgerOpened, burgerToggleOpened] = useState(false);

	const [deleteConfirmBoxOpened, deleteConfirmBoxToggleOpened] =
		useState(false);

	const [activeNavLink, setNavLinkActive] = useState("");

	const links = [
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
			label: "Visualize your data",
			link: "/visualization",
			icon: ChartBar,
		},
	];

	useEffect(() => {
		setNavLinkActive(location.pathname);
	});

	useEffect(() => {
		dispatch(toggleLoadingOverlay(loggingOut || deletingUser));
	}, [loggingOut, deletingUser]);

	const items = links.map((link) => (
		<Link
			key={link.label}
			to={link.link}
			className={cx(classes.link, {
				[classes.linkActive]: link.link.includes(activeNavLink),
			})}
			onClick={() => {
				setNavLinkActive(link.link);
				burgerToggleOpened(false);
			}}
		>
			<link.icon className={classes.linkIcon} />
			<span>{link.label}</span>
		</Link>
	));

	const handleLogoutUser = (message) => {
		dispatch(loggingOutToggler(true));
		// get current seconds since epoch to use as a unique id
		const getCurrentSeconds = () => Math.floor(Date.now() / 1000);
		signOut(Auth)
			.then(() => {
				if (message) {
					// Sign-out successful.
					dispatch(MakeUnAuthenticated());
					showNotification({
						id: `logout-${getCurrentSeconds()}`,
						message,
						color: "teal",
						icon: <Check size={15} />,
					});
				}
			})
			.catch((error) => {
				// An error happened.
				showNotification({
					id: `logout-${getCurrentSeconds()}`,
					message: error.message || "Something went wrong",
					color: "red",
					icon: <X size={15} />,
				});
			})
			.finally(() => {
				dispatch(loggingOutToggler(false));
			});
	};

	return (
		<>
			<DeleteUserConfirmModal
				deleteConfirmBoxOpened={deleteConfirmBoxOpened}
				deleteConfirmBoxToggleOpened={deleteConfirmBoxToggleOpened}
				handleLogoutUser={handleLogoutUser}
			/>
			<Header
				height={smallScreen ? 60 : 70}
				mb={30}
				className={classes.root}
			>
				<Container size="xl" className={classes.header}>
					<Burger
						opened={burgerOpened}
						onClick={() =>
							burgerToggleOpened((burgerOpened) => !burgerOpened)
						}
						size="sm"
						className={classes.burger}
					/>
					<Transition
						transition="scale-y"
						duration={200}
						mounted={burgerOpened}
					>
						{(styles) => (
							<Paper
								className={classes.dropdown}
								withBorder
								style={styles}
							>
								{items}
							</Paper>
						)}
					</Transition>
					<Image alt="logo" className={classes.logo} src="/Logo.png" />
					<Group spacing={5} className={classes.links}>
						{items}
					</Group>
					<AvatarMenu
						deleteConfirmBoxToggleOpened={deleteConfirmBoxToggleOpened}
						handleLogoutUser={handleLogoutUser}
					/>
				</Container>
			</Header>
		</>
	);
};

export default Navbar;
