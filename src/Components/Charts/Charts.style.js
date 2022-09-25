import { createStyles } from "@mantine/core";

export const useStyles = createStyles((_, ref = { inline: false }) => ({
	Select: {
		width: "30%",

		"@media (max-width: 500px)": {
			width: "46%",
		},
	},

	Drawer: {
		opacity: 0.99,
		zIndex: 1000,
	},

	Group: {
		alignItems: "flex-end",
	},

	Resetbutton: {
		"@media (max-width: 500px)": {
			width: ref.inline ? "46%" : "50%",
			margin: !ref.inline && "0 auto",
		},
	},
}));
