import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Text } from "@mantine/core";
import FullScreenLoader from "../Components/FullScreenLoader";
import { AlertCircle } from "tabler-icons-react";
import { removeAlert } from "../store/utils";
import Navbar from "../Components/Navbar/Navbar";

const BaseLayout = () => {
	const { user, loggedIn, fetchingUser } = useSelector((state) => state.user);
	const { alertCloseButton, showAlert, alertMessage } = useSelector(
		(state) => state.utils
	);

	const location = useLocation();

	const dispatch = useDispatch();

	useEffect(() => {
		return () => {
			dispatch(removeAlert());
		};
	}, [location.pathname.length]);

	if (user && loggedIn)
		return (
			<>
				<Navbar>
					<Outlet />
				</Navbar>
				{showAlert && (
					<Alert
						style={{ width: "95vw", margin: "-20px auto 27px" }}
						icon={<AlertCircle size={16} />}
						title="Error!"
						color="red"
						withCloseButton={alertCloseButton}
						closeButtonLabel="Close alert"
						onClose={() => {
							dispatch(toggleShowAlert(false));
						}}
						pt={6}
						pb={6}
					>
						<Text
							sx={{
								"@media (max-width: 550px)": {
									fontSize: "12px",
								},
							}}
						>
							{alertMessage}
						</Text>
					</Alert>
				)}
			</>
		);
	else if (fetchingUser) return <FullScreenLoader />;
};

export default BaseLayout;
