import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { usePayment } from 'context/PaymentContext';

export default function NameInput() {
	const { cardName, setCardName, errors } = usePayment();

	return (
		<View style={styles.container}>
			<Text style={styles.label}>Cardholder Name</Text>
			<View
				style={[
					styles.inputContainer,
					errors.cardName ? styles.inputError : null,
				]}
			>
				<TextInput
					style={styles.input}
					placeholder="John Doe"
					placeholderTextColor="#94A3B8"
					value={cardName}
					onChangeText={setCardName}
					autoCapitalize="words"
				/>
			</View>
			{errors.cardName && (
				<Text style={styles.errorText}>{errors.cardName}</Text>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 16,
	},
	label: {
		fontSize: 14,
		fontWeight: '500',
		marginBottom: 8,
		color: '#475569',
	},
	inputContainer: {
		borderWidth: 1,
		borderColor: '#CBD5E1',
		borderRadius: 8,
		backgroundColor: '#FFFFFF',
		paddingHorizontal: 12,
		height: 50,
		justifyContent: 'center',
	},
	inputError: {
		borderColor: '#EF4444',
	},
	input: {
		color: '#1E293B',
		fontSize: 16,
	},
	errorText: {
		fontSize: 12,
		color: '#EF4444',
		marginTop: 4,
	},
});
