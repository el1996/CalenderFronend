import React, { useContext, useEffect, useRef, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import "../App.css";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AuthContext } from "../context/AuthContext";
import EventService from "../services/EventService";
import GuestModel from "./guestModel";
import { Box, FormControlLabel, Switch } from "@mui/material";
import { sendNotification } from "../pages/calendar/Calendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

export default function EventModal() {
	const { currentUser } = useContext(AuthContext);

	const { setShowEventModal, selectedEvent, setEvents, events } =
		useContext(GlobalContext);

	const [title, setTitle] = useState(
		selectedEvent ? selectedEvent.title : ""
	);
	const [location, setLocation] = useState(
		selectedEvent ? selectedEvent.location : ""
	);
	const [description, setDescription] = useState(
		selectedEvent ? selectedEvent.description : ""
	);
	const [start, setStart] = useState(
		selectedEvent ? selectedEvent.start : null
	);
	const [end, setEnd] = useState(selectedEvent ? selectedEvent.end : null);
	const [selectedLabel, setSelectedLabel] = useState(
		selectedEvent
			? labelsClasses.find((lbl) => lbl === selectedEvent.label)
			: labelsClasses[0]
	);
	const [isClicked, setIsClicked] = useState(false);
	const [checked, setChecked] = useState(
		selectedEvent ? selectedEvent.isPublic : false
	);
	const [eventRes, setEventRes] = useState([]);

	const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked);
	};

	function handleRemove() {
		EventService.deleteEvent(selectedEvent.id, currentUser.token)
			.then((res) => {
				// dispatchCalEvent({
				// 	type: "delete",
				// 	payload: selectedEvent,
				// });
				setShowEventModal(false);
				toast.success("Successful deleting event");
				const message = `Event ${selectedEvent.title} was canceled`;
				sendNotification(selectedEvent, message, "DELETE_EVENT");
			})
			.catch((error) => {
				setShowEventModal(false);
				toast.error(error?.response?.data.error);
			});
	}

	function handleSubmit(e) {
		e.preventDefault();

		const calendarEvent = {
			title,
			location,
			start,
			end,
			description,
			label: selectedLabel,
			isPublic: checked,
			id: selectedEvent ? selectedEvent.id : Math.random(100),
		};

		if (selectedEvent) {
			EventService.updateEvent(calendarEvent, currentUser.token)
				.then((res) => {
					events.map((evt) =>
						evt.id === res.data?.data?.id ? res.data?.data : evt
					);
					setShowEventModal(false);
					toast.success(res.data?.message);
					const message = `Event ${selectedEvent.title} was updated`;
					sendNotification(selectedEvent, message, "UPDATE_EVENT");
				})
				.catch((error) => {
					setShowEventModal(false);
					toast.error(error?.response?.data.error);
				});
		} else {
			EventService.createEvent(calendarEvent, currentUser.token)
				.then((res) => {
					setShowEventModal(false);
					toast.success(res.data?.message);
					setEventRes(...eventRes, ...res.data?.data);
				})
				.catch((error) => {
					setShowEventModal(false);
					toast.error(error?.response?.data.error);
				});
		}
	}
	useEffect(() => {
		setEvents(eventRes);
	}, [eventRes]);

	useEffect(() => {
		setEventRes(events);
	}, []);

	function handleGuestsSubmit(e) {
		e.preventDefault();
		setIsClicked(true);
	}

	function checkIfOrganizar() {
		return selectedEvent.organizer.id === currentUser.user.id;
	}

	function checkIfAdmin() {
		let res = false;
		selectedEvent.guests.forEach((guest) => {
			if (
				guest.user.id === currentUser.user.id &&
				guest.role === "ADMIN"
			) {
				res = true;
			}
		});
		return res;
	}

	function checkIfOrganizarOrAdmin() {
		return checkIfOrganizar() || checkIfAdmin();
	}

	return (
		<div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
			<ToastContainer position="top-center" theme="dark" />
			<form className="bg-white rounded-lg shadow-2xl w-1/4">
				<header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
					<span className="material-icons-outlined text-gray-400">
						drag_handle
					</span>
					<div>
						{selectedEvent && checkIfOrganizar() && (
							<span
								onClick={handleRemove}
								className="material-icons-outlined text-gray-400 cursor-pointer"
							>
								delete
							</span>
						)}
						<button onClick={() => setShowEventModal(false)}>
							<span className="material-icons-outlined text-gray-400">
								close
							</span>
						</button>
					</div>
				</header>
				<div className="event-container">
					{isClicked ? (
						<GuestModel handleSubmit={setIsClicked} />
					) : (
						<>
							<div className="title-location">
								<TextField
									fullWidth
									disabled={
										selectedEvent && !checkIfOrganizar()
									}
									id="title"
									label="Title"
									value={title}
									onChange={(newValue) => {
										setTitle(newValue.target.value);
									}}
									sx={{
										mb: 1,
									}}
								/>
								<TextField
									fullWidth
									disabled={
										selectedEvent &&
										!checkIfOrganizarOrAdmin()
									}
									id="location"
									label="Location"
									value={location}
									onChange={(newValue) => {
										setLocation(newValue.target.value);
									}}
									sx={{
										mb: 1,
									}}
								/>
							</div>

							<div className="start-end">
								<LocalizationProvider
									dateAdapter={AdapterDayjs}
								>
									<DateTimePicker
										label="Start"
										disabled={
											selectedEvent && !checkIfOrganizar()
										}
										value={start}
										onChange={(newValue) => {
											setStart(newValue);
										}}
										renderInput={(params) => (
											<TextField {...params} />
										)}
									/>
									<DateTimePicker
										label="End"
										disabled={
											selectedEvent && !checkIfOrganizar()
										}
										value={end}
										onChange={(newValue) => {
											setEnd(newValue);
										}}
										renderInput={(params) => (
											<TextField {...params} />
										)}
									/>
								</LocalizationProvider>
							</div>
							<div className="description">
								<TextField
									fullWidth
									disabled={
										selectedEvent &&
										!checkIfOrganizarOrAdmin()
									}
									id="description"
									label="Description"
									multiline
									value={description}
									onChange={(newValue) => {
										setDescription(newValue.target.value);
									}}
								/>
							</div>
							<Box>
								<FormControlLabel
									control={
										<Switch
											checked={checked}
											onChange={handleSwitch}
										/>
									}
									label="Public"
									disabled={
										selectedEvent && !checkIfOrganizar()
									}
								/>
							</Box>
							{/* {errors && <span>{errors}</span>} */}
							<footer className="flex justify-end border-t p-3 mt-5">
								{(selectedEvent == null ||
									checkIfOrganizarOrAdmin()) && (
									<button
										type="submit"
										onClick={handleSubmit}
										className="bg-green-500 hover:bg-green-600 mr-2 px-6 py-2 rounded text-white"
									>
										Save
									</button>
								)}

								{selectedEvent && (
									<button
										type="submit"
										onClick={handleGuestsSubmit}
										className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
									>
										Guests
									</button>
								)}
							</footer>
						</>
					)}
				</div>
			</form>
		</div>
	);
}
