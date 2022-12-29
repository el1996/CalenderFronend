import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import React, { useState } from "react";
import { Root } from "./TextInputStyles";

function TextInput({ type = "text", label }) {
	const [value, setValue] = useState("");

	function handleChange(e) {
		setValue(e.target.value);
	}

	return (
		<Root>
			<div className="input-container">
				{/* <input type={type} value={value} onChange={handleChange} /> */}
				<DateTimePickerComponent />
				<label className={value && "filled"}>{label}</label>
			</div>
		</Root>
	);
}

export default TextInput;
