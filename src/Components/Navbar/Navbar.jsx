import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logoutUser } from "../../store/user/ThunkFunctions/logoutUser";
import useStyles from "./Navbar.style";
import { Avatar, Menu } from "@mantine/core";
import { Anchor } from "@mantine/core";
import { Text } from "@mantine/core";
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  Divider,
} from "@mantine/core";
import { useBooleanToggle } from "@mantine/hooks";
import { useDisclosure } from "@mantine/hooks";
import { useMediaQuery } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { BellRinging, CirclePlus, ChartBar } from "tabler-icons-react";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { currentMonth, currentYear } = useSelector((state) => state.expense);

  const { months } = useSelector((state) => state.utils);

  const [menuOpened, handlers] = useDisclosure(false);

  // const { classes } = useStyles();
  const smallScreen = useMediaQuery("(max-width: 576px)");

  const HEADER_HEIGHT = 60;

  const useStyles = createStyles((theme, _params, getRef) => {
    const icon = getRef("icon");
    return {
      root: {
        position: "sticky",
        zIndex: 1,
        backgroundColor: theme.colors.dark[6],
      },

      header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
      },
      links: {
        "@media (max-width: 920px)": {
          display: "none",
        },
      },

      //   link: {
      //     display: "block",
      //     lineHeight: 1,
      //     padding: "8px 12px",
      //     borderRadius: theme.radius.sm,
      //     textDecoration: "none",
      //     color:
      //       theme.colorScheme === "dark"
      //         ? theme.colors.dark[0]
      //         : theme.colors.gray[7],
      //     fontSize: theme.fontSizes.sm,
      //     fontWeight: 500,

      //     "&:hover": {
      //       backgroundColor:
      //         theme.colorScheme === "dark"
      //           ? theme.colors.dark[6]
      //           : theme.colors.gray[0],
      //     },

      //     [theme.fn.smallerThan("sm")]: {
      //       borderRadius: 0,
      //       padding: theme.spacing.md,
      //     },
      //   },

      //   linkActive: {
      //     "&, &:hover": {
      //       backgroundColor:
      //         theme.colorScheme === "dark"
      //           ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
      //           : theme.colors[theme.primaryColor][0],
      //       color:
      //         theme.colors[theme.primaryColor][
      //           theme.colorScheme === "dark" ? 3 : 7
      //         ],
      //     },
      //   },

      link: {
        ...theme.fn.focusStyles(),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "none",
        fontSize: theme.fontSizes.sm,
        "@media (min-width: 920px)": {
          borderRadius: theme.radius.sm,
        },
        color:
          theme.colorScheme === "dark"
            ? theme.colors.dark[1]
            : theme.colors.gray[7],
        padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
        fontWeight: 500,

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
          color: theme.colorScheme === "dark" ? theme.white : theme.black,

          [`& .${icon}`]: {
            color: theme.colorScheme === "dark" ? theme.white : theme.black,
          },
        },
      },

      linkIcon: {
        ref: icon,
        color:
          theme.colorScheme === "dark"
            ? theme.colors.dark[2]
            : theme.colors.gray[6],
        marginRight: theme.spacing.sm,
      },

      linkActive: {
        "&, &:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.fn.rgba(theme.colors[theme.primaryColor][8], 0.25)
              : theme.colors[theme.primaryColor][0],
          color:
            theme.colorScheme === "dark"
              ? theme.white
              : theme.colors[theme.primaryColor][7],
          [`& .${icon}`]: {
            color:
              theme.colors[theme.primaryColor][
                theme.colorScheme === "dark" ? 5 : 7
              ],
          },
        },
      },

      Text: {
        fontSize: "1.5rem",
        [theme.fn.largerThan("xs")]: {
          fontSize: "2rem",
        },
        "@media (max-width: 350px)": {
          fontSize: "1.2rem",
        },
        fontFamily: "Rubik Moonrocks, cursive",
        textDecoration: "none",
      },

      avatar: {},

      menu: {
        [theme.fn.largerThan("md")]: {
          display: "none",
        },
        cursor: "pointer",
      },

      burger: {
        // marginRight: theme.spacing.md,

        "@media (min-width: 920px)": {
          display: "none",
        },
      },

      dropdown: {
        position: "absolute",
        top: HEADER_HEIGHT,
        left: 0,
        right: 0,
        zIndex: 0,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderTopWidth: 0,
        overflow: "hidden",

        "@media (min-width: 920px)": {
          display: "none",
        },
      },

      Menu: {
        cursor: "pointer",
      },
    };
  });

  const links = [
    {
      label: "Add Expense",
      link: "/addExpense",
      icon: CirclePlus,
    },
    {
      label: "My Categories",
      link: "/categories",
      icon: BellRinging,
    },
    {
      label: "Visualize your data",
      link: "/visulization",
      icon: ChartBar,
    },
  ];

  const { classes, cx } = useStyles();

  const location = useLocation();

  const [opened, toggleOpened] = useBooleanToggle(false);

  const [active, setActive] = useState("");

  useEffect(() => {
    setActive(location.pathname);
  });

  const navigate = useNavigate();

  const items = links.map((link) => (
    <React.Fragment key={link.label}>
      <Link
        to={link.link}
        className={cx(classes.link, {
          [classes.linkActive]: active === link.link,
        })}
        onClick={() => {
          setActive(link.link);
        }}
      >
        <link.icon className={classes.linkIcon} />
        {link.label}
      </Link>
    </React.Fragment>
  ));

  if (user)
    return (
      <Header height={HEADER_HEIGHT} mb={30} className={classes.root}>
        <Container size="xl" className={classes.header}>
          <Burger
            opened={opened}
            onClick={() => toggleOpened()}
            size="sm"
            className={classes.burger}
          />

          <Transition
            transition="pop-top-right"
            duration={200}
            mounted={opened}
          >
            {(styles) => (
              <Paper className={classes.dropdown} withBorder style={styles}>
                {items}
              </Paper>
            )}
          </Transition>
          <Text className={classes.Text} weight={700} transform="uppercase">
            Expense Tracker
          </Text>

          <Group spacing={5} className={classes.links}>
            {items}
          </Group>
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
            <Menu.Item color="red">Delete account</Menu.Item>
          </Menu>
        </Container>
      </Header>
    );
  else return <p>Loading...</p>;
};

export default Navbar;

// <p>{user.userName}</p>
// <button onClick={() => dispatch(logoutUser())}>Logout</button>
// <Anchor component={Link} to="year">
// 	React router link
// </Anchor>
// <button>
// 	<Link to="/year">Year</Link>
// </button>
// <button>
// 	<Link to={`/year/${currentYear}`}>{currentYear}</Link>
// </button>
// <button>
// 	<Link to={`/year/${currentYear}/${months[currentMonth - 1]}`}>
// 		{months[currentMonth - 1]}
// 	</Link>
// </button>
// <button>
// 	<Link to="addExpense">Add Expense</Link>
// </button>
// <button>
// 	<Link to="categories">My Categories</Link>
// </button>
// <button>
// 	<Link to="visulization">Vizulization</Link>
// </button>
