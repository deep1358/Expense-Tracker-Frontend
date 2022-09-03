import { CloseButton, Group, Text } from "@mantine/core";
import useStyles from "./RemovableChip.style";

const RemovableChip = ({ data: [type, value], removeChip, remove = true }) => {
	const { classes } = useStyles({ remove });

	return (
		<Group
			spacing={0}
			className={classes.wrapper}
			align="center"
			position="apart"
		>
			<Text color="grey" className={classes.data}>
				{type === "day" ? `Day: ${value}` : value}
			</Text>
			{remove && (
				<CloseButton
					onClick={() => removeChip(type)}
					title="Remove Chip"
					radius="lg"
					size="xs"
					color="dark.1"
				></CloseButton>
			)}
		</Group>
	);
};

export default RemovableChip;
