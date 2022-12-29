import React from "react";
import * as Styles from "./InputStyles";

function Input(props) {
	const { label, required, error } = props;

	return (
		<Styles.Root>
			<Styles.Label required={required}>{label}</Styles.Label>
			<Styles.Input {...props} />
			{error && <Styles.Error>{error}</Styles.Error>}
		</Styles.Root>
	);
}

export default Input;
