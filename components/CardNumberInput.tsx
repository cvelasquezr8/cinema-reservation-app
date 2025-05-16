import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { usePayment } from 'context/PaymentContext';
import { formatCardNumber } from 'utils/cardValidation';

export default function CardNumberInput() {
	const { cardNumber, setCardNumber, errors, cardType } = usePayment();

	const handleChangeText = (text: string) => {
		// Remove all non-numeric characters
		const numericValue = text.replace(/\D/g, '');

		// Format the card number and update state
		const formattedValue = formatCardNumber(numericValue);
		setCardNumber(numericValue);
	};

	const getCardTypeLabel = () => {
		if (cardType) {
			const typeLabels: Record<string, string> = {
				visa: 'Visa',
				mastercard: 'MasterCard',
				amex: 'American Express',
				discover: 'Discover',
				default: 'Credit Card',
			};
			return typeLabels[cardType] || typeLabels.default;
		}
		return '';
	};

	return (
		<View style={styles.container}>
			<Text style={styles.label}>Card Number</Text>
			<View
				style={[
					styles.inputContainer,
					errors.cardNumber ? styles.inputError : null,
				]}
			>
				<TextInput
					style={styles.input}
					placeholder="1234 5678 9012 3456"
					placeholderTextColor="#94A3B8"
					keyboardType="number-pad"
					maxLength={19} // Allow for 16 digits + 3 spaces
					value={formatCardNumber(cardNumber)}
					onChangeText={handleChangeText}
				/>
				{cardType && (
					<Text style={styles.cardTypeLabel}>
						{getCardTypeLabel()}
					</Text>
				)}
			</View>
			{errors.cardNumber && (
				<Text style={styles.errorText}>{errors.cardNumber}</Text>
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
		flexDirection: 'row',
		borderWidth: 1,
		borderColor: '#CBD5E1',
		borderRadius: 8,
		backgroundColor: '#FFFFFF',
		paddingHorizontal: 12,
		height: 50,
		alignItems: 'center',
	},
	inputError: {
		borderColor: '#EF4444',
	},
	input: {
		flex: 1,
		color: '#1E293B',
		fontSize: 16,
		height: 50,
	},
	cardTypeLabel: {
		fontSize: 12,
		color: '#64748B',
		fontWeight: '500',
	},
	errorText: {
		fontSize: 12,
		color: '#EF4444',
		marginTop: 4,
	},
});
