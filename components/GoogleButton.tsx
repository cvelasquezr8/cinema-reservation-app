import React, { useEffect, useState } from 'react';
import {
	TouchableOpacity,
	Image,
	Text,
	StyleSheet,
	ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useGoogleAuth } from 'lib/auth/useGoogleAuth';
import { loginWithGoogle } from 'services/authService';
import { TokenType } from 'types/login.type';

interface GoogleButtonProps {
	isLogin: boolean;
}

export default function GoogleButton({ isLogin }: GoogleButtonProps) {
	const [loading, setLoading] = useState(false);
	const [request, response, promptAsync] = useGoogleAuth();

	useEffect(() => {
		if (response?.type === 'success' && response.authentication) {
			const { accessToken, idToken } = response.authentication;
			if (accessToken && idToken) {
				handleGoogleLogin(accessToken, idToken);
			}
		}
	}, [response]);

	const handleGoogleLogin = async (accessToken: string, idToken: string) => {
		console.log({ accessToken });
		console.log({ idToken });
		try {
			setLoading(true);
			const response = (await loginWithGoogle({
				accessToken,
				idToken,
			})) as TokenType | null;

			const token = response?.token;
			if (!token) throw new Error('No token received from Google login');

			await AsyncStorage.setItem('token', token);
			router.replace('/(tabs)/movies');
		} catch (err) {
			console.error('Google login error:', err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<TouchableOpacity
			disabled={!request || loading}
			onPress={() => promptAsync()}
			style={[
				styles.googleButton,
				loading && styles.googleButtonDisabled,
			]}
		>
			{loading ? (
				<ActivityIndicator size="small" color="#1a1a1a" />
			) : (
				<>
					<Image
						source={require('assets/images/google-logo.png')}
						style={styles.googleIcon}
					/>
					<Text style={styles.googleText}>
						{isLogin ? 'Login' : 'Sign up'} with Google
					</Text>
				</>
			)}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	googleButton: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#fff',
		borderColor: '#e1e1e1',
		borderWidth: 1,
		paddingVertical: 14,
		paddingHorizontal: 20,
		borderRadius: 12,
		width: '80%',
		justifyContent: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 6,
		elevation: 3,
	},
	googleButtonDisabled: {
		opacity: 0.6,
	},
	googleIcon: {
		width: 26,
		height: 26,
		marginRight: 12,
		resizeMode: 'contain',
		backgroundColor: '#eee',
	},
	googleText: {
		fontSize: 20,
		color: '#1a1a1a',
		fontWeight: '600',
	},
});
