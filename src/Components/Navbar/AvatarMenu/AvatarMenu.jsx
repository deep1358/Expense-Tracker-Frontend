import React from "react";
import { Menu, Avatar, Text, Group, Divider } from "@mantine/core";
import { useSelector } from "react-redux";
import { useStyles } from "./AvatarMenu.style";
import { Trash, Logout, Apps, Wallet } from "tabler-icons-react";
import { useNavigate } from "react-router-dom";

const AvatarMenu = ({ deleteConfirmBoxToggleOpened, handleLogoutUser }) => {
	const { user } = useSelector((state) => state.user);

	const { classes } = useStyles();

	const navigate = useNavigate();

	return (
		<Menu
			icon={<Trash size={14} />}
			width={220}
			trigger="hover"
			className={classes.Menu}
		>
			<Menu.Target>
				<Avatar
					size="md"
					referrerPolicy="no-referrer"
					src={user.userAvatar}
					alt="User Avatar"
					color="indigo"
					radius="xl"
				/>
			</Menu.Target>
			<Menu.Dropdown>
				<Menu.Item onClick={() => navigate("/categories")}>
					<Group>
						<Apps size={16} />
						<Text>My Categories</Text>
					</Group>
				</Menu.Item>
				<Menu.Item onClick={() => navigate("/payment_modes")}>
					<Group>
						<Wallet size={16} />
						<Text>My Payment Modes</Text>
					</Group>
				</Menu.Item>
				<Divider />
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
