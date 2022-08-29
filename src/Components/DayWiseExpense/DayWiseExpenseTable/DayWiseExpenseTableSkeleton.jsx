import React from "react";
import { Skeleton } from "@mantine/core";

const DayWiseExpenseTableSkeleton = () => {
	return [...Array(10)].map((_, key) => (
		<tr key={key}>
			{[...Array(4)].map((_, index) => (
				<td key={index}>
					<Skeleton height={30} width="100%" radius="xs" />
				</td>
			))}
		</tr>
	));
};

export default DayWiseExpenseTableSkeleton;
