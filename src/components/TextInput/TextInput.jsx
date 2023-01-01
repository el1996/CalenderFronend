import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import React, { useState } from "react";
import { Root } from "./TextInputStyles";

function TextInput({ type = "text", label }) {
	const [value, setValue] = useState("");

	return (
		<Root>
			<div className="input-container">
				<DateTimePickerComponent />
				<label className={value && "filled"}>{label}</label>
			</div>
		</Root>
	);
}

export default TextInput;
