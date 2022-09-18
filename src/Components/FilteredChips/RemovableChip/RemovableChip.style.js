import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme, remove) => ({
	data: {
		fontSize: theme.fontSizes.xs,
		padding: !remove ? "0 0 0 10px" : "0 10px 0 0",
	},
	wrapper: {
		padding: "2px 1px 2px 8px",
		borderRadius: theme.radius.lg,
		background: theme.colors.dark[6],
		marginBottom: 5,
	},
}));

export default useStyles;
