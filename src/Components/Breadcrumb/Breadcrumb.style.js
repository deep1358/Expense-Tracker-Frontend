import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
	breadcrumb: {
		width: "fit-content",
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "center",
		margin: "-2vh 0 4vh 2vw",
		position: "relative",

		"@media (max-width: 600px)": {
			width: "90%",
			justifyContent: "flex-start",
		},
	},

	breadcrumbItem: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: theme.colors.dark[5],
		color: theme.colors.dark[1],
		marginRight: theme.spacing.xs,
		width: "135px",
		position: "relative",

		"&:before": {
			content: `''`,
			borderStyle: "solid",
			borderWidth: `27px 23px 0px 23px`,
			borderColor: `${theme.colors.dark[7]} transparent transparent transparent`,
			position: "absolute",
			left: "-10px",
			top: "9px",
			transform: "rotate(-90deg)",
		},
		"&:after": {
			content: `''`,
			zIndex: 1,
			width: 0,
			height: 0,
			borderStyle: "solid",
			borderWidth: `26px 23px 0 23px`,
			borderColor: `${theme.colors.dark[5]} transparent transparent transparent`,
			position: "absolute",
			right: "-35px",
			top: ".6rem",
			transform: "rotate(-90deg)",
			outline: "none",
		},

		"@media (max-width: 600px)": {
			fontSize: ".8rem",
			marginRight: "5px",

			"&:before": {
				borderWidth: `12px 18px 0px 18px`,
				left: "-13px",
				top: ".75rem",
			},
			"&:after": {
				borderWidth: `12px 18px 0px 18px`,
				right: "-23px",
				top: ".75rem",
			},
		},

		"@media (max-width: 350px)": {
			fontSize: ".7rem",
			"&:before": {
				borderWidth: `10px 18px 0px 18px`,
				left: "-14px",
			},
			"&:after": {
				borderWidth: `10px 17px 0px 17px`,
				right: "-21px",
			},
		},
	},

	breadcrumbItemActive: {
		backgroundColor: theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25),
		color: theme.colors[theme.primaryColor][4],
		"&:after": {
			borderColor: `${theme.fn.rgba(
				theme.colors[theme.primaryColor][9],
				0.25
			)} transparent transparent transparent`,
			borderWidth: `24px 23px 0 23px`,
			top: ".68rem",
			right: "-34.7px",
		},

		"@media (max-width: 600px)": {
			"&:after": {
				borderWidth: `12px 18px 0px 18px`,
				right: "-24px",
				top: ".75rem",
			},
		},
		"@media (max-width: 350px)": {
			"&:after": {
				borderWidth: `10px 17px 0px 17px`,
				right: "-22px",
				top: ".75rem",
			},
		},
	},

	breadcrumbItemLink: {
		padding: `${theme.spacing.xs}px 0`,
		paddingLeft: "30px",
		textAlign: "center",
		"@media (max-width: 600px)": {
			padding: "8px 0",
		},
	},
}));

export default useStyles;
