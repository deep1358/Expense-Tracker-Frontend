import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../store/user/ThunkFunctions/deleteUser";
import { logoutUser } from "../../store/user/ThunkFunctions/logoutUser";

const Navbar = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.user);

	return (
		<>
			{user && (
				<>
					<p>{user.userName}</p>
					<button onClick={() => dispatch(deleteUser())}>Delete</button>
					<button onClick={() => dispatch(logoutUser())}>Logout</button>
				</>
			)}
		</>
	);
};

export default Navbar;
