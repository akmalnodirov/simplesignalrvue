import axios from "axios";

const TOKEN_KEY = 'Authorization';
const REFRESH_TOKEN_KEY = 'Refresh';

const TokenService = {
	getToken() {
		return localStorage.getItem(TOKEN_KEY);
	},
	saveToken(token) {
		localStorage.setItem(TOKEN_KEY, token);
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	},
	saveRefreshToken(token) {
		localStorage.setItem(REFRESH_TOKEN_KEY, token);
	},
	removeToken() {
		localStorage.removeItem(TOKEN_KEY);
		localStorage.clear();
	},
	removeRefreshToken() {
		localStorage.removeItem(REFRESH_TOKEN_KEY);
	}
};

export default TokenService;
