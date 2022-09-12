import {
	Group,
	Image,
	Menu,
	ScrollArea,
	Stack,
	Text,
	UnstyledButton,
} from "@mantine/core";
import React, { useState, memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { Selector } from "tabler-icons-react";
import { useStyles } from "./SelectPaymentMode.style";

const SelectPaymentMode = ({
	forAddOrUpdateExpenseForm = false,
	forDayWiseExpense = false,
	payment_mode,
	handleAppliedFilters,
}) => {
	const { payment_modes } = useSelector((state) => state.utils);

	const [paymentModeOpened, setPaymentModeOpened] = useState(false);

	const { classes, cx } = useStyles({ paymentModeOpened, forDayWiseExpense });

	const [paymentMode, setPaymentMode] = useState({ label: "" });

	const paymentModeItems = [{ label: "All" }, ...payment_modes].map((item) => (
		<Menu.Item
			icon={
				item?.image && (
					<Image src={item.image} fit="contain" width={20} height={20} />
				)
			}
			onClick={() => handleAppliedFilters(item?.label, "payment_mode")}
			className={cx({
				[classes.active]: paymentMode?.label === item.label,
			})}
			key={item?.label}
		>
			<Text className={classes.label}>{item?.label}</Text>
		</Menu.Item>
	));

	useEffect(() => {
		setPaymentMode(
			[{ label: "All" }, ...payment_modes].filter(
				(item) => item.label === payment_mode
			)[0]
		);
	}, [payment_mode]);

	return (
		<Stack
			style={{
				width: !forDayWiseExpense && "100%",
			}}
			spacing={2}
		>
			<Text className={classes.placeHolder}>Select a Payment Mode</Text>
			<Menu
				size="xs"
				onOpen={() => setPaymentModeOpened(true)}
				onClose={() => setPaymentModeOpened(false)}
				radius="sm"
				width="target"
			>
				<Menu.Target>
					<UnstyledButton className={classes.control}>
						<Group spacing="xs">
							{paymentMode?.image && (
								<Image
									src={paymentMode.image}
									width={25}
									height={25}
									fit="contain"
								/>
							)}
							<Text className={classes.label}>{paymentMode?.label}</Text>
						</Group>
						<Selector size={12} color="gray" />
					</UnstyledButton>
				</Menu.Target>
				<Menu.Dropdown>
					<ScrollArea style={{ height: 250 }}>
						{paymentModeItems}
					</ScrollArea>
				</Menu.Dropdown>
			</Menu>
		</Stack>
	);
};

export default memo(SelectPaymentMode);
