import {
	Button,
	Container,
	ScrollArea,
	Stack,
	TextInput,
	Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus, Search } from "tabler-icons-react";
import { toggleLoadingOverlay } from "../../store/utils";
import { ConvertToTitleCase } from "../../utils/ConvertToTitleCase";
import AddOrUpdateModal from "../AddOrUpdateModal/AddOrUpdateModal";
import DeleteConfirmModal from "./DeleteConfirmModal/DeleteConfirmModal";
import PaymentModeOrCategoryTable from "./PaymentModeOrCategoryTable/PaymentModeOrCategoryTable";

const PaymentModeOrCategory = ({ data, type }) => {
	const [oldValue, setOldValue] = useState("");
	const [isUpdating, setIsUpdating] = useState(false);
	const [editOrUploadModalOpened, setEditOrUploadModalOpened] =
		useState(false);
	const [deleteModalOpened, setDeleteModalOpened] = useState(false);
	const [selectDeleteItem, setSelectDeleteItem] = useState("");

	const [search, setSearch] = useState("");
	const [sortedData, setSortedData] = useState([]);
	const [sortBy, setSortBy] = useState(null);
	const [reverseSortDirection, setReverseSortDirection] = useState(false);

	const [title, setTitle] = useState("");

	const { user, deletingCategory, deletingPaymentMode } = useSelector(
		(state) => state.user
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(toggleLoadingOverlay(deletingCategory || deletingPaymentMode));
	}, [deletingCategory, deletingPaymentMode]);

	useEffect(() => {
		setSortedData(data || []);
	}, [user]);

	useEffect(() => {
		setTitle(ConvertToTitleCase(type));
	}, [type]);

	function filterData(data, search) {
		const query = search.toLowerCase().trim();
		return data.filter((item) => item.toLowerCase().includes(query));
	}

	function sortData(data, payload) {
		if (!payload.sortBy) {
			return filterData(data, payload.search);
		}

		return filterData(
			[...data].sort((a, b) => {
				if (payload.reversed) {
					return b.localeCompare(a);
				}

				return a.localeCompare(b);
			}),
			payload.search
		);
	}

	const handleSearchChange = (event) => {
		const { value } = event.currentTarget;
		setSearch(value);
		setSortedData(
			sortData(data, {
				sortBy,
				reversed: reverseSortDirection,
				search: value,
			})
		);
	};

	const smallerScreen = useMediaQuery("(max-width: 530px)");

	return (
		<>
			<DeleteConfirmModal
				deleteModalOpened={deleteModalOpened}
				setDeleteModalOpened={setDeleteModalOpened}
				setSelectDeleteItem={setSelectDeleteItem}
				selectDeleteItem={selectDeleteItem}
				type={type}
				title={title}
			/>

			<AddOrUpdateModal
				opened={editOrUploadModalOpened}
				setOpened={setEditOrUploadModalOpened}
				isUpdating={isUpdating}
				setIsUpdating={setIsUpdating}
				oldValue={oldValue}
				type={type}
				title={title}
			/>

			<Container size={smallerScreen ? "100vw" : "sm"}>
				<Title order={2}>{title}</Title>

				<Stack align="flex-end">
					<Button
						size={smallerScreen ? "xs" : "sm"}
						leftIcon={<Plus />}
						onClick={() => setEditOrUploadModalOpened(true)}
					>
						{`ADD ${title}`}
					</Button>
					{data?.length > 0 && (
						<TextInput
							sx={{ width: "100%" }}
							placeholder={`Search by ${title} Name`}
							icon={<Search size={14} />}
							value={search}
							onChange={handleSearchChange}
							mb="sm"
						/>
					)}
					<ScrollArea sx={{ height: "calc(75vh - 50px)", width: "100%" }}>
						<PaymentModeOrCategoryTable
							setOldValue={setOldValue}
							setIsUpdating={setIsUpdating}
							setEditOrUploadModalOpened={setEditOrUploadModalOpened}
							setDeleteModalOpened={setDeleteModalOpened}
							setSelectDeleteItem={setSelectDeleteItem}
							sortedData={sortedData}
							setSortedData={setSortedData}
							sortData={sortData}
							search={search}
							sortBy={sortBy}
							setSortBy={setSortBy}
							reverseSortDirection={reverseSortDirection}
							setReverseSortDirection={setReverseSortDirection}
							type={type}
							data={data}
							title={title}
						/>
					</ScrollArea>
				</Stack>
			</Container>
		</>
	);
};

export default PaymentModeOrCategory;
