import styled from "styled-components";

export const Root = styled.div`
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 5rem;
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
