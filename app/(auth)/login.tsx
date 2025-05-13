import React, { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
} from 'react-native';
import { Link, router } from 'expo-router';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { GoogleButton, NotificationModal } from 'components';
import { loginUser } from 'services/authService';
import { useNotification } from 'hooks/useNotification';
import loginStyle from 'styles/auth/login.style';
import { TokenType } from 'types/login.type';

export default function LoginScreen() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState<{
		email?: string;
		password?: string;
	}>({});

	const { notification, showNotification, hideNotification } =
		useNotification();

	const isFormValid = () => /\S+@\S+\.\S+/.test(email) && password.length > 0;
	const validate = () => {
		const newErrors: typeof errors = {};

		if (!email) {
			newErrors.email = 'Email is required';
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			newErrors.email = 'Invalid email format';
		}

		if (!password) {
			newErrors.password = 'Password is required';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleLogin = async () => {
		if (!validate()) return;

		const response = (await loginUser({
			email,
			password,
		})) as TokenType | null;

		if (!response) {
			showNotification(
				'error',
				'Server Error',
				'An error occurred while logging in',
			);
			return;
		}

		const token = response?.token;
		if (!token) {
			showNotification(
				'error',
				'Login Failed',
				'Invalid email or password',
			);
			return;
		}

		await AsyncStorage.setItem('token', token);
		router.replace('/(tabs)/movies');
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={loginStyle.container}
		>
			<NotificationModal
				visible={notification.visible}
				type={notification.type}
				title={notification.title}
				message={notification.message}
				onClose={hideNotification}
			/>

			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				{/* Hero */}
				<View style={loginStyle.heroSection}>
					<Image
						source={require('assets/images/cinema-background.jpeg')}
						style={loginStyle.heroImage}
					/>
					<View style={loginStyle.overlay} />
					<View style={loginStyle.heroContent}>
						<Text style={loginStyle.welcomeText}>Welcome to</Text>
						<Text style={loginStyle.appName}>CineReserve</Text>
						<Text style={loginStyle.tagline}>
							Your premier movie booking experience
						</Text>
					</View>
				</View>

				{/* Form */}
				<View style={loginStyle.formContainer}>
					<View style={loginStyle.inputContainer}>
						<Mail
							size={25}
							color="#666"
							style={loginStyle.inputIcon}
						/>
						<TextInput
							style={loginStyle.input}
							placeholder="Email"
							value={email}
							onChangeText={(text) => {
								setEmail(text);
								setErrors((e) => ({ ...e, email: undefined }));
							}}
							keyboardType="email-address"
							autoCapitalize="none"
							placeholderTextColor="#666"
						/>
					</View>
					{errors.email && (
						<Text style={loginStyle.errorText}>{errors.email}</Text>
					)}

					<View style={loginStyle.inputContainer}>
						<Lock
							size={25}
							color="#666"
							style={loginStyle.inputIcon}
						/>
						<TextInput
							style={loginStyle.input}
							placeholder="Password"
							value={password}
							onChangeText={(text) => {
								setPassword(text);
								setErrors((e) => ({
									...e,
									password: undefined,
								}));
							}}
							secureTextEntry={!showPassword}
							placeholderTextColor="#666"
						/>
						<TouchableOpacity
							onPress={() => setShowPassword(!showPassword)}
						>
							{showPassword ? (
								<EyeOff size={25} color="#999" />
							) : (
								<Eye size={25} color="#999" />
							)}
						</TouchableOpacity>
					</View>
					{errors.password && (
						<Text style={loginStyle.errorText}>
							{errors.password}
						</Text>
					)}

					<Link
						href="/forgot-password"
						style={loginStyle.forgotPassword}
					>
						<Text style={loginStyle.forgotPasswordText}>
							Forgot Password?
						</Text>
					</Link>

					<TouchableOpacity
						style={[
							loginStyle.loginButton,
							!isFormValid() && loginStyle.loginButtonDisabled,
						]}
						onPress={handleLogin}
						disabled={!isFormValid()}
					>
						<Text style={loginStyle.loginButtonText}>Login</Text>
						<ArrowRight size={25} color="#fff" />
					</TouchableOpacity>

					<View style={loginStyle.signupContainer}>
						<Text style={loginStyle.signupText}>
							Don't have an account?{' '}
						</Text>
						<Link href="/signup" style={loginStyle.signupLink}>
							Sign up
						</Link>
					</View>

					{/* Divider */}
					<View style={loginStyle.divider}>
						<View style={loginStyle.dividerLine} />
						<Text style={loginStyle.dividerText}>
							or continue with
						</Text>
						<View style={loginStyle.dividerLine} />
					</View>

					{/* Social login */}
					<View style={loginStyle.googleContainer}>
						<GoogleButton isLogin={true} />
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
