import React, { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
	Mail,
	Lock,
	User,
	ArrowLeft,
	ArrowRight,
	Eye,
	EyeOff,
} from 'lucide-react-native';

import { GoogleButton, NotificationModal } from 'components';
import { registerUser } from 'services/authService';
import { useNotification } from 'hooks/useNotification';
import { TokenType } from 'types/login.type';
import signUpStyle from 'styles/auth/signup.style';

export default function SignUpScreen() {
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState<{
		name?: string;
		email?: string;
		password?: string;
	}>({});

	const [passwordRules, setPasswordRules] = useState({
		hasMinLength: false,
		hasUppercase: false,
		hasLowercase: false,
		hasNumberOrSymbol: false,
	});

	const { notification, showNotification, hideNotification } =
		useNotification();

	const validate = () => {
		const newErrors: typeof errors = {};

		if (!fullName.trim()) newErrors.name = 'Name is required';

		if (!email) newErrors.email = 'Email is required';
		else if (!/\S+@\S+\.\S+/.test(email))
			newErrors.email = 'Invalid email format';

		if (!password) {
			newErrors.password = 'Password is required';
		} else {
			const regex =
				/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

			if (password.length < 6)
				newErrors.password = 'Minimum 6 characters';
			else if (!regex.test(password))
				newErrors.password =
					'Must include uppercase, lowercase, number or symbol';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSignUp = async () => {
		if (!validate()) return;

		const response = (await registerUser({
			fullName,
			email,
			password,
		})) as TokenType | null;

		if (!response) {
			showNotification(
				'error',
				'Server Error',
				'An error occurred while signing up',
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

	const isFormValid = () => {
		return (
			/\S+@\S+\.\S+/.test(email) &&
			password.length > 0 &&
			fullName.length > 0 &&
			passwordRules.hasMinLength &&
			passwordRules.hasUppercase &&
			passwordRules.hasLowercase &&
			passwordRules.hasNumberOrSymbol
		);
	};

	return (
		<SafeAreaView style={signUpStyle.safeArea}>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={{ flex: 1 }}
			>
				<NotificationModal
					visible={notification.visible}
					type={notification.type}
					title={notification.title}
					message={notification.message}
					onClose={hideNotification}
				/>

				<ScrollView contentContainerStyle={signUpStyle.scrollContent}>
					<TouchableOpacity
						style={signUpStyle.backButton}
						onPress={() => router.back()}
					>
						<ArrowLeft size={28} color="#1a1a1a" />
						<Text style={signUpStyle.backText}>Back to Login</Text>
					</TouchableOpacity>

					<View style={signUpStyle.headerContainer}>
						<Text style={signUpStyle.title}>Create Account</Text>
						<Text style={signUpStyle.subtitle}>
							Join CineReserve and start booking your favorite
							movies
						</Text>
					</View>

					<View style={signUpStyle.formContainer}>
						<View style={signUpStyle.inputContainer}>
							<User
								size={25}
								color="#666"
								style={signUpStyle.inputIcon}
							/>
							<TextInput
								style={signUpStyle.input}
								placeholder="Full Name"
								value={fullName}
								onChangeText={(text) => {
									setFullName(text);
									setErrors((e) => ({
										...e,
										name: undefined,
									}));
								}}
								autoCapitalize="words"
								placeholderTextColor="#666"
							/>
						</View>
						{errors.name && (
							<Text style={signUpStyle.errorText}>
								{errors.name}
							</Text>
						)}

						<View style={signUpStyle.inputContainer}>
							<Mail
								size={25}
								color="#666"
								style={signUpStyle.inputIcon}
							/>
							<TextInput
								style={signUpStyle.input}
								placeholder="Email"
								value={email}
								onChangeText={(text) => {
									setEmail(text);
									setErrors((e) => ({
										...e,
										email: undefined,
									}));
								}}
								keyboardType="email-address"
								autoCapitalize="none"
								placeholderTextColor="#666"
							/>
						</View>
						{errors.email && (
							<Text style={signUpStyle.errorText}>
								{errors.email}
							</Text>
						)}

						<View style={signUpStyle.inputContainer}>
							<Lock
								size={25}
								color="#666"
								style={signUpStyle.inputIcon}
							/>
							<TextInput
								style={signUpStyle.input}
								placeholder="Password"
								value={password}
								onChangeText={(text) => {
									setPassword(text);
									setErrors((e) => ({
										...e,
										password: undefined,
									}));
									setPasswordRules({
										hasMinLength: text.length >= 6,
										hasUppercase: /[A-Z]/.test(text),
										hasLowercase: /[a-z]/.test(text),
										hasNumberOrSymbol: /\d|\W/.test(text),
									});
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
							<Text style={signUpStyle.errorText}>
								{errors.password}
							</Text>
						)}

						<View style={{ marginVertical: 10 }}>
							{[
								{
									key: 'hasMinLength',
									label: 'At least 6 characters',
								},
								{
									key: 'hasUppercase',
									label: 'One uppercase letter',
								},
								{
									key: 'hasLowercase',
									label: 'One lowercase letter',
								},
								{
									key: 'hasNumberOrSymbol',
									label: 'One number or symbol',
								},
							].map((rule) => (
								<Text
									key={rule.key}
									style={{
										color: passwordRules[
											rule.key as keyof typeof passwordRules
										]
											? 'green'
											: '#999',
										fontSize: 15,
										marginBottom: 2,
									}}
								>
									{passwordRules[
										rule.key as keyof typeof passwordRules
									]
										? '✓'
										: '•'}{' '}
									{rule.label}
								</Text>
							))}
						</View>

						<Text style={signUpStyle.termsText}>
							By signing up, you agree to our{' '}
							<Text style={signUpStyle.linkText}>
								Terms of Service
							</Text>{' '}
							and{' '}
							<Text style={signUpStyle.linkText}>
								Privacy Policy
							</Text>
							.
						</Text>

						<TouchableOpacity
							style={[
								signUpStyle.signUpButton,
								!isFormValid() && signUpStyle.disabledButton,
							]}
							onPress={handleSignUp}
							disabled={!isFormValid()}
						>
							<Text style={signUpStyle.signUpButtonText}>
								Create Account
							</Text>
							<ArrowRight size={25} color="#fff" />
						</TouchableOpacity>

						<View style={signUpStyle.divider}>
							<View style={signUpStyle.dividerLine} />
							<Text style={signUpStyle.dividerText}>
								or continue with
							</Text>
							<View style={signUpStyle.dividerLine} />
						</View>

						<View style={signUpStyle.googleContainer}>
							<GoogleButton isLogin={false} />
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}
