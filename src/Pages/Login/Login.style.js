import { createStyles } from "@mantine/core";

export const useStyles = createStyles(() => ({
	Title: {
		fontSize: "3rem",
		fontWeight: "bold",
		textAlign: "center",
		fontFamily: "Lora,serif !important",

		"@media (max-width: 460px)": {
			fontSize: "2.5rem",
		},
		"@media (max-width: 370px)": {
			fontSize: "1.95rem",
		},
	},
}));
