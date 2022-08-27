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
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Auth, googleAuthProvider } from "../../firebase";
import { useDispatch } from "react-redux";
import { createUser } from "../../store/user/ThunkFunctions/createUser";
import { showNotification } from "@mantine/notifications";
import { X } from "tabler-icons-react";
import { toggleLoadingOverlay } from "../../store/utils";

const Login = () => {
	const { classes } = useStyles();

	const [title, setTitle] = useState("Welcome Back To");

	const dispatch = useDispatch();

	useEffect(() => {
		// Check if user visits the app for the first time
		if (localStorage.getItem("firstVisit") === null) {
			setTitle("Welcome To");
			localStorage.setItem("firstVisit", "false");
		}
	}, [title]);

	useEffect(() => {
		dispatch(toggleLoadingOverlay(false));
	}, []);

	const smallerScreen = useMediaQuery("(max-width: 370px)");

	const handleLogin = () => {
		dispatch(toggleLoadingOverlay(true));
		signInWithPopup(Auth, googleAuthProvider)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential.accessToken;
				// The signed-in user info.
				const user = result.user;
				dispatch(createUser([user.email, user.displayName, user.photoURL]));
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;

				// get current seconds since epoch to use as a unique id
				const getCurrentSeconds = () => Math.floor(Date.now() / 1000);

				showNotification({
					id: `login-${getCurrentSeconds()}`,
					message: "Error in login",
					color: "red",
					icon: <X size={15} />,
				});

				dispatch(toggleLoadingOverlay(false));

				// The email of the user's account used.
				const email = error.customData.email;
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error);
			});
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
