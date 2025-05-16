import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { usePayment } from 'context/PaymentContext';
import { formatExpiry } from 'utils/cardValidation';

export default function ExpiryInput() {
	const { expiry, setExpiry, errors } = usePayment();

	const handleChangeText = (text: string) => {
		// Remove all non-numeric characters
		const numericValue = text.replace(/\D/g, '');

		// Format the expiry date and update state
		const formattedValue = formatExpiry(numericValue);
		setExpiry(formattedValue);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.label}>Expiry Date</Text>
			<View
				style={[
					styles.inputContainer,
					errors.expiry ? styles.inputError : null,
				]}
			>
				<TextInput
					style={styles.input}
					placeholder="MM/YY"
					placeholderTextColor="#94A3B8"
					keyboardType="number-pad"
					maxLength={5} // MM/YY format
					value={expiry}
					onChangeText={handleChangeText}
				/>
			</View>
			{errors.expiry && (
				<Text style={styles.errorText}>{errors.expiry}</Text>
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
