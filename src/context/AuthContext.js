import { createContext, useEffect, useState } from "react";
import AuthService from "../services/AuthService";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [isAuth, setIsAuth] = useState(false);
	const [errors, setErrors] = useState({});

	const login = async (newUser) => {
		try {
			const result = await AuthService.loginViaEmail(newUser);
			setCurrentUser(result.data.data);
			setErrors({});
			setIsAuth(true);
		} catch (error) {
			setErrors(error?.response?.data.errors);
		}
	};

	const register = async (newUser) => {
		try {
			const result = await AuthService.register(newUser);
			setCurrentUser(result.data.data);
			setErrors({});
		} catch (error) {
			setErrors(error?.response?.data.errors);
		}
	};

	const logout = async () => {
		setCurrentUser(null);
		setIsAuth(false);
	};

	useEffect(() => {
		let user = window.sessionStorage.getItem("currentUser");
		if (user) {
			user = JSON.parse(user);
		}
		setCurrentUser(user);
		setIsAuth(window.sessionStorage.getItem("isAuth") === "true");
	}, []);

	useEffect(() => {
		window.sessionStorage.setItem(
			"currentUser",
			JSON.stringify(currentUser)
		);
		window.sessionStorage.setItem("isAuth", isAuth);
	}, [currentUser, isAuth]);

	return (
		<AuthContext.Provider
			value={{
				currentUser,
				setCurrentUser,
				isAuth,
				setIsAuth,
				login,
				logout,
				register,
				errors,
				setErrors,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
