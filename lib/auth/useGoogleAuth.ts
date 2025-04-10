import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';
import { Platform } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export const useGoogleAuth = () => {
	// const [] = Google.useAuthRequest({})

	return Google.useAuthRequest({
		clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID!,
		redirectUri: makeRedirectUri(),
		scopes: ['openid', 'profile', 'email'],
		responseType: 'id_token token',
		selectAccount: true,
	});
};
