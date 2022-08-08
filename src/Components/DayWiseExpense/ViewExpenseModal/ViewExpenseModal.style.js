import { createStyles } from "@mantine/core";

export const useStyles = createStyles(() => ({
	Text: {
		"@media (max-width: 600px)": {
			fontSize: ".8rem",
		},
		"@media (max-width: 330px)": {
			fontSize: ".75rem",
		},
	},
	td: {
		minWidth: "110px",
		"@media (max-width: 600px)": {
			minWidth: "70px",
		},
	},
}));
