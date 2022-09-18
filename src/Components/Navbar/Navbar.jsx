import { Group } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import LeftNavbar from "./LeftNavbar/LeftNavbar";
import { useStyles } from "./Navbar.style";
import UpperNavbar from "./UpperNavbar/UpperNavbar";

const Navbar = ({ children }) => {
	const [opened, setOpened] = useState();

	const smallerScreen = useMediaQuery("(max-width: 710px)");

	const { classes } = useStyles({ opened });

	useEffect(() => {
		// if the screen is smaller than 710px, close the navbar
		if (smallerScreen) {
			setOpened(false);
		}
	}, [smallerScreen]);

	useEffect(() => {
		const openedValue = localStorage.getItem("leftNavabarOpened");
		if (openedValue) {
			setOpened(JSON.parse(openedValue));
		}
	}, []);

	useEffect(() => {
		// Store the current value of the opened state in localStorage
		localStorage.setItem("leftNavabarOpened", opened);
	}, [opened]);

	return (
		<>
			<UpperNavbar opened={opened} setOpened={setOpened} />
			{opened !== undefined &&
				(smallerScreen ? (
					<>
						<LeftNavbar
							smallerScreen={smallerScreen}
							opened={opened}
							setOpened={setOpened}
						/>
						<div style={{ marginTop: 20 }}>{children}</div>
					</>
				) : (
					<Group align="flex-start">
						<LeftNavbar
							smallerScreen={smallerScreen}
							opened={opened}
							setOpened={setOpened}
						/>
						<div className={classes.mainContent}>{children}</div>
					</Group>
				))}
		</>
	);
};

export default Navbar;
