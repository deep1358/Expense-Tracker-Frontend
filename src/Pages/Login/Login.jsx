import React, { useEffect, useState } from "react";
import {
    Stack,
    Container,
    Button,
    Title,
    Text,
    Image,
    Center,
    Alert,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useStyles } from "./Login.style";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Auth, googleAuthProvider } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../store/user/ThunkFunctions/createUser";
import { showNotification } from "@mantine/notifications";
import { AlertCircle, X } from "tabler-icons-react";
import { toggleLoadingOverlay } from "../../store/utils";
import getUrlParameter from "../../utils/getUrlParameter";

const getCurrentSeconds = () => Math.floor(Date.now() / 1000);

const Login = () => {
    const { classes } = useStyles();

    const [title, setTitle] = useState("Welcome Back To");

    const redirect_url = getUrlParameter("redirect_url");

    const dispatch = useDispatch();

    const { error } = useSelector((state) => state.user);

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

    useEffect(() => {
        if (error) dispatch(toggleLoadingOverlay(false));
    }, [error]);

    const smallerScreen = useMediaQuery("(max-width: 370px)");

    const handleLogin = () => {
        dispatch(toggleLoadingOverlay(true));
        signInWithPopup(Auth, googleAuthProvider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential =
                    GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                dispatch(
                    createUser([
                        user.email,
                        user.displayName,
                        user.photoURL,
                        redirect_url ? decodeURIComponent(redirect_url) : "/",
                    ])
                );
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;

                // get current seconds since epoch to use as a unique id

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
                const credential =
                    GoogleAuthProvider.credentialFromError(error);
            });
    };

    return (
        <Center style={{ height: "90vh" }}>
            <Stack>
                {error && (
                    <Alert
                        style={{ width: "800px", minWidth: "100%" }}
                        mt={50}
                        icon={<AlertCircle size={16} />}
                        title="Error!"
                        color="red"
                    >
                        {error}
                    </Alert>
                )}
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
                            leftIcon={
                                <img src="./google.svg" alt="google logo" />
                            }
                            onClick={handleLogin}
                            variant="default"
                            size={smallerScreen ? "md" : "lg"}
                            mt="xs"
                        >
                            Continue with Google
                        </Button>
                    </Stack>
                </Container>
            </Stack>
        </Center>
    );
};

export default Login;
