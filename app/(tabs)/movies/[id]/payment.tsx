import React from 'react';
import {
	View,
	StyleSheet,
	ScrollView,
	SafeAreaView,
	TouchableOpacity,
	Text,
	Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import CreditCardForm from 'components/CreditCardForm';
import { PaymentProvider } from 'context/PaymentContext';

export default function PaymentScreen() {
	return (
		<PaymentProvider>
			<SafeAreaView style={styles.safeArea}>
				<StatusBar style="dark" />
				<View style={styles.header}>
					<TouchableOpacity
						style={styles.backButton}
						onPress={() => router.back()}
					>
						<ArrowLeft size={24} color="#1a1a1a" />
					</TouchableOpacity>
					<Text style={styles.headerTitle}>Payment Details</Text>
				</View>
				<ScrollView
					style={styles.container}
					contentContainerStyle={styles.scrollContent}
					keyboardShouldPersistTaps="handled"
				>
					<CreditCardForm />
				</ScrollView>
			</SafeAreaView>
		</PaymentProvider>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: '#F5F8FA',
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 20,
		paddingTop: Platform.OS === 'ios' ? 60 : 40,
		backgroundColor: '#fff',
		borderBottomWidth: 1,
		borderBottomColor: '#f5f5f5',
	},
	backButton: {
		marginRight: 16,
		flexDirection: 'row',
		alignItems: 'center',
	},
	headerTitle: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#1a1a1a',
	},
	container: {
		flex: 1,
	},
	scrollContent: {
		flexGrow: 1,
		paddingHorizontal: 16,
		paddingVertical: 24,
	},
});
