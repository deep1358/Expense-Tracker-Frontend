import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme, _params, getRef) => {
	return {
		root: {
			position: "sticky",
			zIndex: 2,
			backgroundColor: theme.colors.dark[8],
		},

		header: {
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
			height: "100%",
			overflow: "hidden",

			"@media (min-width: 710px)": {
				paddingLeft: 0,
			},
		},
		Title: {
			fontSize: "1.5rem",
			fontWeight: 600,
			color: theme.colors.dark[0],
			transition: "color 0.2s ease",
			fontFamily: "Oswald, serif !important",

			"@media (min-width: 710px)": {
				fontSize: "2.2rem",
			},

			"@media (max-width: 380px)": {
				fontSize: "1rem",
			},
		},

		logo: {
			width: "100px !important",
			"@media (max-width: 380px)": {
				width: "80px !important",
			},
		},
	};
});

export default useStyles;
