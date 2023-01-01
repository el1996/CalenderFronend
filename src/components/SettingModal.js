import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import "../App.css";
import { AuthContext } from "../context/AuthContext";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import NotificationService from "../services/NotificationService";
import TimezoneSelect from "react-timezone-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const options = [
	{ name: "None", value: "NONE" },
	{ name: "By pop-up", value: "POPUP" },
	{ name: "By email", value: "EMAIL" },
	{ name: "Both", value: "BOTH" },
];

export default function SettingModal() {
	const { setShowSettingModal, notificationSetting } =
		useContext(GlobalContext);
	const [deleteEvent, setDeleteEvent] = useState(
		notificationSetting ? notificationSetting.deleteEvent : "NONE"
	);
	const [updateEvent, setUpdateEvent] = useState(
		notificationSetting ? notificationSetting.updateEvent : "NONE"
	);
	const [inviteGuest, setInviteGuest] = useState(
		notificationSetting ? notificationSetting.invitation : "NONE"
	);
	const [removeGuest, setRemoveGuest] = useState(
		notificationSetting ? notificationSetting.removeGuest : "NONE"
	);
	const [userStatusChange, setUserStatusChange] = useState(
		notificationSetting ? notificationSetting.userStatusChanged : "NONE"
	);
	const [upcomingEvent, setUpcomingEvent] = useState(
		notificationSetting ? notificationSetting.upcomingEvent : "NONE"
	);
	const [selectedTimezone, setSelectedTimezone] = useState(
		notificationSetting ? notificationSetting.timeZone : "Asia/Jerusalem"
	);
	const { currentUser } = useContext(AuthContext);

	function handleSubmit(e) {
		e.preventDefault();

		const notificationCredentials = {
			deleteEvent: deleteEvent,
			updateEvent: updateEvent,
			invitation: inviteGuest,
			removeGuest: removeGuest,
			userStatusChanged: userStatusChange,
			upcomingEvent: upcomingEvent,
			timeZone: selectedTimezone,
		};

		const token = currentUser.token;
		NotificationService.updateNotificationSetting(
			notificationCredentials,
			token
		)
			.then((res) => {
				setShowSettingModal(false);
				toast.success(res.data?.message);
			})
			.catch((error) => {
				setShowSettingModal(false);
				toast.error(error?.response?.data.error);
			});
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
						<button onClick={() => setShowSettingModal(false)}>
							<span className="material-icons-outlined text-gray-400">
								close
							</span>
						</button>
					</div>
				</header>
				<div className="setting-container">
					<h1 className="m-4 ">
						How do you want to receive the notifications?
					</h1>
					<Box sx={{ minWidth: 120 }}>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">
								Delete Event
							</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={deleteEvent}
								label="delete event"
								onChange={(e) => setDeleteEvent(e.target.value)}
							>
								{options.map((o, idx) => (
									<MenuItem key={idx} value={o.value}>
										{o.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Box>
					<Box sx={{ minWidth: 120 }}>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">
								Update Event
							</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={updateEvent}
								label="update event"
								onChange={(e) => setUpdateEvent(e.target.value)}
							>
								{options.map((o, idx) => (
									<MenuItem key={idx} value={o.value}>
										{o.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Box>
					<Box sx={{ minWidth: 120 }}>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">
								Invite guests
							</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={inviteGuest}
								label="Invite guests"
								onChange={(e) => setInviteGuest(e.target.value)}
							>
								{options.map((o, idx) => (
									<MenuItem key={idx} value={o.value}>
										{o.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Box>
					<Box sx={{ minWidth: 120 }}>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">
								Remove guests
							</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={removeGuest}
								label="remove guest"
								onChange={(e) => setRemoveGuest(e.target.value)}
							>
								{options.map((o, idx) => (
									<MenuItem key={idx} value={o.value}>
										{o.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Box>
					<Box sx={{ minWidth: 120 }}>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">
								User status change
							</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={userStatusChange}
								label="user status change"
								onChange={(e) =>
									setUserStatusChange(e.target.value)
								}
							>
								{options.map((o, idx) => (
									<MenuItem key={idx} value={o.value}>
										{o.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Box>
					<Box sx={{ minWidth: 120 }}>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">
								Upcoming events
							</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={upcomingEvent}
								label="upcoming events"
								onChange={(e) =>
									setUpcomingEvent(e.target.value)
								}
							>
								{options.map((o, idx) => (
									<MenuItem key={idx} value={o.value}>
										{o.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Box>

					<div className="select-wrapper">
						<TimezoneSelect
							value={selectedTimezone}
							onChange={setSelectedTimezone}
						/>
					</div>
				</div>

				<footer className="flex justify-end border-t p-3 mt-5">
					<button
						type="submit"
						onClick={handleSubmit}
						className="bg-green-500 hover:bg-green-600 mr-2 px-6 py-2 rounded text-white"
					>
						save
					</button>
				</footer>
			</form>
		</div>
	);
}
