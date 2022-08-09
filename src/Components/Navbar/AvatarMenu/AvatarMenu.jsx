import React from "react";
import { Menu, Avatar, Text, Group, Divider } from "@mantine/core";
import { logoutUser } from "../../../store/user/ThunkFunctions/logoutUser";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./AvatarMenu.style";
import { Trash, Logout } from "tabler-icons-react";

const AvatarMenu = ({ deleteConfirmBoxToggleOpened }) => {
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.user);

	const navigate = useNavigate();

	const { classes } = useStyles();

	return (
		<Menu
			icon={<Trash size={14} />}
			width={180}
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
				<Menu.Item
					onClick={() => {
						dispatch(logoutUser(navigate));
					}}
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
