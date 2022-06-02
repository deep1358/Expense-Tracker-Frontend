import "./App.css";
import React, { useEffect } from "react";
import axios from "axios";

function App() {
	useEffect(() => {
		axios.get("http://localhost:5000/").then((res) => {
			console.log(res);
		});
	});

	return <div className="App"></div>;
}

export default App;
