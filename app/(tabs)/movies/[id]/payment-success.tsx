import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Platform,
	Image,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import {
	CircleCheck as CheckCircle2,
	Chrome as Home,
} from 'lucide-react-native';

export default function PaymentSuccessScreen() {
	const { transactionID, type, date } = useLocalSearchParams<{
		id: string;
		transactionID: string;
		type: string;
		date: string;
	}>();

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<View style={styles.iconContainer}>
					<CheckCircle2 size={80} color="#4CAF50" />
				</View>

				<Text style={styles.title}>Payment Successful!</Text>
				<Text style={styles.subtitle}>
					Your tickets have been booked successfully
				</Text>

				<View style={styles.card}>
					<View style={styles.cardHeader}>
						<Text style={styles.cardTitle}>Payment Details</Text>
					</View>

					<View style={styles.cardContent}>
						<View style={styles.row}>
							<Text style={styles.label}>Transaction ID</Text>
							<Text style={styles.value}>
								{transactionID.split('-')[0]}
							</Text>
						</View>

						<View style={styles.row}>
							<Text style={styles.label}>Payment Method</Text>
							<View style={styles.paymentMethod}>
								<Image
									source={{
										uri: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg',
									}}
									style={styles.cardLogo}
									resizeMode="contain"
								/>
								<Text style={styles.value}>{type}</Text>
							</View>
						</View>

						<View style={styles.row}>
							<Text style={styles.label}>Date</Text>
							<Text style={styles.value}>
								{new Date(date).toLocaleDateString()}
							</Text>
						</View>
					</View>
				</View>

				<TouchableOpacity
					style={styles.button}
					onPress={() => router.replace('/(tabs)/movies')}
				>
					<Home size={24} color="#fff" />
					<Text style={styles.buttonText}>Back to Movies</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingTop: Platform.OS === 'ios' ? 60 : 40,
	},
	content: {
		flex: 1,
		padding: 20,
		alignItems: 'center',
	},
	iconContainer: {
		width: 120,
		height: 120,
		borderRadius: 60,
		backgroundColor: '#E8F5E9',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 24,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#1a1a1a',
		marginBottom: 8,
		textAlign: 'center',
	},
	subtitle: {
		fontSize: 16,
		color: '#666',
		marginBottom: 32,
		textAlign: 'center',
	},
	card: {
		backgroundColor: '#f8f8f8',
		borderRadius: 16,
		width: '100%',
		marginBottom: 32,
		overflow: 'hidden',
	},
	cardHeader: {
		backgroundColor: '#E50914',
		padding: 16,
	},
	cardTitle: {
		color: '#fff',
		fontSize: 18,
		fontWeight: '600',
	},
	cardContent: {
		padding: 20,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 16,
	},
	label: {
		fontSize: 14,
		color: '#666',
	},
	value: {
		fontSize: 14,
		color: '#1a1a1a',
		fontWeight: '500',
	},
	paymentMethod: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	cardLogo: {
		width: 40,
		height: 25,
	},
	button: {
		backgroundColor: '#E50914',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 16,
		borderRadius: 12,
		width: '100%',
		gap: 8,
	},
	buttonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: '600',
	},
});
