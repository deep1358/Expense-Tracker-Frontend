import { createStyles } from "@mantine/core";

export const useStyles = createStyles(
	(theme, { opened, forDayWiseExpense }) => ({
		control: {
			width: "100%",
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
			padding: "0 6px 0 12px",
			height: 36,
			fontSize: ".85rem",
			borderRadius: theme.radius.sm,
			border: `1px solid ${theme.colors.dark[4]}`,
			transition: "background-color 150ms ease",
			backgroundColor: theme.colors.dark[opened ? 7 : 8],
			lineHeight: "34px",

			"&:hover": {
				backgroundColor: theme.colors.dark[7],
			},
		},
		label: {
			fontWeight: 500,
			fontSize: forDayWiseExpense ? theme.fontSizes.sm : theme.fontSizes.sm,
		},

		placeHolder: {
			fontSize: forDayWiseExpense ? theme.fontSizes.sm : theme.fontSizes.sm,
		},

		active: {
			background: theme.colors.blue[8],

			"&:hover": {
				backgroundColor: theme.colors.blue[8],
			},
		},
	})
);
