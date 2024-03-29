import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./UpperNavbar.style";
import {
    Header,
    Container,
    Group,
    Burger,
    Image,
    Title,
    Button,
    Tooltip,
    ActionIcon,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Check, Plus, X } from "tabler-icons-react";
import { toggleLoadingOverlay } from "../../../store/utils";
import DeleteUserConfirmModal from "./DeleteUserConfirmModal/DeleteUserConfirmModal";
import AvatarMenu from "./AvatarMenu/AvatarMenu";
import { signOut } from "firebase/auth";
import { Auth } from "../../../firebase";
import { MakeUnAuthenticated, loggingOutToggler } from "../../../store/user";
import { showNotification } from "@mantine/notifications";
import { Link } from "react-router-dom";

const UpperNavbar = ({ opened, setOpened }) => {
    const dispatch = useDispatch();

    const { deletingUser, loggingOut } = useSelector((state) => state.user);

    const smallScreen = useMediaQuery("(max-width: 775px)");
    const smallerScreen = useMediaQuery("(max-width: 660px)");

    const { classes } = useStyles({ opened });

    const [deleteConfirmBoxOpened, deleteConfirmBoxToggleOpened] =
        useState(false);

    useEffect(() => {
        dispatch(toggleLoadingOverlay(loggingOut || deletingUser));
    }, [loggingOut, deletingUser]);

    const handleLogoutUser = (message) => {
        dispatch(loggingOutToggler(true));

        // get current seconds since epoch to use as a unique id
        const getCurrentSeconds = () => Math.floor(Date.now() / 1000);
        signOut(Auth)
            .then(() => {
                if (message) {
                    // Sign-out successful.
                    dispatch(MakeUnAuthenticated());
                    showNotification({
                        id: `logout-${getCurrentSeconds()}`,
                        message,
                        color: "teal",
                        icon: <Check size={15} />,
                    });
                }
            })
            .catch((error) => {
                // An error happened.
                showNotification({
                    id: `logout-${getCurrentSeconds()}`,
                    message: error.message || "Something went wrong",
                    color: "red",
                    icon: <X size={15} />,
                });
            })
            .finally(() => {
                dispatch(loggingOutToggler(false));
            });
    };

    return (
        <>
            <DeleteUserConfirmModal
                deleteConfirmBoxOpened={deleteConfirmBoxOpened}
                deleteConfirmBoxToggleOpened={deleteConfirmBoxToggleOpened}
                handleLogoutUser={handleLogoutUser}
            />
            <Header height={50} className={classes.root}>
                <Container size="xl" className={classes.header}>
                    <Group spacing={0}>
                        {smallScreen && (
                            <Burger
                                opened={opened}
                                onClick={() => setOpened((opened) => !opened)}
                                size="sm"
                            />
                        )}
                        <Group spacing={0}>
                            <Image
                                alt="logo"
                                className={classes.logo}
                                src="/Logo.png"
                            />
                            <Title className={classes.Title}>
                                Expense Tracker
                            </Title>
                        </Group>
                    </Group>
                    <Group
                        style={{ minWidth: smallerScreen ? "50px" : "180px" }}
                        position="apart"
                    >
                        {!smallerScreen ? (
                            <Button
                                size="xs"
                                leftIcon={<Plus size={14} />}
                                component={Link}
                                to="/addExpense"
                            >
                                Expense
                            </Button>
                        ) : (
                            <Tooltip label="Add Expense">
                                <ActionIcon
                                    color="blue.8"
                                    size={26}
                                    variant="filled"
                                    component={Link}
                                    to="/addExpense"
                                >
                                    <Plus size={14} />
                                </ActionIcon>
                            </Tooltip>
                        )}
                        <AvatarMenu
                            deleteConfirmBoxToggleOpened={
                                deleteConfirmBoxToggleOpened
                            }
                            handleLogoutUser={handleLogoutUser}
                        />
                    </Group>
                </Container>
            </Header>
        </>
    );
};

export default memo(UpperNavbar);
