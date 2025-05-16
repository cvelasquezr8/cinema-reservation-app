import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { usePayment } from 'context/PaymentContext';

export default function CVVInput() {
	const { cvv, setCvv, errors, setIsFlipped } = usePayment();

	const handleChangeText = (text: string) => {
		// Remove all non-numeric characters
		const numericValue = text.replace(/\D/g, '');

		// Only allow max 4 digits for CVV
		if (numericValue.length <= 4) {
			setCvv(numericValue);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.label}>CVV</Text>
			<View
				style={[
					styles.inputContainer,
					errors.cvv ? styles.inputError : null,
				]}
			>
				<TextInput
					style={styles.input}
					placeholder="123"
					placeholderTextColor="#94A3B8"
					keyboardType="number-pad"
					maxLength={4}
					value={cvv}
					onChangeText={handleChangeText}
					onFocus={() => setIsFlipped(true)}
					onBlur={() => setIsFlipped(false)}
					secureTextEntry
				/>
			</View>
			{errors.cvv && <Text style={styles.errorText}>{errors.cvv}</Text>}
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
