import { createStyles } from "@mantine/core";

const useStyles = createStyles(() => ({
	deleteModalGroup: {
		"& > *": {
			fontSize: ".95rem",
			"@media (max-width: 450px)": {
				fontSize: ".77rem",
			},
		},
	},
}));

export default useStyles;
