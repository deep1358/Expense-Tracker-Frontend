import React, { useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../../store/user/ThunkFunctions/createCategory";
import { deleteCategory } from "../../store/user/ThunkFunctions/deleteCategory";
import { updateCategory } from "../../store/user/ThunkFunctions/updateCategory";

const Categories = () => {
	const [newCategory, setNewCategory] = useState("");
	const [oldCategory, setOldCategory] = useState("");
	const [isUpdating, setIsUpdating] = useState(false);

	const {
		user,
		isCreatingCategory,
		isFetchingCategories,
		isDeletingCategory,
		isUpdatingCategory,
	} = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const AddOrUpdateCategory = () => {
		if (!isUpdating) dispatch(createCategory(newCategory));
		else dispatch(updateCategory([oldCategory, newCategory]));
		setNewCategory("");
	};

	const DeleteCategory = (category) => {
		dispatch(deleteCategory(category));
	};

	const inputRef = useRef();

	if (isCreatingCategory) return <p>Creating Categories...</p>;
	if (isFetchingCategories) return <p>Fetching Categories...</p>;
	if (isDeletingCategory) return <p>Deleting Category...</p>;
	if (isUpdatingCategory) return <p>Updating Category...</p>;
	return (
		<div>
			<form onSubmit={AddOrUpdateCategory}>
				<input
					ref={inputRef}
					type="text"
					placeholder="Add Category"
					onChange={(e) => setNewCategory(e.target.value)}
					value={newCategory}
					required
				/>
				<button type="submit">{isUpdating ? "Update" : "Add"}</button>
			</form>
			{user?.categories?.map((category, index) => (
				<div key={index}>
					<p>{category}</p>
					<button onClick={() => DeleteCategory(category)}>Delete</button>
					<button
						onClick={() => {
							setNewCategory(category);
							setOldCategory(category);
							setIsUpdating(true);
							inputRef.current.focus();
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
