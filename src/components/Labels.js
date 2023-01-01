import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import GlobalContext from "../context/GlobalContext";
import EventService from "../services/EventService";
import Checkbox from "./Checkbox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Labels() {
	const { savedCalendars, setSavedCalendars, setEvents, events } =
		useContext(GlobalContext);
	const { currentUser } = useContext(AuthContext);

	const handleCheck = (newEvents, action) => {
		if (action === "push") {
			setEvents([...events, ...newEvents]);
		} else {
			const filtered = [];
			let flag = 0;
			events.forEach((event, idx) => {
				flag = 0;
				newEvents.forEach((evt) => {
					if (event.id === evt.id) {
						flag = 1;
					}
				});
				if (flag === 0) {
					filtered.push(event);
				}
			});

			setEvents(filtered);
		}
	};

	useEffect(() => {
		const getData = () => {
			EventService.getMyCalendars(currentUser.token)
				.then((res) => {
					setSavedCalendars(res.data?.data);
				})
				.catch((error) => {
					toast.error(error?.response?.data.error);
				});
		};
		getData();
	}, []);

	return (
		<React.Fragment>
			<ToastContainer position="top-center" theme="dark" />
			<p className="text-gray-500 font-bold mt-5">Shared Calendars</p>
			{savedCalendars.map((calendar, idx) => (
				<label key={idx} className="items-center mt-3 block">
					<Checkbox calendar={calendar} onChange={handleCheck} />
					{/* <input
						type="checkbox"
						checked={calendar.checked}
						onChange={handleCheck}
						className={`form-checkbox h-5 w-5 text-blue-400 rounded focus:ring-0 cursor-pointer`} //change red
					/> */}
					<span className="ml-2 text-gray-700 capitalize">
						{idx === 0 ? "My Calendar" : calendar.name}
					</span>
				</label>
			))}
		</React.Fragment>
	);

	// return (
	// 	<React.Fragment>
	// 		<p className="text-gray-500 font-bold mt-10">Label</p>
	// 		{labels.map(({ label: lbl, checked }, idx) => (
	// 			<label key={idx} className="items-center mt-3 block">
	// 				<input
	// 					type="checkbox"
	// 					checked={checked}
	// 					onChange={() =>
	// 						updateLabel({ label: lbl, checked: !checked })
	// 					}
	// 					className={`form-checkbox h-5 w-5 text-${lbl}-400 rounded focus:ring-0 cursor-pointer`}
	// 				/>
	// 				<span className="ml-2 text-gray-700 capitalize">{lbl}</span>
	// 			</label>
	// 		))}
	// 	</React.Fragment>
	// );
}
