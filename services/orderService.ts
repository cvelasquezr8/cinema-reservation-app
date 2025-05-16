import { getRequest } from './apiService';

export const getOrders = async () => getRequest('/reservations/my');

export const getOrderById = async (id: string) =>
	getRequest(`/reservations/${id}`);
