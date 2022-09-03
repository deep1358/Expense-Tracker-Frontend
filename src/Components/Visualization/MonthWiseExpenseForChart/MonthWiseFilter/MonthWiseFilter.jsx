import { Group } from "@mantine/core";
import React from "react";
import RemovableChip from "../../RemovableChip/RemovableChip";

const MonthWiseFilter = ({ appliedFilters, handleAppliedFilters }) => {
	const removeChip = (type) => {
		handleAppliedFilters("All", type);
	};

	return (
		<Group p={5} pb={0} position="apart">
			<Group spacing={5} pl={15} style={{ flex: 1 }}>
				{Object.entries(appliedFilters)
					.filter(
						([type, value]) => value !== "All" && type !== "chartType"
					)
					.map((filter, index) => (
						<RemovableChip
							key={index}
							data={filter}
							removeChip={removeChip}
						/>
					))}
			</Group>
		</Group>
	);
};

export default MonthWiseFilter;
