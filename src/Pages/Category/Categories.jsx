import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextInput, Button, Container, ScrollArea, Stack } from "@mantine/core";
import { toggleLoadingOverlay } from "../../store/utils";
import { Search, Plus } from "tabler-icons-react";
import DeleteCategoryConfirmModal from "../../Components/PaymentModeOrCategory/DeleteConfirmModal/DeleteConfirmModal";
import CategoryTable from "../../Components/PaymentModeOrCategory/PaymentModeOrCategoryTable/PaymentModeOrCategoryTable";
import { useMediaQuery } from "@mantine/hooks";
import AddOrUpdateModal from "../../Components/AddOrUpdateModal/AddOrUpdateModal";
import PaymentModeOrCategory from "../../Components/PaymentModeOrCategory/PaymentModeOrCategory";

const Categories = () => {
	// const [oldCategory, setOldCategory] = useState("");
	// const [isUpdating, setIsUpdating] = useState(false);
	// const [editOrUploadModalOpened, setEditOrUploadModalOpened] =
	// 	useState(false);
	// const [deleteModalOpened, setDeleteModalOpened] = useState(false);
	// const [selectDeleteCategory, setSelectDeleteCategory] = useState("");

	// const [search, setSearch] = useState("");
	// const [sortedData, setSortedData] = useState([]);
	// const [sortBy, setSortBy] = useState(null);
	// const [reverseSortDirection, setReverseSortDirection] = useState(false);

	const { user } = useSelector((state) => state.user);
	// const dispatch = useDispatch();

	// useEffect(() => {
	// 	dispatch(toggleLoadingOverlay(deletingCategory));
	// }, [deletingCategory]);

	// useEffect(() => {
	// 	setSortedData(user?.categories);
	// }, [user]);

	// function filterData(data, search) {
	// 	const query = search.toLowerCase().trim();
	// 	return data.filter((item) => item.toLowerCase().includes(query));
	// }

	// function sortData(data, payload) {
	// 	if (!payload.sortBy) {
	// 		return filterData(data, payload.search);
	// 	}

	// 	return filterData(
	// 		[...data].sort((a, b) => {
	// 			if (payload.reversed) {
	// 				return b.localeCompare(a);
	// 			}

	// 			return a.localeCompare(b);
	// 		}),
	// 		payload.search
	// 	);
	// }

	// const handleSearchChange = (event) => {
	// 	const { value } = event.currentTarget;
	// 	setSearch(value);
	// 	setSortedData(
	// 		sortData(user?.categories, {
	// 			sortBy,
	// 			reversed: reverseSortDirection,
	// 			search: value,
	// 		})
	// 	);
	// };

	// const smallerScreen = useMediaQuery("(max-width: 530px)");

	return (
		<>
			<PaymentModeOrCategory
				type="category"
				data={user?.categories || [s]}
			/>
			{/* <DeleteCategoryConfirmModal
				deleteModalOpened={deleteModalOpened}
				setDeleteModalOpened={setDeleteModalOpened}
				setSelectDeleteCategory={setSelectDeleteCategory}
				selectDeleteCategory={selectDeleteCategory}
			/>

			<AddOrUpdateModal
				opened={editOrUploadModalOpened}
				setOpened={setEditOrUploadModalOpened}
				isUpdating={isUpdating}
				setIsUpdating={setIsUpdating}
				oldValue={oldCategory}
				type="category"
			/>

			<Container size={smallerScreen ? "100vw" : "sm"}>
				<Stack align="flex-end">
					<Button
						size={smallerScreen ? "xs" : "sm"}
						leftIcon={<Plus />}
						onClick={() => setEditOrUploadModalOpened(true)}
					>
						ADD CATEGORY
					</Button>
					{user?.categories?.length > 0 && (
						<TextInput
							sx={{ width: "100%" }}
							placeholder="Search by Category Name"
							icon={<Search size={14} />}
							value={search}
							onChange={handleSearchChange}
							mb="sm"
						/>
					)}
					<ScrollArea sx={{ height: "calc(75vh - 50px)", width: "100%" }}>
						<CategoryTable
							setOldCategory={setOldCategory}
							setIsUpdating={setIsUpdating}
							setEditOrUploadModalOpened={setEditOrUploadModalOpened}
							setDeleteModalOpened={setDeleteModalOpened}
							setSelectDeleteCategory={setSelectDeleteCategory}
							sortedData={sortedData}
							setSortedData={setSortedData}
							sortData={sortData}
							search={search}
							sortBy={sortBy}
							setSortBy={setSortBy}
							reverseSortDirection={reverseSortDirection}
							setReverseSortDirection={setReverseSortDirection}
						/>
					</ScrollArea>
				</Stack>
					</Container> */}
		</>
	);
};

export default Categories;
