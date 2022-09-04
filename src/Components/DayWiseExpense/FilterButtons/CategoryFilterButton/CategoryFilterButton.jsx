import { Menu, ScrollArea, Stack, Text, UnstyledButton } from "@mantine/core";
import React, { useState, memo } from "react";
import { useSelector } from "react-redux";
import { Selector } from "tabler-icons-react";
import { useStyles } from "../FilterButtons.style";

const CategoryFilterButton = ({ categoryExpense, setCategoryExpense }) => {
	const [categoryOpened, setCategoryOpened] = useState(false);

	const { classes, cx } = useStyles({ opened: categoryOpened });

	const { user } = useSelector((state) => state.user);

	const categoryItems = ["All", ...user?.categories].map((item) => (
		<Menu.Item
			onClick={() => setCategoryExpense(item)}
			key={item}
			className={cx({
				[classes.active]: categoryExpense === item,
			})}
		>
			<Text className={classes.label}>{item}</Text>
		</Menu.Item>
	));

	return (
		<Stack spacing={2}>
			<Text className={classes.placeHolder}>Filter by Category</Text>
			<Menu
				onOpen={() => setCategoryOpened(true)}
				onClose={() => setCategoryOpened(false)}
				radius="sm"
				width="target"
			>
				<Menu.Target>
					<UnstyledButton className={classes.control}>
						<Text className={classes.label}>{categoryExpense}</Text>
						<Selector size={16} />
					</UnstyledButton>
				</Menu.Target>
				<Menu.Dropdown>
					<ScrollArea
						style={{
							height: 40 * categoryItems.length + 1,
							maxHeight: 250,
							minHeight: "fit-content",
						}}
					>
						{categoryItems}
					</ScrollArea>
				</Menu.Dropdown>
			</Menu>
		</Stack>
	);
};

export default memo(CategoryFilterButton);
