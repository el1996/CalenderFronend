import React, {
	useState,
	useEffect,
	useReducer,
	useMemo,
	useContext,
} from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";
import EventService from "../services/EventService";
import { AuthContext } from "./AuthContext";

const SavedEventsReducer = (state, { type, payload }) => {
	switch (type) {
		case "push":
			return [...state, payload];
		case "update":
			return state.map((evt) =>
				evt.id === payload.id ? payload : evt
			);
		case "delete":
			return state.filter((evt) => evt.id !== payload.id);
		default:
			throw new Error();
	}
};
function initEvents() {
	//const storageEvents = localStorage.getItem("savedEvents");
	// const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
	// return parsedEvents;
	return [];
}

export default function ContextWrapper(props) {
	const [monthIndex, setMonthIndex] = useState(dayjs().month());
	const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
	const [daySelected, setDaySelected] = useState(dayjs());
	const [showEventModal, setShowEventModal] = useState(false);
	const [showSettingModal, setShowSettingModal] = useState(false);
	const [selectedEvent, setSelectedEvent] = useState(null);
	const [labels, setLabels] = useState([]);
	const [savedEvents, dispatchCalEvent] = useReducer(
		SavedEventsReducer,
		[],
		initEvents
	);
	const [savedCalendars, setSavedCalendars] = useState([]);
	const [events, setEvents] = useState([]);
	const [notificationSetting, setNotificationSetting] =
		useState(null);

	const filteredEvents = useMemo(() => {
		return savedEvents.filter((evt) =>
			labels
				.filter((lbl) => lbl.checked)
				.map((lbl) => lbl.label)
				.includes(evt.label)
		);
	}, [savedEvents, labels]);

	// useEffect(() => {
	// 	localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
	// }, [savedEvents]);

	// useEffect(() => {
	// 	async function getMyEvents() {
	// 		const response = await EventService.getMyEvents(
	// 			12,
	// 			2022,
	// 			currentUser?.token
	// 		);
	// 		console.log("My events");
	// 		console.log(response);
	// 		// response.data?.data.map((evt) => {
	// 		// 	if (evt.label === undefined) {
	// 		// 		evt.label = "red";
	// 		// 	}
	// 		// });
	// 		// setLabels(response.data?.data);
	// 	}
	// 	if (currentUser != null) {
	// 		getMyEvents();
	// 	}
	// }, [currentUser]);

	useEffect(() => {
		setLabels((prevLabels) => {
			return [...new Set(savedEvents.map((evt) => evt.label))].map(
				(label) => {
					const currentLabel = prevLabels.find(
						(lbl) => lbl.label === label
					);
					return {
						label,
						checked: currentLabel ? currentLabel.checked : true,
					};
				}
			);
		});
	}, [savedEvents]);

	useEffect(() => {
		if (smallCalendarMonth !== null) {
			setMonthIndex(smallCalendarMonth);
		}
	}, [smallCalendarMonth]);

	useEffect(() => {
		if (!showEventModal) {
			setSelectedEvent(null);
		}
	}, [showEventModal]);

	function updateLabel(label) {
		setLabels(
			labels.map((lbl) => (lbl.label === label.label ? label : lbl))
		);
	}

	return (
		<GlobalContext.Provider
			value={{
				monthIndex,
				setMonthIndex,
				smallCalendarMonth,
				setSmallCalendarMonth,
				daySelected,
				setDaySelected,
				showEventModal,
				setShowEventModal,
				dispatchCalEvent,
				selectedEvent,
				setSelectedEvent,
				savedEvents,
				setLabels,
				labels,
				updateLabel,
				filteredEvents,
				savedCalendars,
				setSavedCalendars,
				events,
				setEvents,
				showSettingModal,
				setShowSettingModal,
				notificationSetting,
				setNotificationSetting,
			}}
		>
			{props.children}
		</GlobalContext.Provider>
	);
}
