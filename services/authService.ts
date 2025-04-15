import api from 'lib/api';

export const loginUser = async (credentials: {
	email: string;
	password: string;
}) => {
	const { data = null } = await api.post('/auth/login', credentials);
	return data;
};

export const registerUser = async (user: {
	fullName: string;
	email: string;
	password: string;
}) => {
	const { data = null } = await api.post('/auth/register', user);
	return data;
};

export const forgotPassword = async (email: string) => {
	const { data = null } = await api.post('/auth/forgot-password', { email });
	return data;
};

export const verifyCode = async (code: string) => {
	const { data = null } = await api.post('/auth/verify-reset-code', { code });
	return data;
};

export const resetPassword = async ({
	newPassword,
	code,
}: {
	newPassword: string;
	code: string;
}) => {
	const { data = null } = await api.post('/auth/reset-password', {
		newPassword,
		code,
	});
	return data;
};
