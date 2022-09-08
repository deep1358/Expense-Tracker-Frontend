import { createStyles } from "@mantine/core";

export const useStyles = createStyles(
	(theme, { paymentModeOpened, forDayWiseExpense }) => ({
		control: {
			width: forDayWiseExpense ? 180 : "100%",
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
			padding: "0 6px 0 12px",
			height: forDayWiseExpense ? 30 : 38,
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
			fontSize: forDayWiseExpense ? theme.fontSizes.xs : theme.fontSizes.sm,
		},

		placeHolder: {
			fontSize: forDayWiseExpense ? theme.fontSizes.xs : theme.fontSizes.sm,
		},

		active: {
			background: theme.colors.blue[8],

			"&:hover": {
				backgroundColor: theme.colors.blue[8],
			},
		},
	})
);
