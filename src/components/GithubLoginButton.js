import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import { createButton } from "react-social-login-buttons";

const config = {
	text: "Log in with Github",
	icon: "github",
	iconFormat: GitHubIcon,
	style: { background: "#3b5998" },
	activeStyle: { background: "#293e69" },
};
/** My Facebook login button. */
const GithubLoginButton = createButton(config);

export default GithubLoginButton;
