// Card validation utilities

/**
 * Format card number with spaces every 4 digits
 */
export function formatCardNumber(value: string): string {
	if (!value) return '';

	const rawValue = value.replace(/\s+/g, '');
	const parts = [];

	for (let i = 0; i < rawValue.length; i += 4) {
		parts.push(rawValue.substring(i, i + 4));
	}

	return parts.join(' ');
}

/**
 * Format card number for display on card preview
 * (keeping first and last 4 digits, masking the rest)
 */
export function formatCardNumberForDisplay(value: string): string {
	if (!value || value.length < 4) return formatCardNumber(value);

	if (value.length <= 8) {
		return formatCardNumber(value);
	}

	// For cards longer than 8 digits, mask middle digits
	const firstFour = value.substring(0, 4);
	const lastFour = value.substring(value.length - 4);
	const middleMask = '•••• ••••'.substring(0, value.length - 8);

	return `${firstFour} ${middleMask} ${lastFour}`;
}

/**
 * Format expiry date with a slash after the month
 */
export function formatExpiry(value: string): string {
	if (!value) return '';

	const cleanValue = value.replace(/\D/g, '');

	if (cleanValue.length <= 2) {
		return cleanValue;
	}

	// Format as MM/YY
	return `${cleanValue.substring(0, 2)}/${cleanValue.substring(2, 4)}`;
}

/**
 * Validate card number using Luhn algorithm
 */
export function validateCardNumber(cardNumber: string): string | null {
	const numericValue = cardNumber.replace(/\D/g, '');

	if (!numericValue) {
		return 'Card number is required';
	}

	if (numericValue.length < 13 || numericValue.length > 19) {
		return 'Card number must be between 13 and 19 digits';
	}

	// Luhn algorithm validation
	let sum = 0;
	let shouldDouble = false;

	// Loop through values starting from the rightmost digit
	for (let i = numericValue.length - 1; i >= 0; i--) {
		let digit = parseInt(numericValue.charAt(i));

		if (shouldDouble) {
			digit *= 2;
			if (digit > 9) {
				digit -= 9;
			}
		}

		sum += digit;
		shouldDouble = !shouldDouble;
	}

	// If the sum is divisible by 10, the card number is valid
	if (sum % 10 !== 0) {
		return 'Invalid card number';
	}

	return null;
}

/**
 * Validate expiry date
 */
export function validateExpiry(expiry: string): string | null {
	if (!expiry) {
		return 'Expiry date is required';
	}

	if (expiry.length < 5) {
		return 'Please enter a valid expiry date';
	}

	const [monthStr, yearStr] = expiry.split('/');
	const month = parseInt(monthStr, 10);
	const year = parseInt(yearStr, 10) + 2000; // Convert YY to 20YY

	if (isNaN(month) || isNaN(year)) {
		return 'Please enter a valid expiry date';
	}

	if (month < 1 || month > 12) {
		return 'Invalid month';
	}

	const now = new Date();
	const currentYear = now.getFullYear();
	const currentMonth = now.getMonth() + 1; // JS months are 0-indexed

	if (year < currentYear || (year === currentYear && month < currentMonth)) {
		return 'Card has expired';
	}

	if (year > currentYear + 20) {
		return 'Expiry date too far in the future';
	}

	return null;
}

/**
 * Validate CVV code
 */
export function validateCVV(
	cvv: string,
	cardType: string | null,
): string | null {
	if (!cvv) {
		return 'Security code is required';
	}

	const requiredLength = cardType === 'amex' ? 4 : 3;

	if (cvv.length !== requiredLength) {
		return `Security code must be ${requiredLength} digits`;
	}

	if (!/^\d+$/.test(cvv)) {
		return 'Security code must contain only digits';
	}

	return null;
}

/**
 * Validate cardholder name
 */
export function validateCardName(name: string): string | null {
	if (!name.trim()) {
		return 'Cardholder name is required';
	}

	if (name.trim().length < 3) {
		return 'Cardholder name is too short';
	}

	if (!/^[A-Za-z\s]+$/.test(name)) {
		return 'Cardholder name can only contain letters and spaces';
	}

	return null;
}

/**
 * Detect card type based on the card number
 */
export function detectCardType(cardNumber: string): string | null {
	const numericValue = cardNumber.replace(/\D/g, '');

	// Visa
	if (/^4/.test(numericValue)) {
		return 'visa';
	}

	// Mastercard
	if (/^5[1-5]/.test(numericValue)) {
		return 'mastercard';
	}

	// American Express
	if (/^3[47]/.test(numericValue)) {
		return 'amex';
	}

	// Discover
	if (/^6(?:011|5)/.test(numericValue)) {
		return 'discover';
	}

	return 'default';
}
