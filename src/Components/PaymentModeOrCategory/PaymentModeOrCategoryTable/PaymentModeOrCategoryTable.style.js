import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
	header: {
		position: "sticky",
		top: 0,
		backgroundColor: theme.colors.dark[7],
		transition: "box-shadow 150ms ease",
		zIndex: 1,

		"&::after": {
			content: '""',
			position: "absolute",
			left: 0,
			right: 0,
			bottom: 0,
			borderBottom: `1px solid ${theme.colors.dark[3]}`,
		},
	},

	th: {
		padding: "0 !important",
		textAlign: "center !important",
		minHeight: "40px",
		backgroundColor: theme.colors.dark[5],

		"&:first-of-type": {
			borderTopLeftRadius: "3px",
		},
		"&:last-of-type": {
			borderTopRightRadius: "3px",
		},
	},

	control: {
		width: "100%",
		padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
		textAlign: "center",

		"&:hover": {
			backgroundColor: theme.colors.dark[6],
		},
	},

	td: {
		textAlign: "center",

		"@media (max-width: 530px)": {
			fontSize: "0.8rem !important",
		},
	},
	noResultImage: {
		width: "30% !important",
	},
}));
