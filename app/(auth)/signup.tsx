import React, { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Image,
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

export default function SignUpScreen() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState<{
		name?: string;
		email?: string;
		password?: string;
	}>({});

	const isFormValid = () =>
		name.trim().length > 0 &&
		/\S+@\S+\.\S+/.test(email) &&
		password.length >= 6;

	const validate = () => {
		const newErrors: typeof errors = {};

		if (!name.trim()) newErrors.name = 'Name is required';
		if (!email) newErrors.email = 'Email is required';
		else if (!/\S+@\S+\.\S+/.test(email))
			newErrors.email = 'Invalid email format';
		if (!password) newErrors.password = 'Password is required';
		else if (password.length < 6)
			newErrors.password = 'Password must be at least 6 characters';

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSignUp = () => {
		if (validate()) {
			console.log('Sign up with:', { name, email, password });
		}
	};

	const handleSocialSignUp = (provider: string) => {
		console.log(`Sign up with ${provider}`);
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
								value={name}
								onChangeText={(text) => {
									setName(text);
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
						<View style={styles.socialButtons}>
							<TouchableOpacity
								style={styles.socialButton}
								onPress={() => handleSocialSignUp('Google')}
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
								onPress={() => handleSocialSignUp('Facebook')}
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
	inputIcon: { marginRight: 12 },
	input: { flex: 1, fontSize: 16, color: '#1a1a1a' },
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
	socialButtons: {
		flexDirection: 'row',
		justifyContent: 'space-between',
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
});
