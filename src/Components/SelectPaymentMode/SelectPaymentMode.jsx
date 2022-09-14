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
import { ConvertPaymentModesToLabeledFormat } from "../../utils/ConvertPaymentModesToLabeledFormat";

const SelectPaymentMode = ({
	forDayWiseExpense = false,
	payment_mode,
	handleAppliedFilters,
	forAddOrUpdateExpenseForm = false,
}) => {
	const { payment_modes } = useSelector((state) => state.utils);
	const {
		user: { payment_modes: user_payment_modes },
	} = useSelector((state) => state.user);

	const [paymentModeOpened, setPaymentModeOpened] = useState(false);

	const { classes, cx } = useStyles({
		opened: paymentModeOpened,
		forDayWiseExpense,
		forAddOrUpdateExpenseForm,
	});

	const [paymentMode, setPaymentMode] = useState({ label: "" });

	const [paymentModes, setPaymentModes] = useState([]);

	const paymentModeItems = paymentModes.map((item) => (
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
		let changedPaymentModes = [];

		if (!forAddOrUpdateExpenseForm) changedPaymentModes = [{ label: "All" }];

		changedPaymentModes = [
			...changedPaymentModes,
			...ConvertPaymentModesToLabeledFormat(user_payment_modes),
			...payment_modes,
		];

		setPaymentModes(changedPaymentModes);
		setPaymentMode(
			changedPaymentModes.filter((item) => item?.label === payment_mode)[0]
		);
	}, [payment_mode, user_payment_modes]);

	return (
		<Stack
			style={{
				width: !forDayWiseExpense && "100%",
				flex: forAddOrUpdateExpenseForm && 1,
			}}
			spacing={2}
			mt={forAddOrUpdateExpenseForm && "xl"}
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
