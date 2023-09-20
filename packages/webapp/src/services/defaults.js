import { X_TOKEN } from "src/constants/api.constant";

const headers = () => {
	const xToken = localStorage.getItem(X_TOKEN);
	return {
		Accept: "application/json",
		"Content-Type": "application/json",
		authorization: `Bearer ${xToken}`,
	};
};

const defaultResponse = async (res) => {
	const { status } = res;
	const response = await res.json();
	if (status === 403) {
		localStorage.removeItem(X_TOKEN);
		window.location.href = "/#/user/login";
		return {
			resStatus: status,
			message: "Your token has expired, please login again.",
		};
	}
	if (status >= 400) {
		const { message } = response;
		return { resStatus: status, message };
	}
	return { ...response, resStatus: status };
};

const get = (api) => {
	return fetch(api, {
		headers: headers(),
		credentials: "include",
		method: "GET",
	}).then((res) => defaultResponse(res));
};

const post = (api, data) => {

	return fetch(api, {
		headers: headers(),
		credentials: "include",
		method: "POST",
		body: JSON.stringify(data),
	}).then((res) => defaultResponse(res));
};

const put = (api, data) => {
	return fetch(api, {
		headers: headers(),
		credentials: "include",
		method: "PUT",
		body: JSON.stringify(data),
	}).then((res) => defaultResponse(res));
};

const destroy = (api) => {
	return fetch(api, {
		headers: headers(),
		credentials: "include",
		method: "DELETE",
	}).then((res) => defaultResponse(res));
};

const toggle = (api) => {
	return fetch(api, {
		headers: headers(),
		credentials: "include",
		method: "PUT",
	}).then((res) => defaultResponse(res));
};

export { headers, get, post, put, destroy, toggle };
