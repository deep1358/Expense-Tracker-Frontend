import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { createCategory } from "../../store/user/ThunkFunctions/createCategory";
import { deleteCategory } from "../../store/user/ThunkFunctions/deleteCategory";
import { updateCategory } from "../../store/user/ThunkFunctions/updateCategory";

const Home = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		// dispatch(deleteCategory("Deep1"));
		// axios
		// 	.post("http://localhost:5000/expense", {
		// 		category: "Food",
		// 		amount: 1000,
		// 		note: "",
		// 		_id: "629e36cf5a01ea16d66d1f42",
		// 	})
		// 	.then((res) => console.log(res))
		// 	.catch((err) => console.log(err));
	});

	return (
		<>
			<div>Home</div>
			<Link to="/login">Login</Link>
		</>
	);
};

export default Home;
