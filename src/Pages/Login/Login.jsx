import React, { useEffect, useState } from "react";
import {
	Stack,
	Container,
	Button,
	Title,
	Text,
	Image,
	Center,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useStyles } from "./Login.style";

const Login = () => {

	const { classes } = useStyles();

	const [title, setTitle] = useState("Welcome Back To");

	useEffect(() => {
		// Check if user visits the app for the first time
		if (localStorage.getItem("firstVisit") === null) {
			setTitle("Welcome To");
			localStorage.setItem("firstVisit", "false");
		}
	}, [title]);

	const smallerScreen = useMediaQuery("(max-width: 370px)");

	const handleLogin = () => {
		const BACKEND_URL =
			process.env.NODE_ENV === "development"
				? "http://localhost:5000/api/auth/google"
				: "https://my-expense-tracker-backend.herokuapp.com/api/auth/google";
		window.open(BACKEND_URL, "_self");
	};

	return (
		<Center style={{ height: "90vh" }}>
			<Container size={600}>
				<Stack spacing="xs">
					<Title className={classes.Title} mt="md">
						{title}
					</Title>
					<Image
						height={smallerScreen ? 150 : 200}
						src="/Logo.png"
						alt="logo"
					/>
					<Text align="center" color="dimmed">
						Register or Login to use this service
					</Text>
					<Button
						leftIcon={<img src="./google.svg" alt="google logo" />}
						onClick={handleLogin}
						variant="default"
						size={smallerScreen ? "md" : "lg"}
						mt="xs"
					>
						Continue with Google
					</Button>
				</Stack>
			</Container>
		</Center>
	);
};

export default Login;
