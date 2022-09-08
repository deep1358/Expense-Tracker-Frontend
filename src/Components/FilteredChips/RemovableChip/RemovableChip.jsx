import { Image } from "@mantine/core";
import { CloseButton, Group, Text } from "@mantine/core";
import { memo } from "react";
import { useSelector } from "react-redux";
import useStyles from "./RemovableChip.style";

const RemovableChip = ({ data: [type, value], removeChip, remove = true }) => {
	const { classes } = useStyles({ remove });

	const { payment_modes } = useSelector((state) => state.utils);

	const getPaymentModeImage = (payment_mode) =>
		payment_modes.find((mode) => mode.label === payment_mode)?.image;

	return (
		<Group
			spacing={0}
			className={classes.wrapper}
			align="center"
			position="apart"
		>
			{type === "payment_mode" && value !== "All" && value !== "Other" && (
				<Image
					mr={5}
					src={getPaymentModeImage(value)}
					width={20}
					height={20}
				/>
			)}
			<Text color="grey" className={classes.data}>
				{value === "Other"
					? `${type}: ${value}`
					: type === "day"
					? `Day: ${value}`
					: value}
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

export default memo(RemovableChip);
