import { Group } from "@mantine/core";
import React from "react";
import RemovableChip from "../../RemovableChip/RemovableChip";

const DayWiseFilter = ({ appliedFilters, handleAppliedFilters }) => {
	const removeChip = (type) => {
		handleAppliedFilters("All", type);
	};

	return (
		<Group p={5} pb={0} position="apart">
			<Group spacing={5} pl={15} style={{ flex: 1 }}>
				{Object.entries(appliedFilters)
					.filter(([_type, value]) => value !== "All")
					.map((filter, index) => (
						<RemovableChip
							remove={filter[0] === "category"}
							key={index}
							data={filter}
							removeChip={removeChip}
						/>
					))}
			</Group>
		</Group>
	);
};

export default DayWiseFilter;
