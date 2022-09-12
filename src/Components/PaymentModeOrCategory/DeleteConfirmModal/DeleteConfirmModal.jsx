import React, { memo } from "react";
import { Modal, Group, Alert, Text, Button, Title } from "@mantine/core";
import { AlertCircle } from "tabler-icons-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory } from "../../../store/user/ThunkFunctions/deleteCategory";
import useStyles from "./DeleteConfirmModal.style";

const DeleteCategoryConfirmModal = ({
	deleteModalOpened,
	setDeleteModalOpened,
	selectDeleteItem,
	setSelectDeleteItem,
	type,
}) => {
	const dispatch = useDispatch();
	const {
		deletingCategory,
		deletingPaymentMode,
		user: { categories },
	} = useSelector((state) => state.user);

	const { classes } = useStyles();

	return (
		<Modal
			size="md"
			opened={deleteModalOpened}
			onClose={() => setDeleteModalOpened(false)}
			title={<Title order={4}>Delete {type}</Title>}
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
					Once you delete this {type}, all expense related to this {type}{" "}
					will also be deleted.
				</Text>

				<Button
					fullWidth
					color="red"
					onClick={() => {
						if (selectDeleteItem !== "") {
							dispatch(
								deleteCategory([
									selectDeleteItem,
									categories,
									setDeleteModalOpened,
								])
							);
							setSelectDeleteItem("");
						}
					}}
				>
					{deletingCategory || deletingPaymentMode
						? "Deleting..."
						: `Delete ${selectDeleteItem}`}
				</Button>
			</Group>
		</Modal>
	);
};

export default memo(DeleteCategoryConfirmModal);
