import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme, _params, getRef) => {
	const { opened, smallerScreen } = _params;

	const icon = getRef("icon");
	return {
		stack: {
			backgroundColor: theme.colors.dark[8],
			borderRight: opened
				? `1px solid ${theme.colors.dark[6]}`
				: !smallerScreen && `1px solid ${theme.colors.dark[6]}`,
			height: `calc(100vh - 50px)`,
			position: "fixed",
			overflow: smallerScreen || opened ? "hidden" : "none",
			padding: 0,
			width: opened ? 210 : !smallerScreen ? 45 : 0,
			transition: "all 0.3s",
			zIndex: 100,
			marginTop: 1,
		},

		link: {
			...theme.fn.focusStyles(),
			display: smallerScreen && !opened ? "none" : "flex",
			alignItems: "center",
			textDecoration: "none",
			fontSize: theme.fontSizes.sm,
			color: theme.colors.dark[1],
			padding:
				smallerScreen && !opened
					? 0
					: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
			borderRadius: opened && theme.radius.sm,
			fontWeight: 500,
			width: opened ? 200 : !smallerScreen ? 45 : 0,
			transition: "all 0.3s",
			margin: `0 ${opened ? 5 : 0}px`,
			transition: "width 0.1s",
			marginBottom: opened && 3,

			"&:hover": {
				backgroundColor: theme.colors.dark[6],
				color: theme.white,

				[`& .${icon}`]: {
					color: theme.white,
				},
			},
		},

		footerLink: {
			...theme.fn.focusStyles(),
			display: "flex",
			alignItems: "center",
			textDecoration: "none",
			fontSize: theme.fontSizes.sm,
			color: theme.colors.dark[1],
			fontWeight: 500,
			width: opened ? 210 : !smallerScreen ? 45 : 0,
			transition: "all 0.1s",
			padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,

			"&:hover": {
				backgroundColor: theme.colors.dark[6],
				color: theme.white,

				[`& .${icon}`]: {
					color: theme.white,
				},
			},
		},

		linkIcon: {
			ref: icon,
			color: theme.colors.dark[2],
			marginRight: opened && 10,
		},

		linkActive: {
			"&, &:hover": {
				backgroundColor: theme.fn.variant({
					variant: "light",
					color: theme.primaryColor,
				}).background,
				color: theme.fn.variant({
					variant: "light",
					color: theme.primaryColor,
				}).color,
				[`& .${icon}`]: {
					color: theme.fn.variant({
						variant: "light",
						color: theme.primaryColor,
					}).color,
				},
			},
		},
	};
});

export default useStyles;
