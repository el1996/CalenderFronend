import styled from "styled-components";

export const Root = styled.div`
	width: 100%;
`;

export const Label = styled.label`
	display: block;
	text-align: left;
	color: #9d97ff;

	${(props) =>
		props.required &&
		`
        &::after {
            content: '*';
            color: red;
        }
   `}
`;

export const Input = styled.input`
	width: 410px;
	height: 50px;
	color: #797979;
	background-color: white;
	border: 1px solid #797979;
	margin: 0.5rem 0;
	padding: 1rem;
	border-radius: 10px;
`;

export const Error = styled.p`
	color: red;
	margin: 0;
	font-size: 0.8rem;
	text-align: left;
	margin-bottom: 1rem;

	animation: fadeInFromTop ease-in-out 300ms;

	@keyframes fadeInFromTop {
		0% {
			opacity: 0.2;
			transform: translateY(-5px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}
`;
