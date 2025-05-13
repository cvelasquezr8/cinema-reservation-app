import api from 'lib/api';

type ApiResponse<T> = T | null;

export const postRequest = async <T>(
	url: string,
	body?: any,
): Promise<ApiResponse<T>> => {
	try {
		const { data } = await api.post<T>(url, body);
		return data;
	} catch (error) {
		console.error(`POST ${url} failed`, error);
		return null;
	}
};

export const getRequest = async <T>(url: string): Promise<ApiResponse<T>> => {
	try {
		const { data } = await api.get<T>(url);
		return data;
	} catch (error) {
		console.error(`GET ${url} failed`, error);
		return null;
	}
};
