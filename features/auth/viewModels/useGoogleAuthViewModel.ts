import { useEffect } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from 'lib/api';
import { useGoogleAuth } from 'lib/auth/useGoogleAuth';

export function useGoogleAuthViewModel(
	setErrors: (errors: { email: string }) => void,
) {
	const [request, response, promptAsync] = useGoogleAuth();

	useEffect(() => {
		if (response?.type === 'success' && response.authentication) {
			const { accessToken, idToken } = response.authentication;
			if (accessToken && idToken) loginWithGoogle(accessToken, idToken);
		}
	}, [response]);

	const loginWithGoogle = async (accessToken: string, idToken: string) => {
		try {
			const res = await api.post('/auth/google', {
				accessToken,
				idToken,
			});
			const { token } = res.data.data;
			await AsyncStorage.setItem('token', token);
			router.replace('/(tabs)/movies');
		} catch (error) {
			console.error('Google login error:', error);
			setErrors({ email: 'Google login failed. Try again later.' });
		}
	};

	return {
		promptAsync,
		request,
	};
}
