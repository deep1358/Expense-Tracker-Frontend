import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Alert, LoadingOverlay, Text } from "@mantine/core";
import CustomLoader from "../Components/CustomLoader";
import FullScreenLoader from "../Components/FullScreenLoader";
import { AlertCircle } from "tabler-icons-react";
import { removeAlert } from "../store/utils";

const BaseLayout = () => {
	const { user } = useSelector((state) => state.user);
	const { loadingOverlay, alertCloseButton, showAlert, alertMessage } =
		useSelector((state) => state.utils);

	const location = useLocation();

	const dispatch = useDispatch();

	useEffect(() => {
		return () => {
			dispatch(removeAlert());
		};
	}, [location.pathname.length]);

	if (user)
		return (
			<>
				<LoadingOverlay
					style={{
						position: "fixed",
						width: "100vw",
						height: "100vh",
						zIndex: 9999,
					}}
					opacity={0.6}
					color="#000"
					loader={<CustomLoader />}
					blur={2}
					visible={loadingOverlay}
				/>
				<Navbar />

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
				<Outlet />
			</>
		);
	else return <FullScreenLoader />;
};

export default BaseLayout;
