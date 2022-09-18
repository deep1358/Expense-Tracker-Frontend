import { createStyles } from "@mantine/core";

export const useStyles = createStyles((_theme, _params) => {
	const { opened } = _params;

	return {
		mainContent: {
			flex: 1,
			marginLeft: opened ? 210 : 50,
			transition: "margin-left 0.3s",
			marginTop: 20,
		},
	};
});
