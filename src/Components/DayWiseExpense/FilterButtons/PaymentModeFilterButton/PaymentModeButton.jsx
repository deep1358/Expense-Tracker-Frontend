import {
	Group,
	Image,
	Menu,
	ScrollArea,
	Stack,
	Text,
	UnstyledButton,
} from "@mantine/core";
import React, { useState, memo } from "react";
import { useSelector } from "react-redux";
import { Selector } from "tabler-icons-react";
import { useStyles } from "../FilterButtons.style";

const PaymentModeButton = ({ paymentModeExpense, setPaymentModeExpense }) => {
	const { payment_modes } = useSelector((state) => state.utils);

	const [paymentModeOpened, setPaymentModeOpened] = useState(false);

	const { classes } = useStyles({ paymentModeOpened });

	const paymentModeItems = [{ label: "All" }, ...payment_modes].map((item) => (
		<Menu.Item
			icon={
				item.image && (
					<Image src={item.image} fit="contain" width={20} height={20} />
				)
			}
			onClick={() => setPaymentModeExpense(item)}
			key={item.label}
		>
			<Text className={classes.label}>{item.label}</Text>
		</Menu.Item>
	));

	return (
		<Stack spacing={2}>
			<Text className={classes.placeHolder}>Filter by Payment mode</Text>
			<Menu
				onOpen={() => setPaymentModeOpened(true)}
				onClose={() => setPaymentModeOpened(false)}
				radius="sm"
				width="target"
			>
				<Menu.Target>
					<UnstyledButton className={classes.control}>
						<Group spacing="xs">
							{paymentModeExpense.image && (
								<Image
									src={paymentModeExpense.image}
									width={25}
									height={25}
									fit="contain"
								/>
							)}
							<Text className={classes.label}>
								{paymentModeExpense.label}
							</Text>
						</Group>
						<Selector size={16} />
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

export default memo(PaymentModeButton);
