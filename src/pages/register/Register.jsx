import React, { useContext, useState } from "react";
import FormatUtils from "../../utils/formatUtils";
import Input from "../../components/Input/Input";
import { Root, MoreOption } from "./RegisterStyles";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { GithubLoginButton } from "react-social-login-buttons";

export const Register = (props) => {
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [fullName, setFullName] = useState("");
	// const [errors, setErrors] = useState({});
	const navigate = useNavigate();
	const { register, errors } = useContext(AuthContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const userData = {
			name: fullName,
			email: email,
			password: pass,
		};
		register(userData);
		navigate(`/login`);
	};

	function getInputError(fieldApiName) {
		if (typeof errors === "string") {
			return errors;
		}
		return FormatUtils.getInputError(fieldApiName, errors);
	}

	return (
		<Root>
			<h2>Register</h2>
			<form className="register-form" onSubmit={handleSubmit}>
				<Input
					label="fullName"
					value={fullName}
					onChange={(e) => setFullName(e.target.value)}
					type="text"
					required
					error={
						typeof errors === "object" ? getInputError("name") : null
					}
				/>
				<Input
					label="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					required
					error={getInputError("email")}
				/>
				<Input
					label="password"
					value={pass}
					onChange={(e) => setPass(e.target.value)}
					type="password"
					required
					error={
						typeof errors === "object"
							? getInputError("password")
							: null
					}
				/>
				<Button type="submit">Register</Button>
			</form>
			<MoreOption>
				Already have an account?
				<span>
					<Link to="/login">Login</Link>
					<br />
					<span>
						------------------------------------ OR
						------------------------------------
					</span>
					<br />
					<GithubLoginButton>
						<a href="https://github.com/login/oauth/authorize?client_id=9d36ebffd5e7fefeb015&scope=user:email">
							Register with GitHub
						</a>
					</GithubLoginButton>
				</span>
			</MoreOption>
		</Root>
	);
};
