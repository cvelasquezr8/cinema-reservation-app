import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';
import { usePayment } from 'context/PaymentContext';
import { formatCardNumberForDisplay } from 'utils/cardValidation';

// Card brand logos
const CARD_LOGOS = {
	visa: 'https://images.pexels.com/photos/164501/pexels-photo-164501.jpeg?auto=compress&cs=tinysrgb&w=36&h=36&fit=crop',
	mastercard:
		'https://images.pexels.com/photos/164501/pexels-photo-164501.jpeg?auto=compress&cs=tinysrgb&w=36&h=36&fit=crop',
	amex: 'https://images.pexels.com/photos/164501/pexels-photo-164501.jpeg?auto=compress&cs=tinysrgb&w=36&h=36&fit=crop',
	discover:
		'https://images.pexels.com/photos/164501/pexels-photo-164501.jpeg?auto=compress&cs=tinysrgb&w=36&h=36&fit=crop',
	default:
		'https://images.pexels.com/photos/164501/pexels-photo-164501.jpeg?auto=compress&cs=tinysrgb&w=36&h=36&fit=crop',
};

export default function CardPreview() {
	const { cardNumber, cardName, expiry, cvv, cardType, isFlipped } =
		usePayment();
	const flipAnimation = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.spring(flipAnimation, {
			toValue: isFlipped ? 180 : 0,
			friction: 8,
			tension: 10,
			useNativeDriver: true,
		}).start();
	}, [isFlipped, flipAnimation]);

	const frontInterpolate = flipAnimation.interpolate({
		inputRange: [0, 180],
		outputRange: ['0deg', '180deg'],
	});

	const backInterpolate = flipAnimation.interpolate({
		inputRange: [0, 180],
		outputRange: ['180deg', '360deg'],
	});

	const frontAnimatedStyle = {
		transform: [{ rotateY: frontInterpolate }],
	};

	const backAnimatedStyle = {
		transform: [{ rotateY: backInterpolate }],
	};

	// Display formatted card number or placeholder
	const displayNumber = cardNumber
		? formatCardNumberForDisplay(cardNumber)
		: '•••• •••• •••• ••••';

	// Display expiry or placeholder
	const displayExpiry = expiry || 'MM/YY';

	// Display cardholder name or placeholder
	const displayName = cardName || 'CARDHOLDER NAME';

	// Get card logo based on detected type
	const cardLogo = cardType ? CARD_LOGOS[cardType] : CARD_LOGOS.default;

	return (
		<View style={styles.container}>
			{/* Front of card */}
			<Animated.View
				style={[styles.card, styles.cardFront, frontAnimatedStyle]}
			>
				<View style={styles.cardHeader}>
					<View style={styles.chip} />
					{cardType && (
						<Image
							source={{ uri: cardLogo }}
							style={styles.cardLogo}
						/>
					)}
				</View>

				<Text style={styles.cardNumber}>{displayNumber}</Text>

				<View style={styles.cardFooter}>
					<View style={styles.cardFooterCol}>
						<Text style={styles.cardLabel}>CARD HOLDER</Text>
						<Text style={styles.cardValue}>{displayName}</Text>
					</View>

					<View style={styles.cardFooterCol}>
						<Text style={styles.cardLabel}>EXPIRES</Text>
						<Text style={styles.cardValue}>{displayExpiry}</Text>
					</View>
				</View>
			</Animated.View>

			{/* Back of card */}
			<Animated.View
				style={[styles.card, styles.cardBack, backAnimatedStyle]}
			>
				<View style={styles.cardStripe} />
				<View style={styles.cardCvvContainer}>
					<Text style={styles.cardCvvLabel}>CVV</Text>
					<View style={styles.cardCvvBand}>
						<Text style={styles.cardCvvText}>
							{cvv ? '•'.repeat(cvv.length) : ''}
						</Text>
					</View>
				</View>
			</Animated.View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: 200,
		position: 'relative',
		marginBottom: 16,
	},
	card: {
		width: '100%',
		height: 200,
		borderRadius: 16,
		padding: 24,
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backfaceVisibility: 'hidden',
	},
	cardFront: {
		backgroundColor: '#334155',
		justifyContent: 'space-between',
	},
	cardBack: {
		backgroundColor: '#334155',
		justifyContent: 'flex-start',
	},
	cardHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	chip: {
		width: 40,
		height: 30,
		backgroundColor: '#FFCA80',
		borderRadius: 6,
		opacity: 0.8,
	},
	cardLogo: {
		width: 60,
		height: 40,
		resizeMode: 'contain',
	},
	cardNumber: {
		fontSize: 20,
		color: '#FFFFFF',
		letterSpacing: 2,
		marginVertical: 16,
		fontWeight: '500',
	},
	cardFooter: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	cardFooterCol: {
		flexDirection: 'column',
	},
	cardLabel: {
		fontSize: 10,
		color: '#CBD5E1',
		marginBottom: 4,
	},
	cardValue: {
		fontSize: 14,
		color: '#FFFFFF',
		fontWeight: '500',
		textTransform: 'uppercase',
	},
	cardStripe: {
		width: '100%',
		height: 40,
		backgroundColor: '#0F172A',
		marginTop: 20,
	},
	cardCvvContainer: {
		marginTop: 24,
		paddingHorizontal: 24,
	},
	cardCvvLabel: {
		fontSize: 12,
		color: '#CBD5E1',
		marginBottom: 8,
	},
	cardCvvBand: {
		backgroundColor: '#FFFFFF',
		height: 40,
		borderRadius: 4,
		justifyContent: 'center',
		paddingHorizontal: 12,
	},
	cardCvvText: {
		fontSize: 16,
		letterSpacing: 4,
	},
});
