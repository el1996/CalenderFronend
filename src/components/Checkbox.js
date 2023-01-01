import { useContext, useState } from "react";
import dayjs from "dayjs";
import EventService from "../services/EventService";
import GlobalContext from "../context/GlobalContext";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Checkbox(props) {
	const { monthIndex } = useContext(GlobalContext);
	const [isChecked, setIsChecked] = useState(false);
	const { currentUser } = useContext(AuthContext);

	const handleChange = (e) => {
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
				toast.error(error?.response?.data.error);
			});

		setIsChecked(!isChecked);
	};

	return (
		<>
			<ToastContainer position="top-center" theme="dark" />
			<input
				type="checkbox"
				onChange={handleChange}
				checked={isChecked}
				className={`form-checkbox h-5 w-5 text-blue-400 rounded focus:ring-0 cursor-pointer`}
			/>
		</>
	);
}
