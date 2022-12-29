import React from "react";
import Datetime from "react-datetime";
import styled from "styled-components";

const DateTimePicker = () => {
	return (
		<StyledDateTimePicker>
			<StyledInputField>
				<StyledCalendarIcon />
				<Datetime
					inputProps={{ placeholder: "Select date and time" }}
					format="DD/MM/YYYY hh:mm a"
					minDate={new Date()}
					maxDate={new Date(new Date().getFullYear() + 1, 0, 1)}
				/>
			</StyledInputField>
		</StyledDateTimePicker>
	);
};

const StyledDateTimePicker = styled.div`
	width: 300px;
	border: 1px solid #ccc;
	border-radius: 4px;
	overflow: hidden;
`;

const StyledInputField = styled.div`
	display: flex;
	align-items: center;
	background-color: #fff;
	padding: 10px;
`;

const StyledCalendarIcon = styled.div`
	width: 25px;
	height: 25px;
	background-color: #ccc;
	border-radius: 50%;
	margin-right: 10px;
`;

export default DateTimePicker;
