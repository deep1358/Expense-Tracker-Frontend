import {
    ActionIcon,
    Button,
    Container,
    ScrollArea,
    Stack,
    TextInput,
    Title,
    Tooltip,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChartBar, Plus, Search } from "tabler-icons-react";
import { getYearWiseExpense } from "../../store/expense/ThunkFunctions/getYearWiseExpense";
import { toggleLoadingOverlay } from "../../store/utils";
import { ConvertToTitleCase } from "../../utils/ConvertToTitleCase";
import AddOrUpdateModal from "../AddOrUpdateModal/AddOrUpdateModal";
import CategoryChart from "../Charts/CategoryChart/CategoryChart";
import DeleteConfirmModal from "./DeleteConfirmModal/DeleteConfirmModal";
import PaymentModeChart from "../Charts/PaymentModeChart/PaymentModeChart";
import PaymentModeOrCategoryTable from "./PaymentModeOrCategoryTable/PaymentModeOrCategoryTable";
import { useStyles } from "./PaymentModeOrCategory.style";

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

    const [categoryWiseChartOpened, setCategoryWiseChartOpened] =
        useState(false);
    const [paymentModeWiseChartOpened, setPaymentModeWiseChartOpened] =
        useState(false);

    const { user, deletingCategory, deletingPaymentMode } = useSelector(
        (state) => state.user
    );
    const dispatch = useDispatch();

    const [title, setTitle] = useState("");

    useEffect(() => {
        setTitle(ConvertToTitleCase(type));
    }, [type]);

    useEffect(() => {
        dispatch(toggleLoadingOverlay(deletingCategory || deletingPaymentMode));
    }, [deletingCategory, deletingPaymentMode]);

    useEffect(() => {
        setSortedData(
            sortData(data, { sortBy, reversed: reverseSortDirection, search })
        );
    }, [user, sortBy, reverseSortDirection, search]);

    useEffect(() => {
        (paymentModeWiseChartOpened || categoryWiseChartOpened) &&
            dispatch(getYearWiseExpense());
    }, [paymentModeWiseChartOpened, categoryWiseChartOpened]);

    function filterData(data) {
        const query = search.toLowerCase().trim();
        return data.filter((item) => item.toLowerCase().includes(query));
    }

    function sortData(data, { sortBy, reversed, search }) {
        if (!sortBy) {
            return filterData(data, search);
        }

        return filterData(
            [...data].sort((a, b) => {
                if (reversed) {
                    return b.localeCompare(a);
                }

                return a.localeCompare(b);
            }),
            search
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

    const { classes } = useStyles();

    return (
        <>
            <CategoryChart
                categoryWiseChartOpened={categoryWiseChartOpened}
                setCategoryWiseChartOpened={setCategoryWiseChartOpened}
            />
            <PaymentModeChart
                paymentModeWiseChartOpened={paymentModeWiseChartOpened}
                setPaymentModeWiseChartOpened={setPaymentModeWiseChartOpened}
            />
            <DeleteConfirmModal
                deleteModalOpened={deleteModalOpened}
                setDeleteModalOpened={setDeleteModalOpened}
                setSelectDeleteItem={setSelectDeleteItem}
                selectDeleteItem={selectDeleteItem}
                type={type}
            />

            <AddOrUpdateModal
                opened={editOrUploadModalOpened}
                setOpened={setEditOrUploadModalOpened}
                isUpdating={isUpdating}
                setIsUpdating={setIsUpdating}
                oldValue={oldValue}
                type={type}
            />

            <Container
                mt={10}
                className={classes.container}
                size={smallerScreen ? "100vw" : "sm"}
            >
                <Tooltip
                    className={classes.barIcon}
                    label="Insights"
                    withArrow
                    arrowSize={5}
                >
                    <ActionIcon
                        color="dark.6"
                        onClick={() => {
                            if (type === "category")
                                setCategoryWiseChartOpened((pre) => !pre);
                            else setPaymentModeWiseChartOpened((pre) => !pre);
                        }}
                        variant="filled"
                    >
                        <ChartBar size={16} />
                    </ActionIcon>
                </Tooltip>
                <Title mb={20} order={2} weight={300}>
                    {title}
                </Title>

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
                        />
                    )}
                    <ScrollArea
                        sx={{ height: "calc(75vh - 70px)", width: "100%" }}
                    >
                        <PaymentModeOrCategoryTable
                            setOldValue={setOldValue}
                            setIsUpdating={setIsUpdating}
                            setEditOrUploadModalOpened={
                                setEditOrUploadModalOpened
                            }
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

export default memo(PaymentModeOrCategory);
