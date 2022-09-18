import React, { memo } from "react";
import { useMediaQuery } from "@mantine/hooks";
import {
	Table,
	UnstyledButton,
	Group,
	Text,
	Center,
	Button,
	ActionIcon,
	Stack,
	Image,
} from "@mantine/core";
import {
	Trash,
	Pencil,
	Selector,
	ChevronDown,
	ChevronUp,
} from "tabler-icons-react";
import { useStyles } from "./PaymentModeOrCategoryTable.style";

const PaymentModeOrCategoryTable = ({
	setOldValue,
	setIsUpdating,
	setEditOrUploadModalOpened,
	setDeleteModalOpened,
	setSelectDeleteItem,
	sortedData,
	setSortedData,
	sortData,
	search,
	sortBy,
	setSortBy,
	reverseSortDirection,
	setReverseSortDirection,
	type,
	data,
	title,
}) => {
	const smallerScreen = useMediaQuery("(max-width: 530px)");

	const { classes } = useStyles();

	function Th({ children, reversed, sorted, onSort }) {
		const { classes } = useStyles();
		const Icon = sorted ? (reversed ? ChevronUp : ChevronDown) : Selector;
		return (
			<th className={classes.th}>
				<UnstyledButton onClick={onSort} className={classes.control}>
					<Group position="center">
						<Text weight={500} size="sm">
							{children}
						</Text>
						<Center className={classes.icon}>
							<Icon size={14} />
						</Center>
					</Group>
				</UnstyledButton>
			</th>
		);
	}

	const ths = (
		<tr>
			<Th
				sorted={sortBy === type}
				reversed={reverseSortDirection}
				onSort={() => setSorting(type)}
			>
				{title} Name
			</Th>
			<th className={classes.th}>
				<Text weight={500} size="sm">
					Actions
				</Text>
			</th>
		</tr>
	);

	const rows = sortedData.map((item, index) => (
		<tr className={classes.row} key={index}>
			<td className={classes.td}>{item}</td>
			<td className={classes.td}>
				{!smallerScreen ? (
					<>
						<Button
							onClick={() => DeleteItem(item)}
							leftIcon={<Trash />}
							variant="light"
							color="red"
						>
							Delete
						</Button>
						<Button
							onClick={() => {
								setOldValue(item);
								setIsUpdating(true);
								setEditOrUploadModalOpened(true);
							}}
							leftIcon={<Pencil />}
							variant="light"
							color="blue"
							ml="sm"
						>
							Edit
						</Button>
					</>
				) : (
					<Group position="center">
						<ActionIcon
							onClick={() => DeleteItem(item)}
							variant="light"
							color="red"
						>
							<Trash size={16} />
						</ActionIcon>
						<ActionIcon
							onClick={() => {
								setOldValue(item);
								setIsUpdating(true);
								setEditOrUploadModalOpened(true);
							}}
							variant="light"
							color="blue"
						>
							<Pencil size={16} />
						</ActionIcon>
					</Group>
				)}
			</td>
		</tr>
	));

	const DeleteItem = (item) => {
		setDeleteModalOpened(true);
		setSelectDeleteItem(item);
	};

	const setSorting = (field) => {
		const reversed = field === sortBy ? !reverseSortDirection : false;
		setReverseSortDirection(reversed);
		setSortBy(field);
		setSortedData(sortData(data, { sortBy: field, reversed, search }));
	};

	return (
		<>
			<Table
				highlightOnHover
				verticalSpacing={smallerScreen && "xs"}
				fontSize="sm"
			>
				<thead className={classes.header}>{ths}</thead>
				{data.length > 0 && <tbody>{rows}</tbody>}
			</Table>
			{(data.length < 1 || rows?.length < 1) && (
				<Stack mt="lg" align="center">
					<Image
						className={classes.noResultImage}
						src="/no-result.svg"
						alt="no-result"
					/>
					<Text color="grey">No {type} found</Text>
				</Stack>
			)}
		</>
	);
};

export default memo(PaymentModeOrCategoryTable);
