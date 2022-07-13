import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme, _params, getref) => ({
	navbar: {
		backgroundColor:
			theme.colorScheme === "dark"
				? theme.colors.dark[8]
				: theme.colors.gray[1],
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		padding: "0.5rem 1rem",
	},
	Text: {
		fontSize: "2rem",
		fontFamily: "Rubik Moonrocks, cursive",
	},
}));

export default useStyles;
