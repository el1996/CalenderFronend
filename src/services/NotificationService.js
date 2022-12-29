import axios from "axios";
import { serverAddress } from "../constants";

class NotificationService {
	static getNotificationSetting(token) {
		return axios({
			method: "get",
			url: serverAddress + `/event/settings`,
			headers: { Authorization: "Bearer " + token },
		});
	}
	static updateNotificationSetting(data, token) {
		return axios({
			method: "put",
			url: serverAddress + `/event/settings`,
			data,
			headers: { Authorization: "Bearer " + token },
		});
	}
}

export default NotificationService;
