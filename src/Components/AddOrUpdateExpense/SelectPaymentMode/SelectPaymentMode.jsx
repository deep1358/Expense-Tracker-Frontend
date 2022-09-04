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

const SelectPaymentMode = ({ payment_mode, setFormPaymentModeValue }) => {
	const { payment_modes } = useSelector((state) => state.utils);

	const [paymentModeOpened, setPaymentModeOpened] = useState(false);
	const [paymentModeExpense, setPaymentModeExpense] = useState({ label: "" });

	const { classes, cx } = useStyles({ paymentModeOpened });

	const paymentModeItems = payment_modes.map((item) => (
		<Menu.Item
			icon={
				item.image && (
					<Image src={item.image} fit="contain" width={28} height={28} />
				)
			}
			onClick={() => {
				setFormPaymentModeValue(item.label);
				setPaymentModeExpense(item);
			}}
			className={cx({
				[classes.active]: paymentModeExpense?.label === item.label,
			})}
			key={item.label}
		>
			<Text>{item.label}</Text>
		</Menu.Item>
	));

	useEffect(() => {
		setPaymentModeExpense(
			payment_modes.filter((item) => item?.label === payment_mode)[0]
		);
	}, [payment_mode]);

	return (
		<Stack mt="xl" spacing={2}>
			<Text className={classes.placeHolder}>Choose Payment mode</Text>
			<Menu
				onOpen={() => setPaymentModeOpened(true)}
				onClose={() => setPaymentModeOpened(false)}
				radius="sm"
				width="target"
			>
				<Menu.Target>
					<UnstyledButton className={classes.control}>
						<Group spacing="xs">
							{paymentModeExpense?.image && (
								<Image
									src={paymentModeExpense?.image}
									width={30}
									height={30}
									fit="contain"
								/>
							)}
							<Text className={classes.label}>
								{paymentModeExpense?.label}
							</Text>
						</Group>
						<Selector size={16} color="gray" />
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
