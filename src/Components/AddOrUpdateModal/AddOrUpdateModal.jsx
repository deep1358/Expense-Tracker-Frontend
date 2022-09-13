import React, { memo, useEffect } from "react";
import { Modal, Title, TextInput, Button, List } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { X } from "tabler-icons-react";
import { showNotification } from "@mantine/notifications";
import { createCategory } from "../../store/user/ThunkFunctions/createCategory";
import { updateCategory } from "../../store/user/ThunkFunctions/updateCategory";
import { useForm } from "@mantine/form";
import { createPaymentMode } from "../../store/user/ThunkFunctions/createPaymentMode";
import { toggleLoadingOverlay } from "../../store/utils";
import { updatePaymentMode } from "../../store/user/ThunkFunctions/updatePaymentMode";

const AddOrUpdateModal = ({
	opened,
	setOpened,
	isUpdating = false,
	oldValue,
	type,
	title,
	setIsUpdating = () => {},
}) => {
	const dispatch = useDispatch();

	const {
		creatingCategory,
		updatingCategory,
		creatingPaymentMode,
		updatingPaymentMode,
		user: { categories, payment_modes },
	} = useSelector((state) => state.user);

	useEffect(() => {
		if (!opened) form.reset();
	}, [opened]);

	useEffect(() => {
		dispatch(
			toggleLoadingOverlay(
				creatingCategory ||
					updatingCategory ||
					creatingPaymentMode ||
					updatingPaymentMode
			)
		);
	}, [
		creatingCategory,
		updatingCategory,
		creatingPaymentMode,
		updatingPaymentMode,
	]);

	useEffect(() => {
		if (isUpdating) {
			form.setFieldValue("newValue", oldValue);
		}
	}, [isUpdating]);

	const form = useForm({
		initialValues: {
			newValue: "",
		},

		validate: {
			newValue: (values) =>
				values.newValue === "" ? "This field is required" : undefined,
		},
	});

	// get current seconds since epoch to use as a unique id
	const getCurrentSeconds = () => Math.floor(Date.now() / 1000);

	const AddOrUpdate = (values) => {
		if (!/^[a-zA-Z]([a-zA-Z _-]*([a-zA-Z]))?$/.test(values.newValue.trim()))
			return showNotification({
				id: `add-${type}-error-${getCurrentSeconds()}`,
				message: `${type} name is invalid`,
				color: "red",
				icon: <X size={15} />,
			});

		if (type === "category") {
			if (!isUpdating) {
				dispatch(
					createCategory([values.newValue.trim(), categories, setOpened])
				);
			} else {
				dispatch(
					updateCategory([
						oldValue,
						values.newValue,
						categories,
						setOpened,
					])
				);
			}
		} else if (type === "payment_mode") {
			if (!isUpdating) {
				dispatch(
					createPaymentMode([
						values.newValue.trim(),
						payment_modes,
						setOpened,
					])
				);
			} else {
				dispatch(
					updatePaymentMode([
						oldValue,
						values.newValue,
						payment_modes,
						setOpened,
					])
				);
			}
		}
	};

	useEffect(() => {
		if (!opened) setIsUpdating(false);
	}, [opened]);

	return (
		<Modal
			size="sm"
			opened={opened}
			onClose={() => setOpened(false)}
			title={
				<Title order={4}>
					{isUpdating ? `Update ${title}` : `Add ${title}`}
				</Title>
			}
		>
			<form onSubmit={form.onSubmit(AddOrUpdate)}>
				<TextInput
					data-autofocus
					placeholder="Add one"
					label={title}
					required
					{...form.getInputProps("newValue")}
				/>
				<Button fullWidth mt="xl" type="submit">
					{creatingCategory ||
					updatingCategory ||
					creatingPaymentMode ||
					updatingPaymentMode
						? "Saving..."
						: "Save"}
				</Button>
			</form>
			<List style={{ color: "grey" }} mt="lg" size="xs" listStyleType="disc">
				<List.Item>
					Name Rules:
					<List
						style={{ color: "grey" }}
						size="xs"
						withPadding
						listStyleType="disc"
					>
						<List.Item>
							must starts and ends with
							<List
								style={{ color: "grey" }}
								size="xs"
								withPadding
								listStyleType="disc"
							>
								<List.Item>Alphabets (a-z A-Z)</List.Item>
							</List>
						</List.Item>
						<List.Item>
							only conatains
							<List
								style={{ color: "grey" }}
								size="xs"
								withPadding
								listStyleType="disc"
							>
								<List.Item>Alphabets (a-z A-Z)</List.Item>
								<List.Item>space( )</List.Item>
								<List.Item>hyphen(-)</List.Item>
								<List.Item>underscore(_)</List.Item>
							</List>
						</List.Item>
					</List>
				</List.Item>
			</List>
		</Modal>
	);
};

export default memo(AddOrUpdateModal);
