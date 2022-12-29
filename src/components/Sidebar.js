import React, { useContext, useState } from "react";
import CreateEventButton from "./CreateEventButton";
import SmallCalendar from "./SmallCalendar";
import Labels from "./Labels";
import { TextField, Box, InputAdornment } from "@mui/material";
import ScreenShareOutlinedIcon from "@mui/icons-material/ScreenShareOutlined";
import IconButton from "@mui/material/IconButton";
import GlobalContext from "../context/GlobalContext";
import { AuthContext } from "../context/AuthContext";
import EventService from "../services/EventService";

export default function Sidebar() {
	const { currentUser } = useContext(AuthContext);
	const [shareToEmail, setShareToEmail] = useState("");

	function handleShare() {
		const token = currentUser.token;

		EventService.share(shareToEmail, token)
			.then((res) => {
				alert(res.data?.message);
			})
			.catch((error) => {
				alert(error?.response?.data.errors);
			});
		setShareToEmail("");
	}
	return (
		<aside className="border p-5 w-64">
			<CreateEventButton />
			<SmallCalendar />
			<Box>
				<TextField
					fullWidth
					InputLabelProps={{ style: { fontSize: 14 } }}
					id="share-calendar"
					label="Share calendar to (email)"
					value={shareToEmail}
					onChange={(newValue) => {
						setShareToEmail(newValue.target.value);
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									edge="end"
									color="primary"
									onClick={handleShare}
								>
									<ScreenShareOutlinedIcon />
								</IconButton>
							</InputAdornment>
						),
					}}
					sx={{
						mt: 3,
					}}
				/>
			</Box>
			<Labels />
		</aside>
	);
}
