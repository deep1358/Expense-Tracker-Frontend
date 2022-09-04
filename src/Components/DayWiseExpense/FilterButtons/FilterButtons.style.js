import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme, { opened }) => ({
	control: {
		width: 180,
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		padding: "0 10px",
		height: "35px",
		borderRadius: theme.radius.sm,
		border: `1px solid ${theme.colors.dark[6]}`,
		transition: "background-color 150ms ease",
		backgroundColor: theme.colors.dark[opened ? 5 : 6],

		"&:hover": {
			backgroundColor: theme.colors.dark[5],
		},
	},

	label: {
		fontWeight: 500,
		fontSize: theme.fontSizes.xs,
	},

	placeHolder: {
		fontSize: "12px",
	},

	active: {
		background: theme.colors.blue[8],

		"&:hover": {
			backgroundColor: theme.colors.blue[8],
		},
	},
}));
