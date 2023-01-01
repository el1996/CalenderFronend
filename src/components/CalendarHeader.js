import dayjs from "dayjs";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import GlobalContext from "../context/GlobalContext";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

export default function CalendarHeader() {
	const { monthIndex, setMonthIndex, setShowSettingModal } =
		useContext(GlobalContext);
	const { currentUser, logout } = useContext(AuthContext);

	function handlePrevMonth() {
		setMonthIndex(monthIndex - 1);
	}

	function handleNextMonth() {
		setMonthIndex(monthIndex + 1);
	}

	function handleReset() {
		setMonthIndex(
			monthIndex === dayjs().month()
				? monthIndex + Math.random()
				: dayjs().month()
		);
	}

	function handleLogaut() {
		logout();
	}

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<header>
			<div className="px-4 py-2 flex items-center">
				<React.Fragment>
					<Box
						sx={{
							mr: 2,
							display: "flex",
							alignItems: "center",
							textAlign: "center",
						}}
					>
						<Tooltip title="Account settings">
							<IconButton
								onClick={handleClick}
								size="small"
								sx={{ ml: 2 }}
								aria-controls={
									open ? "account-menu" : undefined
								}
								aria-haspopup="true"
								aria-expanded={open ? "true" : undefined}
							>
								<Avatar sx={{ width: 40, height: 40 }}>
									{
										Array.from(
											currentUser.user.name.toUpperCase()
										)[0]
									}
								</Avatar>
							</IconButton>
						</Tooltip>
					</Box>
					<Menu
						anchorEl={anchorEl}
						id="account-menu"
						open={open}
						onClose={handleClose}
						onClick={handleClose}
						PaperProps={{
							elevation: 0,
							sx: {
								overflow: "visible",
								filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
								mt: 1.5,
								"& .MuiAvatar-root": {
									width: 32,
									height: 32,
									ml: -0.5,
									mr: 1,
								},
								"&:before": {
									content: '""',
									display: "block",
									position: "absolute",
									top: 0,
									right: 90,
									width: 10,
									height: 10,
									bgcolor: "background.paper",
									transform: "translateY(-50%) rotate(45deg)",
									zIndex: 0,
								},
							},
						}}
						transformOrigin={{
							horizontal: "right",
							vertical: "top",
						}}
						anchorOrigin={{
							horizontal: "right",
							vertical: "bottom",
						}}
					>
						<MenuItem>
							<Avatar /> {currentUser.user.name}
						</MenuItem>
						<MenuItem onClick={() => setShowSettingModal(true)}>
							<ListItemIcon>
								<Settings fontSize="small" />
							</ListItemIcon>
							Settings
						</MenuItem>
						<MenuItem onClick={handleLogaut}>
							<ListItemIcon>
								<Logout fontSize="small" />
							</ListItemIcon>
							Logout
						</MenuItem>
					</Menu>
				</React.Fragment>
				<h1 className="mr-10 text-xl text-gray-500 fond-bold">
					EOE Calendar
				</h1>
				<button
					onClick={handleReset}
					className="border rounded py-2 px-4 mr-5"
				>
					Today
				</button>
				<button onClick={handlePrevMonth}>
					<span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
						chevron_left
					</span>
				</button>
				<button onClick={handleNextMonth}>
					<span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
						chevron_right
					</span>
				</button>
				<h2 className="ml-4 text-xl text-gray-500 font-bold">
					{dayjs(new Date(dayjs().year(), monthIndex)).format(
						"MMMM YYYY"
					)}
				</h2>
			</div>
		</header>
	);
}
