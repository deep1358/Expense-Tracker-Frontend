import React from "react";

const Login = () => {
	const handleLogin = () => {
		window.open("http://localhost:5000/auth/google", "_self");
	};
	return <button onClick={handleLogin}>Login</button>;
};

export default Login;
