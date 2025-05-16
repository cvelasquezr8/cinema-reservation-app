import { Platform, StyleSheet } from 'react-native';

const confirmationStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	errorContainer: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
	},
	errorText: {
		fontSize: 18,
		color: '#E50914',
		marginBottom: 20,
		textAlign: 'center',
	},
	backButtonText: {
		marginLeft: 8,
		fontSize: 16,
		color: '#1a1a1a',
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
	content: {
		flex: 1,
	},
	contentContainer: {
		padding: 16,
		gap: 24,
	},
	movieSection: {
		flexDirection: 'row',
		backgroundColor: '#fff',
		borderRadius: 16,
		overflow: 'hidden',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
	moviePoster: {
		width: 100,
		height: 150,
	},
	movieInfo: {
		flex: 1,
		padding: 16,
	},
	movieTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#1a1a1a',
		marginBottom: 8,
	},
	formatBadge: {
		backgroundColor: '#E3F2FD',
		paddingHorizontal: 12,
		paddingVertical: 4,
		borderRadius: 12,
		alignSelf: 'flex-start',
		marginBottom: 12,
	},
	formatText: {
		color: '#1976D2',
		fontSize: 12,
		fontWeight: '600',
	},
	detailRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		marginBottom: 8,
	},
	detailText: {
		fontSize: 14,
		color: '#666',
	},
	card: {
		backgroundColor: '#fff',
		borderRadius: 16,
		padding: 16,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
	cardTitle: {
		fontSize: 18,
		fontWeight: '600',
		color: '#1a1a1a',
		marginBottom: 16,
	},
	seatsGrid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
	},
	seatBadge: {
		backgroundColor: '#E3F2FD',
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 8,
	},
	seatText: {
		color: '#1976D2',
		fontSize: 14,
		fontWeight: '600',
	},
	priceRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 12,
	},
	priceLabel: {
		fontSize: 14,
		color: '#666',
	},
	priceValue: {
		fontSize: 14,
		color: '#1a1a1a',
		fontWeight: '500',
	},
	divider: {
		height: 1,
		backgroundColor: '#f5f5f5',
		marginVertical: 12,
	},
	totalRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	totalLabel: {
		fontSize: 16,
		fontWeight: '600',
		color: '#1a1a1a',
	},
	totalAmount: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#E50914',
	},
	footer: {
		padding: 16,
		borderTopWidth: 1,
		borderTopColor: '#f5f5f5',
		backgroundColor: '#fff',
	},
	paymentButton: {
		backgroundColor: '#E50914',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 16,
		borderRadius: 12,
		gap: 8,
	},
	paymentButtonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: '600',
	},
});

export default confirmationStyles;
