import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import FormatUtils from "../../utils/formatUtils";
import * as Styles from "./LoginStyles";
import { AuthContext } from "../../context/AuthContext";
import { GithubLoginButton } from "react-social-login-buttons";

export const Login = (props) => {
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [errors, setErrors] = useState({});
	const { login } = useContext(AuthContext);

	const handleSubmit = (e) => {
		e.preventDefault();
		const userData = {
			email: email,
			password: pass,
		};
		login(userData);
	};

	function getInputError(fieldApiName) {
		if (typeof errors === "string") {
			return errors;
		}
		return FormatUtils.getInputError(fieldApiName, errors);
	}

	return (
		<Styles.Root>
			<h2>Login</h2>

			<Styles.LoginForm onSubmit={handleSubmit}>
				<Input
					label="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					required
					error={
						typeof errors === "object"
							? getInputError("email")
							: null
					}
				/>
				<Input
					label="password"
					value={pass}
					onChange={(e) => setPass(e.target.value)}
					type="password"
					required
					error={getInputError("password")}
				/>
				<Button type="submit">Login</Button>

				<Styles.MoreOption>
					Don't have an account?
					<span>
						<Link to="/register">Register here</Link>
					</span>
				</Styles.MoreOption>
				<span>
					------------------------------------ OR
					------------------------------------
				</span>
				<GithubLoginButton>
					<a href="https://github.com/login/oauth/authorize?client_id=9d36ebffd5e7fefeb015&scope=user:email">
						Log in with GitHub
					</a>
				</GithubLoginButton>
			</Styles.LoginForm>
		</Styles.Root>
	);
};
