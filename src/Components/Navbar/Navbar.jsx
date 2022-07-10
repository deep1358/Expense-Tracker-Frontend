import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../store/user/ThunkFunctions/logoutUser";
import { toast } from "react-toastify";

const Navbar = () => {
	const dispatch = useDispatch();
	const { user, fetchingUser, loggingOut } = useSelector(
		(state) => state.user
	);
	const { currentMonth, currentYear } = useSelector((state) => state.expense);

	const { months } = useSelector((state) => state.utils);

	return (
		<>
			<p>
				{currentMonth} {currentYear}
			</p>
			{fetchingUser && <p>Fetching...</p>}
			{loggingOut && <p>Logging you out...</p>}
			{user && (
				<>
					<p>{user.userName}</p>
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
					<button
						onClick={() => {
							toast.success("Category Added Successfully", {
								autoClose: 30000,
							});
						}}
					>
						Show Toast
					</button>
				</>
			)}
		</>
	);
};

export default Navbar;
