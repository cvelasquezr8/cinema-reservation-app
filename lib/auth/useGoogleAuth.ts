import * as Google from 'expo-auth-session/providers/google';

export const useGoogleAuth = () => {
	return Google.useAuthRequest({
		androidClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
	});
};
