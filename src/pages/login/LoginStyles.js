import styled from "styled-components";

export const Header = styled.div`
	display: flex;
	width: 440px;
	margin-bottom: 2rem;
`;

export const Root = styled.div`
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	border: 1px solid white;
	border-radius: 10px;
	margin: 0.5rem;

	& span {
		color: #9d97ff;
		margin-left: 0.25rem;
		cursor: pointer;
	}
	& h2 {
		color: #6c63ff;
		font-size: 64px;
	}
`;

export const MoreOption = styled.p`
	color: #7a7a7a;
`;

export const Connentions = styled.button`
	color: #7a7a7a;
	border-width: 0;
	border-bottom: 2px solid #7a7a7a;
	border-radius: 0;
	font-size: 1.2rem;
	background-color: white;
	width: 100%;
	cursor: pointer;
	opacity: 0.8;
	padding: 0;

	${(props) =>
		props.state &&
		`
            color: #6c63ff;
			border-bottom: 2px solid #6c63ff;
		`}
`;

export const LoginForm = styled.form`
	display: flex;
	flex-direction: column;
`;
