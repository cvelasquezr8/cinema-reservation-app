import * as Google from 'expo-auth-session/providers/google';

export const useGoogleAuth = () => {
	return Google.useAuthRequest({
		// androidClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID!,
		androidClientId:
			'212989364703-nup0ak91i6tn1269csmgf6l5vtcp5r8q.apps.googleusercontent.com',
	});
};
