import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const api = axios.create({
	baseURL:
		Platform.OS === 'ios'
			? process.env.EXPO_PUBLIC_API_IOS_URL
			: process.env.EXPO_PUBLIC_API_ANDROID_URL,
	timeout: 10000,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});

// Interceptor de request para añadir el token si existe
api.interceptors.request.use(
	async (config) => {
		try {
			const token = await AsyncStorage.getItem('token');
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
		} catch (error) {
			console.warn('[Storage Error] No se pudo obtener el token:', error);
		}
		return config;
	},
	(error) => Promise.reject(error),
);

api.interceptors.response.use(
	(response) => response,
	(error) => {
		console.error('[API Error]', error.response?.data || error.message);
		return Promise.reject(error);
	},
);

export default api;
