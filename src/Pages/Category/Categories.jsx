import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../../store/user/ThunkFunctions/createCategory";
import { deleteCategory } from "../../store/user/ThunkFunctions/deleteCategory";
import { updateCategory } from "../../store/user/ThunkFunctions/updateCategory";
import {
  Modal,
  TextInput,
  Button,
  Title,
  Table,
  Center,
  Container,
  createStyles,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Stack,
  ActionIcon,
  Alert,
  Image,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { toggleLoadingOverlay } from "../../store/utils";
import {
  Trash,
  Pencil,
  Search,
  Selector,
  ChevronDown,
  ChevronUp,
  Plus,
  AlertCircle,
} from "tabler-icons-react";

const Categories = () => {
  const [oldCategory, setOldCategory] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [editOrUploadModalOpened, setEditOrUploadModalOpened] = useState(false);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [selectDeleteCategory, setSelectDeleteCategory] = useState("");

  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

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

  const smallerScreen = useMediaQuery("(max-width: 530px)");

  useEffect(() => {
    if (creatingCategory || deletingCategory || updatingCategory)
      dispatch(toggleLoadingOverlay(true));
    else dispatch(toggleLoadingOverlay(false));
  }, [creatingCategory, updatingCategory, deletingCategory]);

  useEffect(() => {
    if (!editOrUploadModalOpened) categoryForm.reset();
  }, [editOrUploadModalOpened]);

  useEffect(() => {
    setSortedData(user?.categories);
  }, [user]);

  const useStyles = createStyles((theme) => ({
    header: {
      position: "sticky",
      top: 0,
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      transition: "box-shadow 150ms ease",
      zIndex: 1,

      "&::after": {
        content: '""',
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        borderBottom: `1px solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[3]
            : theme.colors.gray[2]
        }`,
      },
    },

    th: {
      padding: "0 !important",
      textAlign: "center !important",
      minHeight: "40px",
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.gray[7],

      "&:first-of-type": {
        borderTopLeftRadius: "3px",
      },
      "&:last-of-type": {
        borderTopRightRadius: "3px",
      },
    },

    control: {
      width: "100%",
      padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
      textAlign: "center",

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
      },
    },

    td: {
      textAlign: "center",

      "@media (max-width: 530px)": {
        fontSize: "0.8rem !important",
      },
    },

    noResultImage: {
      width: "200px",
    },
  }));

  const { classes } = useStyles();

  const AddOrUpdateCategory = (values) => {
    if (!isUpdating)
      dispatch(
        createCategory([values.newCategory, setEditOrUploadModalOpened])
      );
    else
      dispatch(
        updateCategory([
          oldCategory,
          values.newCategory,
          setEditOrUploadModalOpened,
        ])
      );
    setIsUpdating(false);
  };

  const DeleteCategory = (category) => {
    setDeleteModalOpened(true);
    setSelectDeleteCategory(category);
  };

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

  const setSorting = (field) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(
      sortData(user?.categories, { sortBy: field, reversed, search })
    );
  };

  const handleSearchChange = (event) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(user?.categories, {
        sortBy,
        reversed: reverseSortDirection,
        search: value,
      })
    );
  };

  const ths = (
    <tr>
      <Th
        sorted={sortBy === "category"}
        reversed={reverseSortDirection}
        onSort={() => setSorting("category")}
      >
        Category Name
      </Th>
      <th className={classes.th}>
        <Text weight={500} size={smallerScreen ? 18 : "sm"}>
          Actions
        </Text>
      </th>
    </tr>
  );

  const rows = sortedData.map((category, index) => (
    <tr key={index}>
      <td className={classes.td}>{category}</td>
      <td className={classes.td}>
        {!smallerScreen ? (
          <>
            <Button
              onClick={() => DeleteCategory(category)}
              leftIcon={<Trash />}
              variant="light"
              color="red"
            >
              Delete
            </Button>
            <Button
              onClick={() => {
                categoryForm.setValues({ newCategory: category });
                setOldCategory(category);
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
              onClick={() => DeleteCategory(category)}
              variant="light"
              color="red"
            >
              <Trash size={16} />
            </ActionIcon>
            <ActionIcon
              onClick={() => {
                categoryForm.setValues({ newCategory: category });
                setOldCategory(category);
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

  return (
    <>
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
            This action cannot be undone.
          </Alert>

          <Text>
            Once you delete this category, all expense related to this category
            will also be deleted.
          </Text>

          <Button
            fullWidth
            color="red"
            onClick={() => {
              if (selectDeleteCategory !== "") {
                dispatch(
                  deleteCategory([selectDeleteCategory, setDeleteModalOpened])
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
      <Modal
        size="sm"
        opened={editOrUploadModalOpened}
        onClose={() => setEditOrUploadModalOpened(false)}
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
            <Table
              highlightOnHover
              verticalSpacing={smallerScreen && "xs"}
              fontSize="sm"
            >
              <thead className={classes.header}>{ths}</thead>
              {user?.categories?.length > 0 && <tbody>{rows}</tbody>}
            </Table>
            {!user?.categories?.length > 0 && (
              <Stack mt="lg" align="center">
                <Image
                  className={classes.noResultImage}
                  src="/no-result.svg"
                  alt="no-result"
                />
                <Text color="grey">No Category found</Text>
              </Stack>
            )}
          </ScrollArea>
        </Stack>
      </Container>
    </>
  );
};

export default Categories;
