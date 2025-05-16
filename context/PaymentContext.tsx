import { router } from 'expo-router';
import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from 'react';
import { createPaymentIntent } from 'services/paymentService';
import { useMovieStore } from 'store/movieStore';
import {
	validateCardNumber,
	validateExpiry,
	validateCVV,
	validateCardName,
	detectCardType,
} from 'utils/cardValidation';

type ErrorState = {
	cardNumber: string | null;
	expiry: string | null;
	cvv: string | null;
	cardName: string | null;
};

type PaymentContextType = {
	cardNumber: string;
	setCardNumber: (value: string) => void;
	expiry: string;
	setExpiry: (value: string) => void;
	cvv: string;
	setCvv: (value: string) => void;
	cardName: string;
	setCardName: (value: string) => void;
	errors: ErrorState;
	cardType: string | null;
	isFlipped: boolean;
	setIsFlipped: (value: boolean) => void;
	handleSubmit: () => Promise<void>;
};

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export function PaymentProvider({ children }: { children: ReactNode }) {
	const [cardNumber, setCardNumber] = useState('');
	const [expiry, setExpiry] = useState('');
	const [cvv, setCvv] = useState('');
	const [cardName, setCardName] = useState('');
	const [cardType, setCardType] = useState<string | null>(null);
	const [isFlipped, setIsFlipped] = useState(false);

	const [errors, setErrors] = useState<ErrorState>({
		cardNumber: null,
		expiry: null,
		cvv: null,
		cardName: null,
	});

	// Detect card type whenever card number changes
	useEffect(() => {
		if (cardNumber.length >= 4) {
			const type = detectCardType(cardNumber);
			setCardType(type);
		} else {
			setCardType(null);
		}
	}, [cardNumber]);

	// Validate card number
	useEffect(() => {
		if (cardNumber.length > 0) {
			const error = validateCardNumber(cardNumber);
			setErrors((prev) => ({ ...prev, cardNumber: error }));
		} else {
			setErrors((prev) => ({ ...prev, cardNumber: null }));
		}
	}, [cardNumber]);

	// Validate expiry
	useEffect(() => {
		if (expiry.length > 0) {
			const error = validateExpiry(expiry);
			setErrors((prev) => ({ ...prev, expiry: error }));
		} else {
			setErrors((prev) => ({ ...prev, expiry: null }));
		}
	}, [expiry]);

	// Validate CVV
	useEffect(() => {
		if (cvv.length > 0) {
			const error = validateCVV(cvv, cardType);
			setErrors((prev) => ({ ...prev, cvv: error }));
		} else {
			setErrors((prev) => ({ ...prev, cvv: null }));
		}
	}, [cvv, cardType]);

	// Validate card name
	useEffect(() => {
		if (cardName.length > 0) {
			const error = validateCardName(cardName);
			setErrors((prev) => ({ ...prev, cardName: error }));
		} else {
			setErrors((prev) => ({ ...prev, cardName: null }));
		}
	}, [cardName]);

	const validateAll = (): boolean => {
		const cardNumberError = validateCardNumber(cardNumber);
		const expiryError = validateExpiry(expiry);
		const cvvError = validateCVV(cvv, cardType);
		const nameError = validateCardName(cardName);

		setErrors({
			cardNumber: cardNumberError,
			expiry: expiryError,
			cvv: cvvError,
			cardName: nameError,
		});

		return !cardNumberError && !expiryError && !cvvError && !nameError;
	};

	const handleSubmit = async (): Promise<void> => {
		if (!validateAll()) {
			throw new Error('Form validation failed');
		}

		const { selectedMovie } = useMovieStore.getState();
		const response = await createPaymentIntent(cardType as string);
		router.push({
			pathname: '/movies/[id]/payment-success',
			params: {
				id: selectedMovie?.id || '',
				transactionID: response.transactionID,
				type: response.type,
				date: response.date,
			},
		});
	};

	const value = {
		cardNumber,
		setCardNumber,
		expiry,
		setExpiry,
		cvv,
		setCvv,
		cardName,
		setCardName,
		errors,
		cardType,
		isFlipped,
		setIsFlipped,
		handleSubmit,
	};

	return (
		<PaymentContext.Provider value={value}>
			{children}
		</PaymentContext.Provider>
	);
}

export const usePayment = (): PaymentContextType => {
	const context = useContext(PaymentContext);
	if (context === undefined) {
		throw new Error('usePayment must be used within a PaymentProvider');
	}
	return context;
};
