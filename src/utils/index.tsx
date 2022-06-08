import { IPaginationInfo } from "../types";

export const generateQueryString = <T,>(data: T) => {
	let queryString = "";
	for (const key in data) {
		if (Object.prototype.hasOwnProperty.call(data, key)) {
			const value = data[key as keyof T];
			if (value || typeof value === "number") {
				if (queryString.length === 0) {
					queryString += `${key}=${value}`;
				} else {
					queryString += `&${key}=${value}`;
				}
			}
		}
	}
	return queryString;
};

export function getToken() {
	let accessToken: string | null = null;
	if (
		typeof window !== undefined &&
		window.localStorage.getItem("access-token")
	) {
		accessToken = window.localStorage.getItem("access-token");
		return accessToken;
	} else {
		removeAccessToken();
	}
	return accessToken;
}
export const setAccessToken = (token: string) => {
	window.localStorage.setItem("access-token", token);
};
export const removeAccessToken = () => {
	window.localStorage.removeItem("access-token");
};

// pagination calculation
export const calculatePaginationFromTo = (
	data: IPaginationInfo
): {
	from: number;
	to: number;
} => {
	let to = 0,
		from = 0;

	if (data.numberOfElements < data.pageSize) {
		from =
			data.numberOfElements === 0
				? 0
				: data.pageSize * data.pageNumber - data.pageSize + 1;
		to = data.totalElements;
	} else {
		from = data.pageSize * data.pageNumber - data.pageSize + 1;
		to = data.pageSize * data.pageNumber;
	}

	return {
		from,
		to,
	};
};
