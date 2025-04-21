import React, { useEffect, useState } from 'react';
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
import {
	ArrowLeft,
	Mail,
	Lock,
	ArrowRight,
	Key,
	EyeOff,
	Eye,
} from 'lucide-react-native';
import {
	forgotPassword,
	resetPassword,
	verifyCode,
} from 'services/authService';
import forgotPasswordStyle from 'styles/auth/forgot-password.style';

type Step = 'email' | 'verification' | 'new-password';

export default function ForgotPasswordScreen() {
	const [step, setStep] = useState<Step>('email');
	const [email, setEmail] = useState('');
	const [verificationCode, setVerificationCode] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [errors, setErrors] = useState<{
		email?: string;
		code?: string;
		tokenCode?: string;
	}>({});

	const isEmailValid = () => /\S+@\S+\.\S+/.test(email);
	const isValidCode = () => verificationCode.length === 6;
	const [passwordRules, setPasswordRules] = useState({
		hasMinLength: false,
		hasUppercase: false,
		hasLowercase: false,
		hasNumberOrSymbol: false,
		isTheSame: false,
	});

	useEffect(() => {
		const hasMinLength = newPassword.length >= 6;
		const hasUppercase = /[A-Z]/.test(newPassword);
		const hasLowercase = /[a-z]/.test(newPassword);
		const hasNumberOrSymbol = /(?=.*\d)|(?=.*\W+)/.test(newPassword);
		const isTheSame =
			newPassword.length > 0 && newPassword === confirmPassword;

		setPasswordRules({
			hasMinLength,
			hasUppercase,
			hasLowercase,
			hasNumberOrSymbol,
			isTheSame,
		});
	}, [newPassword, confirmPassword]);

	const isPasswordValid = () =>
		passwordRules.hasMinLength &&
		passwordRules.hasUppercase &&
		passwordRules.hasLowercase &&
		passwordRules.hasNumberOrSymbol &&
		passwordRules.isTheSame;

	const handleSendCode = async () => {
		if (!isEmailValid()) return;

		try {
			setIsSubmitting(true);
			const response = await forgotPassword(email);
			if (!response) throw new Error('Invalid response');
			setStep('verification');
		} catch (error: any) {
			setErrors({ email: 'Invalid email.' });
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleVerifyCode = async () => {
		if (!isValidCode()) return;

		try {
			setIsSubmitting(true);
			const response = await verifyCode(verificationCode);
			if (!response) throw new Error('Invalid response verification');
			setStep('new-password');
		} catch (error: any) {
			setErrors({ code: 'Invalid code.' });
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleResetPassword = async () => {
		if (!isPasswordValid()) return;

		try {
			setIsSubmitting(true);
			const response = await resetPassword({
				newPassword,
				code: verificationCode,
			});

			if (!response) throw new Error('Invalid response verification');
			router.replace('/');
		} catch (error) {
			setErrors({ tokenCode: 'Invalid token code.' });
		} finally {
			setIsSubmitting(false);
		}
	};

	const renderEmailStep = () => (
		<>
			<View style={forgotPasswordStyle.infoSection}>
				<Text style={forgotPasswordStyle.title}>
					Forgot your password?
				</Text>
				<Text style={forgotPasswordStyle.description}>
					Enter your email address and we'll send you a verification
					code.
				</Text>
			</View>

			<View style={forgotPasswordStyle.formSection}>
				<View style={forgotPasswordStyle.inputContainer}>
					<Mail
						size={20}
						color="#666"
						style={forgotPasswordStyle.inputIcon}
					/>
					<TextInput
						style={forgotPasswordStyle.input}
						placeholder="Enter your email"
						value={email}
						onChangeText={(text) => {
							setEmail(text);
							setErrors((e) => ({ ...e, email: undefined }));
						}}
						keyboardType="email-address"
						autoCapitalize="none"
						editable={!isSubmitting}
						placeholderTextColor="#666"
					/>
				</View>
				{errors.email && (
					<Text style={forgotPasswordStyle.errorText}>
						{errors.email}
					</Text>
				)}

				<TouchableOpacity
					style={[
						forgotPasswordStyle.submitButton,
						!isEmailValid() &&
							forgotPasswordStyle.submitButtonDisabled,
					]}
					onPress={handleSendCode}
					disabled={isSubmitting}
				>
					<Text style={forgotPasswordStyle.submitButtonText}>
						{isSubmitting
							? 'Sending Code...'
							: 'Send Verification Code'}
					</Text>
					{!isSubmitting && <ArrowRight size={20} color="#fff" />}
				</TouchableOpacity>
			</View>
		</>
	);

	const renderVerificationStep = () => (
		<>
			<View style={forgotPasswordStyle.infoSection}>
				<Text style={forgotPasswordStyle.title}>
					Enter Verification Code
				</Text>
				<Text style={forgotPasswordStyle.description}>
					We've sent a 6-digit verification code to {email}
				</Text>
			</View>

			<View style={forgotPasswordStyle.formSection}>
				<View style={forgotPasswordStyle.inputContainer}>
					<Key
						size={25}
						color="#666"
						style={forgotPasswordStyle.inputIcon}
					/>
					<TextInput
						style={forgotPasswordStyle.input}
						placeholder="Enter 6-digit code"
						value={verificationCode}
						onChangeText={(text) => {
							setVerificationCode(
								text.replace(/[^0-9]/g, '').slice(0, 6),
							);
							setErrors((e) => ({ ...e, code: undefined }));
						}}
						keyboardType="numeric"
						maxLength={6}
						editable={!isSubmitting}
						placeholderTextColor="#666"
					/>
				</View>
				{errors.code && (
					<Text style={forgotPasswordStyle.errorText}>
						{errors.code}
					</Text>
				)}

				<TouchableOpacity
					style={[
						forgotPasswordStyle.submitButton,
						!isValidCode() &&
							forgotPasswordStyle.submitButtonDisabled,
						,
					]}
					onPress={handleVerifyCode}
					disabled={isSubmitting}
				>
					<Text style={forgotPasswordStyle.submitButtonText}>
						{isSubmitting ? 'Verifying...' : 'Verify Code'}
					</Text>
					{!isSubmitting && <ArrowRight size={20} color="#fff" />}
				</TouchableOpacity>

				<TouchableOpacity
					style={forgotPasswordStyle.resendButton}
					onPress={handleSendCode}
					disabled={isSubmitting}
				>
					<Text style={forgotPasswordStyle.resendButtonText}>
						Resend Code
					</Text>
				</TouchableOpacity>
			</View>
		</>
	);

	const renderNewPasswordStep = () => (
		<>
			<View style={forgotPasswordStyle.infoSection}>
				<Text style={forgotPasswordStyle.title}>
					Create New Password
				</Text>
				<Text style={forgotPasswordStyle.description}>
					Please enter your new password below.
				</Text>
			</View>

			<View style={forgotPasswordStyle.formSection}>
				<View style={forgotPasswordStyle.inputContainer}>
					<Lock
						size={20}
						color="#666"
						style={forgotPasswordStyle.inputIcon}
					/>
					<TextInput
						style={forgotPasswordStyle.input}
						placeholder="New password"
						value={newPassword}
						onChangeText={setNewPassword}
						secureTextEntry={!showPassword}
						editable={!isSubmitting}
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

				<View style={forgotPasswordStyle.inputContainer}>
					<Lock
						size={20}
						color="#666"
						style={forgotPasswordStyle.inputIcon}
					/>
					<TextInput
						style={forgotPasswordStyle.input}
						placeholder="Confirm new password"
						value={confirmPassword}
						onChangeText={setConfirmPassword}
						secureTextEntry={!showConfirmPassword}
						editable={!isSubmitting}
						placeholderTextColor="#666"
					/>
					<TouchableOpacity
						onPress={() =>
							setShowConfirmPassword(!showConfirmPassword)
						}
					>
						{showConfirmPassword ? (
							<EyeOff size={25} color="#999" />
						) : (
							<Eye size={25} color="#999" />
						)}
					</TouchableOpacity>
				</View>

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
						{
							key: 'isTheSame',
							label: 'Passwords match',
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
				{errors.tokenCode && (
					<Text style={forgotPasswordStyle.errorText}>
						{errors.tokenCode ||
							'Please check your password rules.'}
					</Text>
				)}

				<TouchableOpacity
					style={[
						forgotPasswordStyle.submitButton,
						!isPasswordValid() &&
							forgotPasswordStyle.submitButtonDisabled,
					]}
					onPress={handleResetPassword}
					disabled={isSubmitting}
				>
					<Text style={forgotPasswordStyle.submitButtonText}>
						{isSubmitting
							? 'Resetting Password...'
							: 'Reset Password'}
					</Text>
					{!isSubmitting && <ArrowRight size={20} color="#fff" />}
				</TouchableOpacity>
			</View>
		</>
	);

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={forgotPasswordStyle.container}
		>
			<ScrollView
				contentContainerStyle={forgotPasswordStyle.scrollContent}
			>
				<View style={forgotPasswordStyle.header}>
					<TouchableOpacity
						style={forgotPasswordStyle.backButton}
						onPress={() => {
							if (step === 'email') {
								router.back();
							} else {
								setStep(
									step === 'verification'
										? 'email'
										: 'verification',
								);
							}
						}}
					>
						<ArrowLeft size={24} color="#1a1a1a" />
					</TouchableOpacity>
					<Text style={forgotPasswordStyle.headerTitle}>
						Reset Password
					</Text>
				</View>

				<View style={forgotPasswordStyle.content}>
					{step === 'email' && renderEmailStep()}
					{step === 'verification' && renderVerificationStep()}
					{step === 'new-password' && renderNewPasswordStep()}

					<View style={forgotPasswordStyle.helpSection}>
						<Text style={forgotPasswordStyle.helpTitle}>
							Need Help?
						</Text>
						<View style={forgotPasswordStyle.helpCard}>
							<Text style={forgotPasswordStyle.helpText}>
								If you're having trouble resetting your
								password, our support team is here to help.
							</Text>
							<TouchableOpacity
								style={forgotPasswordStyle.contactButton}
							>
								<Text
									style={
										forgotPasswordStyle.contactButtonText
									}
								>
									Contact Support: support@cineapp.com
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
