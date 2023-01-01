import React, { useContext, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { serverAddress } from "../constants";
import { AuthContext } from "../context/AuthContext";

export default function GitHubFetch() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const { setIsAuth, setCurrentUser, setErrors } = useContext(AuthContext);

	useEffect(() => {
		let code = searchParams.get("code");

		let requestOptions = {
			method: "GET",
			redirect: "follow",
		};
		fetch(serverAddress + `/auth/login/github?code=${code}`, requestOptions)
			.then((response) => {
				if (response.ok) {
					response.json().then((resJson) => {
						setCurrentUser(resJson?.data);
						setErrors({});
						setIsAuth(true);
						navigate("/");
					});
				} else {
					response.json().then((resJson) => alert(resJson.message));
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	return <></>;
}
