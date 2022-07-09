import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { deleteUser } from "../../store/user/ThunkFunctions/deleteUser";
import { logoutUser } from "../../store/user/ThunkFunctions/logoutUser";

const Navbar = () => {
	const dispatch = useDispatch();
	const { user, isFetchingUser, isLoggingOut } = useSelector(
		(state) => state.user
	);
	const { currentMonth, currentYear } = useSelector((state) => state.expense);

	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	return (
		<>
			<p>
				{currentMonth} {currentYear}
			</p>
			{isFetchingUser && <p>Fetching...</p>}
			{isLoggingOut && <p>Logging you out...</p>}
			{user && (
				<>
					<p>{user.userName}</p>
					{/* <button onClick={() => dispatch(deleteUser())}>
						Delete User
					</button> */}
					<button onClick={() => dispatch(logoutUser())}>Logout</button>
					<button>
						<Link to="/year">Year</Link>
					</button>
					<button>
						<Link to={`/year/${currentYear}`}>{currentYear}</Link>
					</button>
					<button>
						<Link to={`/year/${currentYear}/${months[currentMonth - 1]}`}>
							{months[currentMonth - 1]}
						</Link>
					</button>
					<button>
						<Link to="addExpense">Add Expense</Link>
					</button>
					<button>
						<Link to="categories">My Categories</Link>
					</button>
					<button>
						<Link to="visulization">Vizulization</Link>
					</button>
				</>
			)}
		</>
	);
};

export default Navbar;
