import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logoutUser } from "../../store/user/ThunkFunctions/logoutUser";
import { deleteUser } from "../../store/user/ThunkFunctions/deleteUser";
import useStyles from "./Navbar.style";
import {
  Avatar,
  Menu,
  Input,
  Title,
  Text,
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  Divider,
  Modal,
  Alert,
  Button,
  Skeleton,
} from "@mantine/core";
import { useBooleanToggle, useMediaQuery } from "@mantine/hooks";
import {} from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import {
  Apps,
  CirclePlus,
  ChartBar,
  AlertCircle,
  Coin,
} from "tabler-icons-react";
import { toggleLoadingOverlay } from "../../store/utils";

const Navbar = () => {
  const dispatch = useDispatch();

  const { user, deletingUser, loggingOut } = useSelector((state) => state.user);

  const { currentMonth, currentYear } = useSelector((state) => state.expense);

  const { months } = useSelector((state) => state.utils);

  const smallScreen = useMediaQuery("(max-width: 576px)");

  const { classes, cx } = useStyles();

  const location = useLocation();

  const [burgerOpened, burgerToggleOpened] = useBooleanToggle(false);

  const [deleteConfirmBoxOpened, deleteConfirmBoxToggleOpened] =
    useBooleanToggle(false);

  const [activeNavLink, setNavLinkActive] = useState("");

  const [deleteText, setDeleteText] = useState("");

  const navigate = useNavigate();

  const links = [
    {
      label: "My Expenses",
      link: `/years/${currentYear}/${months[currentMonth - 1]}`,
      icon: Coin,
    },
    {
      label: "Add Expense",
      link: "/addExpense",
      icon: CirclePlus,
    },
    {
      label: "My Categories",
      link: "/categories",
      icon: Apps,
    },
    {
      label: "Visualize your data",
      link: "/visulization",
      icon: ChartBar,
    },
  ];

  useEffect(() => {
    setNavLinkActive(location.pathname);
  });

  useEffect(() => {
    if (loggingOut || deletingUser) dispatch(toggleLoadingOverlay(true));
    else dispatch(toggleLoadingOverlay(false));
  }, [loggingOut, deletingUser]);

  const items = links.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      className={cx(classes.link, {
        [classes.linkActive]: link.link.includes(activeNavLink),
      })}
      onClick={() => {
        setNavLinkActive(link.link);
        burgerToggleOpened();
      }}
    >
      <link.icon className={classes.linkIcon} />
      <span>{link.label}</span>
    </Link>
  ));

  return (
    <>
      <Modal
        opened={deleteConfirmBoxOpened}
        onClose={() => deleteConfirmBoxToggleOpened(false)}
        title={
          <Title order={4}>Are you sure you want to delete your account?</Title>
        }
      >
        <Group className={classes.deleteModalGroup}>
          <Alert
            style={{ width: "100%" }}
            icon={<AlertCircle size={16} />}
            color="red"
          >
            This action cannot be undone.
          </Alert>

          <Text>Once you delete your account, all your data will be lost.</Text>

          <Text>
            Please type <strong className="noSelect">delete my account</strong>{" "}
            to confirm:
          </Text>

          <Input
            style={{ width: "100%" }}
            value={deleteText}
            onChange={(e) => setDeleteText(e.target.value)}
            variant="default"
          />

          <Button
            fullWidth
            disabled={deleteText !== "delete my account"}
            color="red"
            onClick={() => {
              dispatch(deleteUser());
            }}
          >
            {deletingUser ? "Deleting..." : "Delete My Account"}
          </Button>
        </Group>
      </Modal>

      <Header height={smallScreen ? 60 : 70} mb={30} className={classes.root}>
        <Container size="xl" className={classes.header}>
          <Burger
            opened={burgerOpened}
            onClick={() => burgerToggleOpened()}
            size="sm"
            className={classes.burger}
          />

          <Transition
            transition="scale-y"
            duration={200}
            mounted={burgerOpened}
          >
            {(styles) => (
              <Paper className={classes.dropdown} withBorder style={styles}>
                {items}
              </Paper>
            )}
          </Transition>

          <img alt="logo" className={classes.logo} src="/Logo.png" />

          <Group spacing={5} className={classes.links}>
            {items}
          </Group>

          {user ? (
            <Menu
              className={classes.Menu}
              control={
                <Avatar
                  size="md"
                  referrerPolicy="no-referrer"
                  src={user.userAvatar}
                  alt="no image here"
                  color="indigo"
                  radius="xl"
                />
              }
            >
              <Menu.Item
                onClick={() => {
                  dispatch(logoutUser(navigate));
                }}
              >
                Logout
              </Menu.Item>
              <Divider />
              <Menu.Label>Danger zone</Menu.Label>
              <Menu.Item
                color="red"
                onClick={() => deleteConfirmBoxToggleOpened()}
              >
                Delete account
              </Menu.Item>
            </Menu>
          ) : (
            <Skeleton height={50} circle />
          )}
        </Container>
      </Header>
    </>
  );
};

export default Navbar;
