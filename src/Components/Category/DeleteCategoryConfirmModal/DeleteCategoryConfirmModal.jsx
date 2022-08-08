import React, { memo } from "react";
import { Modal, Group, Alert, Text, Button, Title } from "@mantine/core";
import { AlertCircle } from "tabler-icons-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory } from "../../../store/user/ThunkFunctions/deleteCategory";
import useStyles from "./DeleteCategoryConfirmModal.style";

const DeleteCategoryConfirmModal = ({
	deleteModalOpened,
	setDeleteModalOpened,
	selectDeleteCategory,
	setSelectDeleteCategory,
}) => {
	const dispatch = useDispatch();
	const { deletingCategory } = useSelector((state) => state.user);

	const { classes } = useStyles();

	return (
		<Modal
			size="md"
			opened={deleteModalOpened}
			onClose={() => setDeleteModalOpened(false)}
			title={<Title order={4}>Delete Category</Title>}
		>
			<Group className={classes.deleteModalGroup}>
				<Alert
					style={{ width: "100%" }}
					icon={<AlertCircle size={16} />}
					color="red"
				>
					<Text>This action cannot be undone.</Text>
				</Alert>

				<Text>
					Once you delete this category, all expense related to this
					category will also be deleted.
				</Text>

				<Button
					fullWidth
					color="red"
					onClick={() => {
						if (selectDeleteCategory !== "") {
							dispatch(
								deleteCategory([
									selectDeleteCategory,
									setDeleteModalOpened,
								])
							);
							setSelectDeleteCategory("");
						}
					}}
				>
					{deletingCategory
						? "Deleting..."
						: `Delete ${selectDeleteCategory}`}
				</Button>
			</Group>
		</Modal>
	);
};

export default memo(DeleteCategoryConfirmModal);
