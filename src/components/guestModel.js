import {
	Alert,
	Box,
	Grid,
	InputAdornment,
	TextField,
} from "@mui/material";
import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";

import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import DoneIcon from "@mui/icons-material/Done";
import EventService from "../services/EventService";
import { AuthContext } from "../context/AuthContext";
import { sendNotification } from "../pages/calendar/Calendar";

const GuestModel = (props) => {
	const { selectedEvent } = useContext(GlobalContext);
	const { currentUser } = useContext(AuthContext);
	const [guestEmail, setGuestEmail] = useState("");
	const [guestToAdminEmail, setGuestToAdminEmail] = useState("");

	function handleInvite() {
		const token = currentUser.token;
		const eventId = selectedEvent.id;

		EventService.inviteGuest(eventId, guestEmail, token)
			.then((res) => {
				alert(res.data?.message);
				const message = `Guest with email ${guestEmail} was invited to ${selectedEvent.title} event`;
				sendNotification(selectedEvent, message, "INVITE_GUEST");
			})
			.catch((error) => {
				alert(error?.response?.data.errors);
			});
		setGuestEmail("");
	}

	function handleRemove(guest) {
		const token = currentUser.token;
		const eventId = selectedEvent.id;
		const email = guest.user.email;

		EventService.removeGuest(eventId, email, token)
			.then((res) => {
				alert(res.data?.message);
				const message = `Guest with email ${email} was removed from ${selectedEvent.title} event`;
				sendNotification(selectedEvent, message, "REMOVE_GUEST");
			})
			.catch((error) => {
				alert(error?.response?.data.errors);
			});
		setGuestEmail("");
	}

	function handleSetAdmin() {
		const token = currentUser.token;
		const eventId = selectedEvent.id;

		EventService.setGuestAsAdmin(eventId, guestToAdminEmail, token)
			.then((res) => {
				alert(res.data?.message);
				const message = `Guest with email ${guestToAdminEmail} is now Admin of ${selectedEvent.title} event`;
			})
			.catch((error) => {
				alert(error?.response?.data.errors);
			});
		setGuestToAdminEmail("");
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
		<div>
			<Box
				sx={{
					flexGrow: 1,
					mb: 2,
					display: "flex",
					flexDirection: "column",
					height: 200,
					overflow: "hidden",
					overflowY: "scroll",
				}}
			>
				<Grid item xs={12} md={6}>
					<h1 className="ml-4">Guests</h1>
					<div>
						<List dense>
							{selectedEvent.guests.map((guest, index) => (
								<ListItem
									key={index}
									secondaryAction={
										checkIfOrganizarOrAdmin() && (
											<IconButton
												edge="end"
												aria-label="delete"
												onClick={() => handleRemove(guest)}
											>
												<DeleteIcon />
											</IconButton>
										)
									}
								>
									<ListItemAvatar>
										<Avatar>
											<PersonIcon />
										</Avatar>
									</ListItemAvatar>
									<ListItemText
										primary={
											guest.user.name +
											" (" +
											guest.status.toLowerCase() +
											")"
										}
										secondary={guest.user.email}
									/>
								</ListItem>
							))}
						</List>
					</div>
				</Grid>
			</Box>
			<Box
				m={1}
				sx={{
					ml: 2,
				}}
			>
				<TextField
					fullWidth
					label="Invite guest (email)"
					disabled={!checkIfOrganizarOrAdmin()}
					value={guestEmail}
					onChange={(newValue) => {
						setGuestEmail(newValue.target.value);
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									edge="end"
									color="primary"
									onClick={handleInvite}
								>
									<MarkunreadIcon />
								</IconButton>
							</InputAdornment>
						),
					}}
					sx={{
						mb: 1,
					}}
				/>
				<TextField
					fullWidth
					label="Set guest as Admin (email)"
					disabled={!checkIfOrganizar()}
					value={guestToAdminEmail}
					onChange={(newValue) => {
						setGuestToAdminEmail(newValue.target.value);
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									edge="end"
									color="primary"
									onClick={handleSetAdmin}
								>
									<DoneIcon />
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
			</Box>
			<footer className="flex justify-end border-t p-3 mt-5">
				<button
					type="submit"
					onClick={() => props.handleSubmit(false)}
					className="bg-blue-500 hover:bg-blue-600 mr-2 px-6 py-2 rounded text-white"
				>
					Back
				</button>
			</footer>
		</div>
	);
};

export default GuestModel;
