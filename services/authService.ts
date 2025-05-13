import { getRequest, postRequest } from './apiService';

type LoginPayload = {
	email: string;
	password: string;
};

type RegisterPayload = {
	fullName: string;
	email: string;
	password: string;
};

type LoginGooglePayload = {
	accessToken: string;
	idToken: string;
};

// Auth actions
export const loginUser = (credentials: LoginPayload) =>
	postRequest('/auth/login', credentials);

export const loginWithGoogle = (credentials: LoginGooglePayload) =>
	postRequest('/auth/google', credentials);

export const registerUser = (user: RegisterPayload) =>
	postRequest('/auth/register', user);

export const forgotPassword = (email: string) =>
	postRequest('/auth/forgot-password', { email });

export const verifyCode = (code: string) =>
	postRequest('/auth/verify-reset-code', { code });

export const resetPassword = (payload: { newPassword: string; code: string }) =>
	postRequest('/auth/reset-password', payload);

export const getProfile = () => getRequest('/auth/me');
