import { createStyles } from "@mantine/core";

export const useStyles = createStyles(() => ({
	Select: {
		width: "30%",

		"@media (max-width: 500px)": {
			width: "45%",
		},
	},

	Drawer: {
		opacity: 0.99,
		zIndex: 1000,
	},
}));
