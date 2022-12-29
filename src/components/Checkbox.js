import { useContext, useState } from "react";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import EventService from "../services/EventService";
import GlobalContext from "../context/GlobalContext";
import { AuthContext } from "../context/AuthContext";

// dayjs.extend(utc);
// dayjs.extend(timezone);

//dayjs.utc().local().format() from utc to localTime

export default function Checkbox(props) {
	const { monthIndex } = useContext(GlobalContext);
	const [isChecked, setIsChecked] = useState(false);
	const { currentUser } = useContext(AuthContext);

	const handleChange = (e) => {
		// const omarEvents = [
		// 	{
		// 		id: "16",
		// 		isPublic: false,
		// 		start: dayjs("2022-12-26T04:32:00.000Z").utc(),
		// 		end: dayjs("2022-12-26T05:32:00.000Z"),
		// 		location: "Tel aviv",
		// 		title: "first Event",
		// 		description: "None",
		// 		attachments: "",
		// 		orgainizar: {
		// 			id: "1",
		// 			name: "Omar",
		// 			email: "omar@gmail.com",
		// 		},
		// 		guests: [
		// 			{
		// 				id: "5",
		// 				name: "Ahmad",
		// 				email: "Ahmad@gmail.com",
		// 			},
		// 			{
		// 				id: "6",
		// 				name: "Ali",
		// 				email: "ali@gmail.com",
		// 			},
		// 			{
		// 				id: "7",
		// 				name: "Don",
		// 				email: "don@gmail.com",
		// 			},
		// 			{
		// 				id: "5",
		// 				name: "Ahmad",
		// 				email: "Ahmad@gmail.com",
		// 			},
		// 			{
		// 				id: "6",
		// 				name: "Ali",
		// 				email: "ali@gmail.com",
		// 			},
		// 			{
		// 				id: "7",
		// 				name: "Don",
		// 				email: "don@gmail.com",
		// 			},
		// 		],
		// 	},
		// 	{
		// 		id: "17",
		// 		isPublic: false,
		// 		start: "2022-12-27T04:32:00.000Z",
		// 		end: "2022-12-27T05:32:00.000Z",
		// 		location: "Tel sheva",
		// 		title: "second Event",
		// 		description: "None",
		// 		attachments: "",
		// 		orgainizar: {
		// 			id: "1",
		// 			name: "Omar",
		// 			email: "omar@gmail.com",
		// 		},
		// 		guests: [
		// 			{
		// 				userDTO: {
		// 					id: "5",
		// 					name: "Ahmad",
		// 					email: "Ahmad@gmail.com",
		// 				},
		// 				status: "APPROVE",
		// 			},
		// 			{
		// 				userDTO: {
		// 					id: "6",
		// 					name: "Ali",
		// 					email: "ali@gmail.com",
		// 				},
		// 				status: "APPROVE",
		// 			},
		// 			{
		// 				userDTO: {
		// 					id: "7",
		// 					name: "Don",
		// 					email: "don@gmail.com",
		// 				},
		// 				status: "REJECT",
		// 			},
		// 		],
		// 	},
		// ];
		const year = dayjs(new Date(dayjs().year(), monthIndex)).year();
		const month = monthIndex + 1;
		const token = currentUser.token;

		EventService.showCalendar(props.calendar.id, month, year, token)
			.then((res) => {
				if (!isChecked) {
					props.onChange(res.data?.data, "push");
				} else {
					props.onChange(res.data?.data, "pop");
				}
			})
			.catch((error) => {
				alert(error?.response?.data.errors);
			});

		setIsChecked(!isChecked);
	};

	return (
		<input
			type="checkbox"
			onChange={handleChange}
			checked={isChecked}
			className={`form-checkbox h-5 w-5 text-blue-400 rounded focus:ring-0 cursor-pointer`}
		/>
	);
}
