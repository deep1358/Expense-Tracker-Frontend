import React, { memo } from "react";
import { Skeleton, Group } from "@mantine/core";

const ViewExpenseModalSkeleton = () => {
	return (
		<>
			{[...Array(6)].map((_, index) => (
				<Skeleton key={index} height={35} width="100%" radius="xs" />
			))}
			<Group position="right" style={{ width: "100%" }}>
				<Skeleton height={35} width="20%" radius="xs" />
				<Skeleton height={35} width="20%" radius="xs" />
			</Group>
		</>
	);
};

export default memo(ViewExpenseModalSkeleton);
