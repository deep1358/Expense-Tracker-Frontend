import React, { memo } from "react";
import { Modal, Group, Alert, Text, Button, Title } from "@mantine/core";
import { AlertCircle } from "tabler-icons-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory } from "../../../store/user/ThunkFunctions/deleteCategory";
import useStyles from "./DeleteConfirmModal.style";
import { deletePaymentMode } from "../../../store/user/ThunkFunctions/deletePaymentMode";

const DeleteCategoryConfirmModal = ({
	deleteModalOpened,
	setDeleteModalOpened,
	selectDeleteItem,
	setSelectDeleteItem,
	type,
	title,
}) => {
	const dispatch = useDispatch();
	const {
		deletingCategory,
		deletingPaymentMode,
		user: { categories, payment_modes },
	} = useSelector((state) => state.user);

	const { classes } = useStyles();

	const handleDeleteItem = () => {
		if (selectDeleteItem !== "") {
			if (type === "category")
				dispatch(
					deleteCategory([
						selectDeleteItem,
						categories,
						setDeleteModalOpened,
					])
				);
			else if (type === "payment_mode")
				dispatch(
					deletePaymentMode([
						selectDeleteItem,
						payment_modes,
						setDeleteModalOpened,
					])
				);
			setSelectDeleteItem("");
		}
	};

	return (
		<Modal
			size="md"
			opened={deleteModalOpened}
			onClose={() => setDeleteModalOpened(false)}
			title={<Title order={4}>Delete {title}</Title>}
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
					Once you delete this {title}, all expense related to this {title}{" "}
					will also be deleted.
				</Text>

				<Button fullWidth color="red" onClick={handleDeleteItem}>
					{deletingCategory || deletingPaymentMode
						? "Deleting..."
						: `Delete ${selectDeleteItem}`}
				</Button>
			</Group>
		</Modal>
	);
};

export default memo(DeleteCategoryConfirmModal);
