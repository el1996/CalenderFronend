import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ContextWrapper from "./context/ContextWrapper";
import { AuthContextProvider } from "./context/AuthContext";
import { registerLicense } from "@syncfusion/ej2-base";
import { syncfusionLicenseKey } from "./constants";

registerLicense(syncfusionLicenseKey);

ReactDOM.render(
	<AuthContextProvider>
		<ContextWrapper>
			<App />
		</ContextWrapper>
	</AuthContextProvider>,
	document.getElementById("root")
);
