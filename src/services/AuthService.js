import axios from "axios";
import { serverAddress } from "../constants";

class AuthService {
	static register(userData) {
		return axios.post(serverAddress + "/auth/register", userData);
	}
	static loginViaEmail(userData) {
		return axios.post(serverAddress + "/auth/login/email", userData);
	}
}

export default AuthService;
