import axios from "axios";
import { serverAddress } from "../constants";

class EventService {
	static createEvent(data, token) {
		return axios({
			method: "post",
			url: serverAddress + `/event/create`,
			data: data,
			headers: { Authorization: "Bearer " + token },
		});
	}
	static showCalendar(userId, month, year, token) {
		return axios({
			method: "get",
			url:
				serverAddress +
				`/event/showCalendar/${userId}?month=${month}&year=${year}`,
			headers: { Authorization: "Bearer " + token },
		});
	}
	static getMyCalendars(token) {
		return axios({
			method: "get",
			url: serverAddress + `/event/myCalendars`,
			headers: { Authorization: "Bearer " + token },
		});
	}

	static updateEvent(data, token) {
		return axios({
			method: "put",
			url: serverAddress + `/event/update/${data.id}`,
			data: data,
			headers: { Authorization: "Bearer " + token },
		});
	}
	static deleteEvent(eventId, token) {
		return axios({
			method: "delete",
			url: serverAddress + `/event/delete/${eventId}`,
			headers: { Authorization: "Bearer " + token },
		});
	}
	static updateNotificationSetting(data, token) {
		return axios({
			method: "put",
			url: serverAddress + `/event/settings`,
			data: data,
			headers: { Authorization: "Bearer " + token },
		});
	}
	static inviteGuest(eventId, guestEmail, token) {
		return axios({
			method: "post",
			url:
				serverAddress +
				`/event/guest/invite/${eventId}?email=${guestEmail}`,
			headers: { Authorization: "Bearer " + token },
		});
	}
	static removeGuest(eventId, guestEmail, token) {
		return axios({
			method: "delete",
			url:
				serverAddress +
				`/event/guest/delete/${eventId}?email=${guestEmail}`,
			headers: { Authorization: "Bearer " + token },
		});
	}
	static setGuestAsAdmin(eventId, guestEmail, token) {
		return axios({
			method: "put",
			url:
				serverAddress +
				`/event/guest/assign/${eventId}?email=${guestEmail}`,
			headers: { Authorization: "Bearer " + token },
		});
	}
	static share(email, token) {
		return axios({
			method: "put",
			url: serverAddress + `/event/share?email=${email}`,
			headers: { Authorization: "Bearer " + token },
		});
	}
}

export default EventService;
