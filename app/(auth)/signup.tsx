import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Image,
	StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
	Mail,
	Lock,
	User,
	ArrowLeft,
	ArrowRight,
	Eye,
	EyeOff,
} from 'lucide-react-native';
import api from 'lib/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GoogleButton from '@/components/google-login.button';

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

	const isFormValid = () => {
		const passwordRegex =
			/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

		return (
			fullName.trim().length > 0 &&
			/\S+@\S+\.\S+/.test(email) &&
			password.length >= 6 &&
			passwordRegex.test(password)
		);
	};

	const validate = () => {
		const newErrors: typeof errors = {};

		if (!fullName.trim()) newErrors.name = 'Name is required';

		if (!email) newErrors.email = 'Email is required';
		else if (!/\S+@\S+\.\S+/.test(email))
			newErrors.email = 'Invalid email format';

		if (!password) {
			newErrors.password = 'Password is required';
		} else if (password.length < 6) {
			newErrors.password = 'Password must be at least 6 characters';
		} else {
			const passwordRegex =
				/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

			if (!passwordRegex.test(password)) {
				newErrors.password =
					'Password must include uppercase, lowercase, and a number or symbol';
			}
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSignUp = async () => {
		if (!validate()) return;

		try {
			const response = await api.post('/auth/register', {
				fullName,
				email,
				password,
			});

			const result = response.data;
			if (!result) return setErrors({ name: 'Invalid response' });
			if (result.statusCode !== 201 || !result.data)
				return setErrors({ name: result.message });

			const { token } = result.data;
			await AsyncStorage.setItem('token', token);
			router.replace('/(tabs)/movies');
		} catch (error: any) {
			setErrors({ name: 'Server error, please try again later.' });
		}
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={{ flex: 1 }}
			>
				<ScrollView contentContainerStyle={styles.scrollContent}>
					{/* Back arrow */}
					<TouchableOpacity
						style={styles.backButton}
						onPress={() => router.back()}
					>
						<ArrowLeft size={28} color="#1a1a1a" />
						<Text style={styles.backText}>Back to Login</Text>
					</TouchableOpacity>

					{/* Header */}
					<View style={styles.headerContainer}>
						<Text style={styles.title}>Create Account</Text>
						<Text style={styles.subtitle}>
							Join CineReserve and start booking your favorite
							movies
						</Text>
					</View>

					{/* Form */}
					<View style={styles.formContainer}>
						<View style={styles.inputContainer}>
							<User
								size={20}
								color="#666"
								style={styles.inputIcon}
							/>
							<TextInput
								style={styles.input}
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
							<Text style={styles.errorText}>{errors.name}</Text>
						)}

						<View style={styles.inputContainer}>
							<Mail
								size={20}
								color="#666"
								style={styles.inputIcon}
							/>
							<TextInput
								style={styles.input}
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
							<Text style={styles.errorText}>{errors.email}</Text>
						)}

						<View style={styles.inputContainer}>
							<Lock
								size={20}
								color="#666"
								style={styles.inputIcon}
							/>
							<TextInput
								style={styles.input}
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
									<EyeOff size={20} color="#999" />
								) : (
									<Eye size={20} color="#999" />
								)}
							</TouchableOpacity>
						</View>
						{errors.password && (
							<Text style={styles.errorText}>
								{errors.password}
							</Text>
						)}

						<Text style={styles.termsText}>
							By signing up, you agree to our{' '}
							<Text style={styles.linkText}>
								Terms of Service
							</Text>{' '}
							and{' '}
							<Text style={styles.linkText}>Privacy Policy</Text>.
						</Text>

						{/* Signup Button */}
						<TouchableOpacity
							style={[
								styles.signUpButton,
								!isFormValid() && styles.disabledButton,
							]}
							onPress={handleSignUp}
							disabled={!isFormValid()}
						>
							<Text style={styles.signUpButtonText}>
								Create Account
							</Text>
							<ArrowRight size={20} color="#fff" />
						</TouchableOpacity>

						{/* Divider */}
						<View style={styles.divider}>
							<View style={styles.dividerLine} />
							<Text style={styles.dividerText}>
								or continue with
							</Text>
							<View style={styles.dividerLine} />
						</View>

						{/* Social login buttons */}
						{/* Google Sign Up only */}
						<View style={styles.googleContainer}>
							<GoogleButton
								setErrors={setErrors}
								isLogin={false}
							/>
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: '#fff',
	},
	scrollContent: {
		flexGrow: 1,
		padding: 24,
		backgroundColor: '#fff',
	},
	backButton: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 24,
	},
	backText: {
		marginLeft: 10,
		fontSize: 18,
		fontWeight: 'bold',
		color: '#1a1a1a',
	},
	headerContainer: {
		marginBottom: 24,
	},
	title: {
		fontSize: 32,
		fontWeight: 'bold',
		color: '#1a1a1a',
		marginBottom: 6,
	},
	subtitle: {
		fontSize: 16,
		color: '#666',
		lineHeight: 24,
	},
	formContainer: {
		width: '100%',
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#f5f5f5',
		borderRadius: 12,
		marginBottom: 8,
		paddingHorizontal: 16,
		height: 56,
	},
	inputIcon: {
		marginRight: 12,
	},
	input: {
		flex: 1,
		fontSize: 16,
		color: '#1a1a1a',
	},
	errorText: {
		color: '#E50914',
		fontSize: 13,
		marginBottom: 12,
		marginLeft: 8,
	},
	termsText: {
		fontSize: 14,
		color: '#666',
		marginVertical: 16,
		lineHeight: 20,
	},
	linkText: {
		color: '#E50914',
		textDecorationLine: 'underline',
	},
	signUpButton: {
		backgroundColor: '#E50914',
		borderRadius: 12,
		height: 56,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 24,
	},
	disabledButton: {
		backgroundColor: '#ccc',
	},
	signUpButtonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: '600',
		marginRight: 8,
	},
	divider: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 24,
	},
	dividerLine: {
		flex: 1,
		height: 1,
		backgroundColor: '#e1e1e1',
	},
	dividerText: {
		color: '#666',
		paddingHorizontal: 12,
		fontSize: 14,
	},
	googleContainer: {
		alignItems: 'center',
		marginBottom: 24,
	},
});
