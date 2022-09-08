import { ActionIcon, Button, Drawer, Group, Tooltip } from "@mantine/core";
import React, { memo, useState } from "react";
import { useSelector } from "react-redux";
import { Filter, Plus } from "tabler-icons-react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import CategoryFilterButton from "./FilterButtons/CategoryFilterButton/CategoryFilterButton";
import FilteredChips from "../../FilteredChips/FilteredChips";
import SelectPaymentMode from "../../SelectPaymentMode/SelectPaymentMode";

const FilterBar = ({ appliedFilters, handleAppliedFilters }) => {
	const { expenses } = useSelector((state) => state.expense);

	const { category, payment_mode } = appliedFilters;

	const smallerScreen = useMediaQuery("(max-width: 630px)");

	const [dayWiseFilterOpened, setDayWiseFilterOpened] = useState(false);

	const FilterButtons = ({ forDrawer = false }) => (
		<>
			<CategoryFilterButton
				forDrawer={forDrawer}
				category={category}
				handleAppliedFilters={handleAppliedFilters}
			/>
			<SelectPaymentMode
				forDayWiseExpense={!smallerScreen}
				payment_mode={payment_mode}
				handleAppliedFilters={handleAppliedFilters}
			/>
		</>
	);

	return (
		<>
			{smallerScreen && (
				<Drawer
					position="right"
					opened={dayWiseFilterOpened}
					onClose={() => setDayWiseFilterOpened(false)}
					title="Day Wise Expense Filters"
					padding="xl"
					size={350}
					style={{ zIndex: 1000, opacity: 0.95 }}
				>
					<FilterButtons forDrawer={true} />
				</Drawer>
			)}
			<Group position="apart" style={{ width: "100%" }}>
				<>
					{smallerScreen && (
						<FilteredChips
							appliedFilters={appliedFilters}
							handleAppliedFilters={handleAppliedFilters}
						/>
					)}
				</>
				<Group
					style={{ width: !smallerScreen && "100%" }}
					align={smallerScreen ? "center" : "flex-end"}
					position="right"
				>
					{expenses?.length > 0 &&
						(!smallerScreen ? (
							<FilterButtons />
						) : (
							<Tooltip label="filter">
								<ActionIcon
									onClick={() => setDayWiseFilterOpened(true)}
									variant="filled"
								>
									<Filter size={18} />
								</ActionIcon>
							</Tooltip>
						))}

					{!smallerScreen ? (
						<Button
							size="xs"
							leftIcon={<Plus size={14} />}
							component={Link}
							to="/addExpense"
						>
							ADD EXPENSE
						</Button>
					) : (
						<Tooltip label="Add Expense">
							<ActionIcon
								color="blue.8"
								variant="filled"
								component={Link}
								to="/addExpense"
							>
								<Plus size={18} />
							</ActionIcon>
						</Tooltip>
					)}
				</Group>
			</Group>
		</>
	);
};

export default memo(FilterBar);