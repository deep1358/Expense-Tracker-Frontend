import { createStyles } from "@mantine/core";

export const useStyles = createStyles(() => ({
	barIcon: {
		position: "absolute",
		right: "2%",
		top: "8.5%",

		"@media (max-width: 600px)": {
			top: "7.5%",
		},
	},
}));
