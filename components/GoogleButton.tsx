import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { useGoogleAuthViewModel } from 'features/auth/viewModels/useGoogleAuthViewModel';

interface GoogleButtonProps {
	setErrors: (errors: { email: string }) => void;
	isLogin: boolean;
}

export default function GoogleButton({
	setErrors,
	isLogin,
}: GoogleButtonProps) {
	const { promptAsync, request } = useGoogleAuthViewModel(setErrors);

	return (
		<TouchableOpacity
			disabled={!request}
			onPress={() =>
				promptAsync().catch((e) => {
					console.error('Google login prompt error:', e);
					setErrors({
						email: 'Google login failed. Try again later.',
					});
				})
			}
			style={styles.googleButton}
		>
			<Image
				source={require('assets/images/google-logo.png')}
				style={styles.googleIcon}
			/>
			<Text style={styles.googleText}>
				{isLogin ? 'Login' : 'Sign up'} with Google
			</Text>
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
