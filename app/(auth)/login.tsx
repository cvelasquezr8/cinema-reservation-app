import React, { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Image,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
} from 'react-native';
import { Link, router } from 'expo-router';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react-native';
import api from 'lib/api';

export default function LoginScreen() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState<{ email?: string; password?: string }>(
		{},
	);

	const isFormValid = () =>
		/\S+@\S+\.\S+/.test(email) && password.length >= 6;

	const validate = () => {
		const newErrors: typeof errors = {};

		if (!email) {
			newErrors.email = 'Email is required';
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			newErrors.email = 'Invalid email format';
		}

		if (!password) {
			newErrors.password = 'Password is required';
		} else if (password.length < 6) {
			newErrors.password = 'Password must be at least 6 characters';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleLogin = async () => {
		if (!validate()) return;

		try {
			const response = await api.post('/auth/login', {
				email,
				password,
			});

			console.log({ response });
		} catch (error: any) {
			if (error.response?.status === 401) {
				setErrors({ password: 'Invalid credentials' });
			} else {
				console.error('Login error:', error);
			}
		}

		// const mockEmail = 'test@example.com';
		// const mockPassword = '123456';

		// if (email === mockEmail && password === mockPassword) {
		// 	router.replace('/(tabs)/movies'); // redirige a la pantalla principal
		// } else {
		// 	// Alert.alert('Invalid credentials', 'Try test@example.com / 123456');
		// }
	};

	const handleSocialLogin = (provider: string) => {
		console.log(`Login with ${provider}`);
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={styles.container}
		>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				{/* Hero */}
				<View style={styles.heroSection}>
					<Image
						source={{
							uri: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=500&fit=crop&crop=entropy',
						}}
						style={styles.heroImage}
					/>
					<View style={styles.overlay} />
					<View style={styles.heroContent}>
						<Text style={styles.welcomeText}>Welcome to</Text>
						<Text style={styles.appName}>CineReserve</Text>
						<Text style={styles.tagline}>
							Your premier movie booking experience
						</Text>
					</View>
				</View>

				{/* Form */}
				<View style={styles.formContainer}>
					<View style={styles.inputContainer}>
						<Mail size={20} color="#666" style={styles.inputIcon} />
						<TextInput
							style={styles.input}
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
						<Text style={styles.errorText}>{errors.email}</Text>
					)}

					<View style={styles.inputContainer}>
						<Lock size={20} color="#666" style={styles.inputIcon} />
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
						<Text style={styles.errorText}>{errors.password}</Text>
					)}

					<Link href="/forgot-password" style={styles.forgotPassword}>
						<Text style={styles.forgotPasswordText}>
							Forgot Password?
						</Text>
					</Link>

					<TouchableOpacity
						style={[
							styles.loginButton,
							!isFormValid() && styles.loginButtonDisabled,
						]}
						onPress={handleLogin}
						disabled={!isFormValid()}
					>
						<Text style={styles.loginButtonText}>Login</Text>
						<ArrowRight size={20} color="#fff" />
					</TouchableOpacity>

					{/* Divider */}
					<View style={styles.divider}>
						<View style={styles.dividerLine} />
						<Text style={styles.dividerText}>or continue with</Text>
						<View style={styles.dividerLine} />
					</View>

					{/* Social login buttons */}
					<View style={styles.socialButtons}>
						<TouchableOpacity
							style={styles.socialButton}
							onPress={() => handleSocialLogin('Google')}
						>
							<Image
								source={{
									uri: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg',
								}}
								style={styles.socialIcon}
							/>
							<Text style={styles.socialText}>Google</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.socialButton}
							onPress={() => handleSocialLogin('Facebook')}
						>
							<Image
								source={{
									uri: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png',
								}}
								style={styles.socialIcon}
							/>
							<Text style={styles.socialText}>Facebook</Text>
						</TouchableOpacity>
					</View>

					<View style={styles.signupContainer}>
						<Text style={styles.signupText}>
							Don't have an account?{' '}
						</Text>
						<Link href="/signup" style={styles.signupLink}>
							Sign up
						</Link>
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#fff' },
	heroSection: { height: 300, position: 'relative' },
	heroImage: { width: '100%', height: '100%' },
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	heroContent: {
		position: 'absolute',
		bottom: 40,
		left: 24,
		right: 24,
	},
	welcomeText: { color: '#fff', fontSize: 20, marginBottom: 4 },
	appName: {
		color: '#fff',
		fontSize: 36,
		fontWeight: 'bold',
		marginBottom: 8,
	},
	tagline: { color: '#fff', fontSize: 16, opacity: 0.9 },
	formContainer: {
		backgroundColor: '#fff',
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		marginTop: -20,
		padding: 24,
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
	inputIcon: { marginRight: 12 },
	input: { flex: 1, fontSize: 16, color: '#1a1a1a' },
	errorText: {
		color: '#E50914',
		fontSize: 13,
		marginBottom: 12,
		marginLeft: 8,
	},
	forgotPassword: {
		alignSelf: 'flex-end',
		marginBottom: 24,
	},
	forgotPasswordText: {
		color: '#1e90ff',
		fontWeight: 'bold',
		fontSize: 14,
	},
	loginButton: {
		backgroundColor: '#E50914',
		borderRadius: 12,
		height: 56,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 24,
	},
	loginButtonDisabled: {
		backgroundColor: '#ccc',
	},
	loginButtonText: {
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
	socialButtons: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 24,
	},
	socialButton: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#f5f5f5',
		paddingVertical: 10,
		paddingHorizontal: 16,
		borderRadius: 12,
		flex: 1,
		justifyContent: 'center',
		marginHorizontal: 6,
	},
	socialIcon: {
		width: 20,
		height: 20,
		marginRight: 8,
		resizeMode: 'contain',
	},
	socialText: {
		fontSize: 16,
		color: '#1a1a1a',
	},
	signupContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	signupText: {
		color: '#666',
		fontSize: 16,
	},
	signupLink: {
		color: '#E50914',
		fontSize: 16,
		fontWeight: '600',
	},
});
