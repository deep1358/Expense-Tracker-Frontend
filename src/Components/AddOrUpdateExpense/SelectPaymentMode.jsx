import { Group, Image, Text } from "@mantine/core";
import { forwardRef } from "react";

const SelectPaymentMode = forwardRef(({ image, label, ...others }, ref) => (
	<div ref={ref} {...others}>
		<Group noWrap>
			{image && <Image width={40} src={image} alt={label} />}

			<Text size="sm">{label}</Text>
		</Group>
	</div>
));

export default SelectPaymentMode;
