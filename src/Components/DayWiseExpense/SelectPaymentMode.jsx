import { Group, Image, Text } from "@mantine/core";
import { forwardRef } from "react";

const SelectPaymentMode = forwardRef(({ image, value, ...others }, ref) => {
	return (
		<div ref={ref} {...others}>
			<Group noWrap>
				{image && <Image width={25} src={image} alt={value} />}
				<Text size="xs">{value}</Text>
			</Group>
		</div>
	);
});

export default SelectPaymentMode;
