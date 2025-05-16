import React, { useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Keyboard,
} from 'react-native';
import { CreditCard } from 'lucide-react-native';
import CardPreview from './CardPreview';
import CardNumberInput from './CardNumberInput';
import ExpiryInput from './ExpiryInput';
import CVVInput from './CVVInput';
import NameInput from './NameInput';
import { usePayment } from 'context/PaymentContext';

export default function CreditCardForm() {
	const { cardNumber, cardName, expiry, cvv, errors, handleSubmit } =
		usePayment();

	const [isSubmitting, setIsSubmitting] = useState(false);

	const onSubmit = async () => {
		Keyboard.dismiss();
		setIsSubmitting(true);

		try {
			await handleSubmit();
			setIsSubmitting(false);
		} catch (error) {
			setIsSubmitting(false);
		}
	};

	const hasErrors = Object.values(errors).some((error) => error);
	const isFormComplete =
		cardNumber.length >= 16 &&
		expiry.length === 5 &&
		cvv.length >= 3 &&
		cardName.length > 0;
	const isButtonDisabled = hasErrors || !isFormComplete || isSubmitting;

	return (
		<View style={styles.container}>
			<CardPreview />

			<View style={styles.form}>
				<CardNumberInput />

				<View style={styles.row}>
					<View style={styles.halfInput}>
						<ExpiryInput />
					</View>
					<View style={styles.halfInput}>
						<CVVInput />
					</View>
				</View>

				<NameInput />

				<TouchableOpacity
					style={[
						styles.submitButton,
						isButtonDisabled && styles.submitButtonDisabled,
					]}
					onPress={onSubmit}
					disabled={isButtonDisabled}
					activeOpacity={0.7}
				>
					<CreditCard size={24} color="#fff" />
					<Text
						style={[
							styles.submitButtonText,
							isButtonDisabled && styles.submitButtonTextDisabled,
						]}
					>
						{isSubmitting ? 'Processing...' : 'Pay Now'}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	form: {
		backgroundColor: '#FFFFFF',
		borderRadius: 12,
		padding: 24,
		marginTop: 24,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 10,
		elevation: 3,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	halfInput: {
		width: '48%',
	},
	submitButton: {
		backgroundColor: '#E50914',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 16,
		borderRadius: 12,
		gap: 8,
		marginTop: 24,
	},
	submitButtonDisabled: {
		backgroundColor: '#ccc',
	},
	submitButtonText: {
		color: '#FFFFFF',
		fontSize: 18,
		fontWeight: '600',
	},
	submitButtonTextDisabled: {
		color: '#FFFF',
	},
});
