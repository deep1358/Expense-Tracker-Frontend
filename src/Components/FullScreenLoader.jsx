import React from "react";
import { Loader, Stack, Center, Text, Image } from "@mantine/core";
import CustomLoader from "./CustomLoader";

const FullScreenLoader = ({ size }) => {
	return (
		<Center style={{ height: "90vh", width: "100vw" }}>
			<Stack align="center">
				<Image width={250} src="/Logo.png" alt="logo" mb={-55} />
				<CustomLoader color="gray" size={size} />
			</Stack>
		</Center>
	);
};

export default FullScreenLoader;
