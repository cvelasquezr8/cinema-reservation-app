import React, { useEffect, useState, useRef } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	ScrollView,
	Image,
	ActivityIndicator,
	Alert,
	Platform,
} from 'react-native';
import { router } from 'expo-router';
import {
	User,
	Mail,
	Phone,
	MapPin,
	Calendar,
	Camera,
	LogOut,
	CircleAlert as AlertCircle,
} from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { format, isValid, parse } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProfile } from 'services/authService';
import { UserModel } from 'models/user.model';
import profileStyle from 'styles/profile/user-detail.style';

export default function ProfileScreen() {
	const [userData, setUserData] = useState<UserModel | null>(null);
	const [originalData, setOriginalData] = useState<UserModel | null>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [formErrors, setFormErrors] = useState<{
		[key in keyof UserModel]?: string;
	}>({});
	const mountedRef = useRef(true);

	useEffect(() => {
		loadUserData();
		return () => {
			mountedRef.current = false;
		};
	}, []);

	const loadUserData = async () => {
		try {
			const user = await getProfile();
			if (mountedRef.current) {
				setUserData(user);
				setOriginalData(user);
			}
		} catch (error) {
			if (mountedRef.current) {
				Alert.alert('Error', 'Failed to load profile data');
			}
		}
	};

	const formatPhone = (text: string): string => {
		const cleaned = text.replace(/\D/g, '');
		const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
		if (match) {
			return `(${match[1]}) ${match[2]}-${match[3]}`;
		}
		return cleaned;
	};

	const formatBirthdate = (text: string): string => {
		const cleaned = text.replace(/\D/g, '');
		const match = cleaned.match(/^(\d{4})(\d{2})(\d{2})$/);
		if (match) {
			return `${match[1]}-${match[2]}-${match[3]}`;
		}
		return text;
	};

	const validateForm = (): boolean => {
		if (!userData) return false;

		const errors: typeof formErrors = {};

		// Name validation
		if (!userData.fullName.trim()) {
			errors.fullName = 'Name is required';
		} else if (userData.fullName.length < 2) {
			errors.fullName = 'Name must be at least 2 characters';
		}

		// Phone validation
		const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
		if (!phoneRegex.test(userData.phone)) {
			errors.phone = 'Enter a valid phone number: (XXX) XXX-XXXX';
		}

		// Address validation
		if (!userData.address.trim()) {
			errors.address = 'Address is required';
		}

		// Birthdate validation
		const birthdate = parse(userData.birthdate, 'yyyy-MM-dd', new Date());
		if (!isValid(birthdate)) {
			errors.birthdate = 'Enter a valid date: YYYY-MM-DD';
		} else {
			const today = new Date();
			const age = today.getFullYear() - birthdate.getFullYear();
			if (age < 13) {
				errors.birthdate = 'You must be at least 13 years old';
			} else if (age > 120) {
				errors.birthdate = 'Please enter a valid birth year';
			}
		}

		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleSave = async () => {
		if (!userData || !validateForm()) return;

		setIsLoading(true);
		try {
			// await updateProfile(userData);
			setOriginalData(userData);
			setIsEditing(false);
			Alert.alert('Success', 'Profile updated successfully');
		} catch (error) {
			Alert.alert('Error', 'Failed to update profile');
		} finally {
			setIsLoading(false);
		}
	};

	const handlePhotoSelect = async () => {
		if (!isEditing) return;

		const { status } =
			await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (status !== 'granted') {
			Alert.alert(
				'Permission needed',
				'Please grant permission to access your photos',
			);
			return;
		}

		try {
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [1, 1],
				quality: 0.8,
			});

			if (!result.canceled && result.assets[0].uri) {
				setUserData((prev) =>
					prev ? { ...prev, photoUrl: result.assets[0].uri } : prev,
				);
			}
		} catch (error) {
			Alert.alert('Error', 'Failed to select photo');
		}
	};

	const handleLogout = async () => {
		Alert.alert('Confirm Logout', 'Are you sure you want to logout?', [
			{ text: 'Cancel', style: 'cancel' },
			{
				text: 'Logout',
				style: 'destructive',
				onPress: async () => {
					try {
						await AsyncStorage.removeItem('token');
						router.replace('/');
					} catch (error) {
						Alert.alert('Error', 'Failed to logout');
					}
				},
			},
		]);
	};

	const renderField = (
		icon: React.ReactNode,
		label: string,
		value: string,
		field: keyof UserModel,
		placeholder: string,
		keyboardType: 'default' | 'email-address' | 'numeric' = 'default',
	) => {
		const handleChange = (text: string) => {
			let formatted = text;
			if (field === 'phone') formatted = formatPhone(text);
			else if (field === 'birthdate') formatted = formatBirthdate(text);

			setUserData((prev) =>
				prev ? { ...prev, [field]: formatted } : prev,
			);
			setFormErrors((prev) => ({ ...prev, [field]: undefined }));
		};

		return (
			<View style={profileStyle.field}>
				<View style={profileStyle.fieldIcon}>{icon}</View>
				<View style={profileStyle.fieldContent}>
					<Text style={profileStyle.fieldLabel}>{label}</Text>
					{isEditing && field !== 'email' ? (
						<>
							<TextInput
								style={[
									profileStyle.input,
									formErrors[field] &&
										profileStyle.inputError,
								]}
								value={value}
								onChangeText={handleChange}
								placeholder={placeholder}
								keyboardType={keyboardType}
								autoCapitalize={
									field === 'fullName' ? 'words' : 'none'
								}
							/>
							{formErrors[field] && (
								<View style={profileStyle.errorContainer}>
									<AlertCircle size={16} color="#E50914" />
									<Text style={profileStyle.errorText}>
										{formErrors[field]}
									</Text>
								</View>
							)}
						</>
					) : (
						<Text style={profileStyle.fieldValue}>{value}</Text>
					)}
				</View>
			</View>
		);
	};

	if (!userData) {
		return (
			<View style={profileStyle.loadingContainer}>
				<ActivityIndicator size="large" color="#E50914" />
			</View>
		);
	}

	return (
		<ScrollView style={profileStyle.container}>
			<View style={profileStyle.header}>
				<Text style={profileStyle.headerTitle}>Profile</Text>
			</View>

			<View style={profileStyle.avatarContainer}>
				<TouchableOpacity
					style={profileStyle.avatarWrapper}
					onPress={handlePhotoSelect}
					disabled={!isEditing}
				>
					<Image
						source={{ uri: userData.photoUrl }}
						style={profileStyle.avatar}
					/>
					{isEditing && (
						<View style={profileStyle.cameraButton}>
							<Camera size={20} color="#fff" />
						</View>
					)}
				</TouchableOpacity>
				<Text style={profileStyle.name}>{userData.fullName}</Text>
				<Text style={profileStyle.memberSince}>
					Member since{' '}
					{format(new Date(userData.createdAt), 'MMMM yyyy')}
				</Text>
			</View>

			<View style={profileStyle.content}>
				{renderField(
					<User size={24} color="#666" />,
					'Full Name',
					userData.fullName,
					'fullName',
					'Enter your full name',
				)}
				{renderField(
					<Mail size={24} color="#666" />,
					'Email',
					userData.email,
					'email',
					'Enter your email',
					'email-address',
				)}
				{renderField(
					<Phone size={24} color="#666" />,
					'Phone',
					userData.phone,
					'phone',
					'(XXX) XXX-XXXX',
					'numeric',
				)}
				{renderField(
					<MapPin size={24} color="#666" />,
					'Address',
					userData.address,
					'address',
					'Enter your address',
				)}
				{renderField(
					<Calendar size={24} color="#666" />,
					'Birth Date',
					userData.birthdate,
					'birthdate',
					'YYYY-MM-DD',
					'numeric',
				)}

				{/* <TouchableOpacity
					style={[
						profileStyle.button,
						isEditing && profileStyle.saveButton,
						isLoading && profileStyle.disabledButton,
					]}
					onPress={() => {
						if (isEditing) {
							handleSave();
						} else {
							setIsEditing(true);
						}
					}}
					disabled={isLoading}
				>
					{isLoading ? (
						<ActivityIndicator color="#fff" />
					) : (
						<Text style={profileStyle.buttonText}>
							{isEditing ? 'Save Changes' : 'Edit Profile'}
						</Text>
					)}
				</TouchableOpacity> */}

				{isEditing && (
					<TouchableOpacity
						style={[profileStyle.button, profileStyle.cancelButton]}
						onPress={() => {
							setUserData(originalData);
							setIsEditing(false);
							setFormErrors({});
						}}
						disabled={isLoading}
					>
						<Text
							style={[
								profileStyle.buttonText,
								profileStyle.cancelButtonText,
							]}
						>
							Cancel
						</Text>
					</TouchableOpacity>
				)}

				<TouchableOpacity
					style={[profileStyle.button, profileStyle.logoutButton]}
					onPress={handleLogout}
					disabled={isLoading}
				>
					<LogOut size={20} color="#E50914" />
					<Text
						style={[
							profileStyle.buttonText,
							profileStyle.logoutButtonText,
						]}
					>
						Logout
					</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
}
