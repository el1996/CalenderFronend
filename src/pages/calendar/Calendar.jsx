import React, { useContext, useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { getMonth } from "../../utils/util";
import CalendarHeader from "../../components/CalendarHeader";
import Month from "../../components/Month";
import GlobalContext from "../../context/GlobalContext";
import EventModal from "../../components/EventModal";
import SettingModal from "../../components/SettingModal";
import NotificationService from "../../services/NotificationService";
import { AuthContext } from "../../context/AuthContext";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let stompClient = null;

const Calendar = () => {
	const [currenMonth, setCurrentMonth] = useState(getMonth());
	const {
		monthIndex,
		showEventModal,
		showSettingModal,
		setNotificationSetting,
	} = useContext(GlobalContext);
	const { currentUser } = useContext(AuthContext);

	useEffect(() => {
		setCurrentMonth(getMonth(monthIndex));
	}, [monthIndex]);

	function getSetting() {
		NotificationService.getNotificationSetting(currentUser.token)
			.then((res) => {
				setNotificationSetting(res.data?.data);
			})
			.catch((error) => {
				toast.error(error?.response?.data.error);
			});
	}
	function connect() {
		let Sock = new SockJS("http://localhost:8080/ws");
		stompClient = over(Sock);
		stompClient.connect({}, onConnected, onError);
	}

	const onConnected = () => {
		stompClient.subscribe(
			"/user/" + currentUser.user.email + "/private",
			onReceiveNotification
		);
	};

	const onReceiveNotification = (payload) => {
		//const payloadData = JSON.parse(payload.body);

		// if (payloadData.sender.id === selectedTabRef.current.id) {
		// 	setSelectedTabHistory([
		// 		...selectedTabHistoryRef.current,
		// 		payloadData,
		// 	]);
		// }

		toast(payload.body);

		// if (!tabs.some((tab) => tab.id === payloadData.sender.id)) {
		// 	setTabs([...tabs, payloadData.sender]);
		// }
	};

	const onError = (err) => {
		toast.error(err);
	};
	useEffect(() => {
		getSetting();
		connect();
	}, []);

	return (
		<React.Fragment>
			<ToastContainer position="top-center" theme="dark" />
			{showEventModal && <EventModal />}
			{showSettingModal && <SettingModal />}
			<div className="h-screen flex flex-col">
				<CalendarHeader />
				<div className="flex flex-1">
					<Sidebar />
					<Month month={currenMonth} />
				</div>
			</div>
		</React.Fragment>
	);
};

function sendNotification(selectedEvent, message, type) {
	const notificationDetails = {
		message,
		event: selectedEvent,
		notificationType: type,
	};
	if (stompClient) {
		stompClient.send(
			"/app/event-notification",
			{},
			JSON.stringify(notificationDetails)
		);
	}
}

export { Calendar, sendNotification };
