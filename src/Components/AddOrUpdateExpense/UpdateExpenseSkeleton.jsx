import React from "react";
import { Skeleton } from "@mantine/core";

const UpdateExpenseSkeleton = () => {
	return (
		<>
			{[...Array(6)].map((_, index) => (
				<Skeleton
					key={index}
					height={45}
					mt="md"
					width="100%"
					radius="xs"
				/>
			))}
		</>
	);
};

export default UpdateExpenseSkeleton;
