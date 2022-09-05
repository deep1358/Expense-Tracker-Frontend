import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme, { opened }) => ({
	control: {
		width: "100%",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		padding: "0 6px 0 12px",
		height: "38px",
		fontSize: ".85rem",
		borderRadius: theme.radius.sm,
		border: `1px solid ${theme.colors.dark[4]}`,
		transition: "background-color 150ms ease",
		backgroundColor: theme.colors.dark[opened ? 5 : 6],

		"&:hover": {
			backgroundColor: theme.colors.dark[5],
		},
	},
	label: {
		fontWeight: 500,
		fontSize: theme.fontSizes.sm,
	},

	placeHolder: {
		fontSize: "14px",
	},

	active: {
		background: theme.colors.blue[8],

		"&:hover": {
			backgroundColor: theme.colors.blue[8],
		},
	},
}));
