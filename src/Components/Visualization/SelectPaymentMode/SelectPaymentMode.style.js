import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme, { paymentModeOpened }) => ({
	control: {
		width: "100%",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		padding: "0 6px 0 12px",
		height: "30px",
		fontSize: ".85rem",
		borderRadius: theme.radius.sm,
		border: `1px solid ${theme.colors.dark[4]}`,
		transition: "background-color 150ms ease",
		backgroundColor: theme.colors.dark[paymentModeOpened ? 5 : 6],

		"&:hover": {
			backgroundColor: theme.colors.dark[5],
		},
	},
	label: {
		fontWeight: 500,
		fontSize: theme.fontSizes.xs,
	},

	placeHolder: {
		fontSize: theme.fontSizes.xs,
	},

	active: {
		background: theme.colors.blue[8],

		"&:hover": {
			backgroundColor: theme.colors.blue[8],
		},
	},
}));
