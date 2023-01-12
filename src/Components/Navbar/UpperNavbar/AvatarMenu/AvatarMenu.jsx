import React from "react";
import {
    Menu,
    Avatar,
    Text,
    Group,
    Divider,
    Stack,
    Title,
} from "@mantine/core";
import { useSelector } from "react-redux";
import { useStyles } from "./AvatarMenu.style";
import { Trash, Logout } from "tabler-icons-react";

const AvatarMenu = ({ deleteConfirmBoxToggleOpened, handleLogoutUser }) => {
    const { user } = useSelector((state) => state.user);

    const { classes } = useStyles();

    return (
        <Menu
            position="bottom-end"
            icon={<Trash size={14} />}
            className={classes.Menu}
        >
            <Menu.Target>
                <Avatar
                    size="sm"
                    referrerPolicy="no-referrer"
                    src={user.userAvatar}
                    alt="User Avatar"
                    color="indigo"
                    radius="xl"
                />
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item
                    style={{
                        pointerEvents: "none",
                    }}
                >
                    <Stack spacing={0}>
                        <Title order={6}>{user.userName}</Title>
                        <Text color="grey">{user.userEmail}</Text>
                    </Stack>
                </Menu.Item>
                <Menu.Item
                    onClick={() => handleLogoutUser("Logged out successfully!")}
                >
                    <Group>
                        <Logout size={16} />
                        <Text>Logout</Text>
                    </Group>
                </Menu.Item>
                <Divider />
                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item
                    color="red"
                    onClick={() => deleteConfirmBoxToggleOpened(true)}
                >
                    <Group>
                        <Trash size={16} />
                        <Text>Delete account</Text>
                    </Group>
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};

export default AvatarMenu;
