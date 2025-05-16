import { Platform, StyleSheet } from 'react-native';

const orderDetailStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
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
		marginBottom: 12,
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
	formatBadge: {
		backgroundColor: '#E3F2FD',
		paddingHorizontal: 12,
		paddingVertical: 4,
		borderRadius: 12,
		alignSelf: 'flex-start',
		marginTop: 8,
	},
	formatText: {
		color: '#1976D2',
		fontSize: 12,
		fontWeight: '600',
	},
	card: {
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
	cardHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: '#f5f5f5',
		gap: 8,
	},
	cardTitle: {
		fontSize: 18,
		fontWeight: '600',
		color: '#1a1a1a',
	},
	cardContent: {
		padding: 16,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 12,
	},
	label: {
		fontSize: 14,
		color: '#666',
	},
	value: {
		fontSize: 14,
		color: '#1a1a1a',
		fontWeight: '500',
	},
	statusBadge: {
		backgroundColor: '#E8F5E9',
		paddingHorizontal: 12,
		paddingVertical: 4,
		borderRadius: 12,
	},
	statusText: {
		color: '#4CAF50',
		fontSize: 12,
		fontWeight: '600',
	},
	totalRow: {
		marginTop: 8,
		paddingTop: 16,
		borderTopWidth: 1,
		borderTopColor: '#f5f5f5',
	},
	totalLabel: {
		fontSize: 16,
		fontWeight: '600',
		color: '#1a1a1a',
	},
	totalAmount: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#E50914',
	},
	errorText: {
		fontSize: 16,
		color: '#666',
		textAlign: 'center',
		marginTop: 40,
	},
});

export default orderDetailStyles;
