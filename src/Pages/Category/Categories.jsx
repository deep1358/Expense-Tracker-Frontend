import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../../store/user/ThunkFunctions/createCategory";
import { deleteCategory } from "../../store/user/ThunkFunctions/deleteCategory";
import { updateCategory } from "../../store/user/ThunkFunctions/updateCategory";
import { Modal, TextInput, Button, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { toggleLoadingOverlay } from "../../store/utils";

const Categories = () => {
  const [oldCategory, setOldCategory] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);

  const { user, creatingCategory, deletingCategory, updatingCategory } =
    useSelector((state) => state.user);
  const dispatch = useDispatch();

  const categoryForm = useForm({
    initialValues: {
      newCategory: "",
    },

    validate: {
      newCategory: (values) =>
        values.newCategory === "" ? "Category is required" : undefined,
    },
  });

  useEffect(() => {
    if (creatingCategory || deletingCategory || updatingCategory)
      dispatch(toggleLoadingOverlay(true));
    else dispatch(toggleLoadingOverlay(false));
  }, [creatingCategory, updatingCategory, deletingCategory]);

  useEffect(() => {
    if (!modalOpened) categoryForm.reset();
  }, [modalOpened]);

  const AddOrUpdateCategory = (values) => {
    if (!isUpdating)
      dispatch(createCategory([values.newCategory, setModalOpened]));
    else
      dispatch(
        updateCategory([oldCategory, values.newCategory, setModalOpened])
      );
    setIsUpdating(false);
  };

  const DeleteCategory = (category) => {
    dispatch(deleteCategory(category));
  };

  return (
    <div>
      <Modal
        size="sm"
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
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
      </Modal>
      <Button onClick={() => setModalOpened(true)}>ADD CATEGORY</Button>
      {user?.categories?.map((category, index) => (
        <div key={index}>
          <p>{category}</p>
          <button onClick={() => DeleteCategory(category)}>Delete</button>
          <button
            onClick={() => {
              categoryForm.setValues({ newCategory: category });
              setOldCategory(category);
              setIsUpdating(true);
              setModalOpened(true);
            }}
          >
            Update
          </button>
        </div>
      ))}
    </div>
  );
};

export default Categories;
