import { ActionIcon, Tooltip } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React from "react";
import { Filter } from "tabler-icons-react";

const FilterIcon = ({ setOpened }) => {
	const smallerScreen = useMediaQuery("(max-width: 400px)");

	return (
		<Tooltip label="Filter">
			<ActionIcon
				style={{ position: "absolute", right: 0 }}
				radius="xl"
				size="xl"
				variant="subtle"
			>
				<Filter
					onClick={() => setOpened((pre) => !pre)}
					style={{ cursor: "pointer" }}
					size={smallerScreen ? 20 : 25}
				/>
			</ActionIcon>
		</Tooltip>
	);
};

export default FilterIcon;
