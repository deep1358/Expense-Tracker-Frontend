import React, { memo, useEffect } from "react";
import { Modal, Title, TextInput, Button, List } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { X } from "tabler-icons-react";
import { showNotification } from "@mantine/notifications";
import { createCategory } from "../../store/user/ThunkFunctions/createCategory";
import { updateCategory } from "../../store/user/ThunkFunctions/updateCategory";
import { useForm } from "@mantine/form";

const AddOrUpdateCategoryModal = ({
	opened,
	setOpened,
	isUpdating = false,
	oldCategory,
	setIsUpdating = () => {},
}) => {
	const dispatch = useDispatch();

	const {
		creatingCategory,
		updatingCategory,
		user: { categories },
	} = useSelector((state) => state.user);

	useEffect(() => {
		if (!opened) categoryForm.reset();
	}, [opened]);

	useEffect(() => {
		if (isUpdating) {
			categoryForm.setFieldValue("newCategory", oldCategory);
		}
	}, [isUpdating]);

	const categoryForm = useForm({
		initialValues: {
			newCategory: "",
		},

		validate: {
			newCategory: (values) =>
				values.newCategory === "" ? "Category is required" : undefined,
		},
	});

	// get current seconds since epoch to use as a unique id
	const getCurrentSeconds = () => Math.floor(Date.now() / 1000);

	const AddOrUpdateCategory = (values) => {
		if (
			!/^[a-zA-Z]([a-zA-Z _-]*([a-zA-Z]))?$/.test(values.newCategory.trim())
		)
			return showNotification({
				id: `add-category-error-${getCurrentSeconds()}`,
				message: "Category name is invalid",
				color: "red",
				icon: <X size={15} />,
			});
		if (!isUpdating) {
			dispatch(
				createCategory([values.newCategory.trim(), categories, setOpened])
			);
		} else {
			dispatch(
				updateCategory([
					oldCategory,
					values.newCategory,
					categories,
					setOpened,
				])
			);
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
					{isUpdating ? "Update Category" : "Add Category"}
				</Title>
			}
		>
			<form onSubmit={categoryForm.onSubmit(AddOrUpdateCategory)}>
				<TextInput
					data-autofocus
					placeholder="Add one"
					label="Category"
					required
					{...categoryForm.getInputProps("newCategory")}
				/>
				<Button fullWidth mt="xl" type="submit">
					{creatingCategory || updatingCategory ? "Saving..." : "Save"}
				</Button>
			</form>
			<List style={{ color: "grey" }} mt="lg" size="xs" listStyleType="disc">
				<List.Item>
					Category Name Rules:
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

export default memo(AddOrUpdateCategoryModal);