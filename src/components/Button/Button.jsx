import StyledButton from "./ButtonStyles";

function Button(props) {
	return <StyledButton {...props}>{props.children}</StyledButton>;
}

export default Button;
