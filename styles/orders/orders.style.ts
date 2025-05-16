import { Platform, StyleSheet } from 'react-native';

const ordersStyle = StyleSheet.create({
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
		gap: 16,
	},
	orderCard: {
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
	orderInfo: {
		flex: 1,
		padding: 16,
	},
	movieTitle: {
		fontSize: 18,
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
	footer: {
		marginTop: 12,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
	},
	seatsContainer: {
		flex: 1,
	},
	seatsLabel: {
		fontSize: 12,
		color: '#666',
		marginBottom: 2,
	},
	seatsText: {
		fontSize: 14,
		color: '#1a1a1a',
		fontWeight: '500',
	},
	totalAmount: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#E50914',
	},
	noOrdersContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
	},
	noOrdersText: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#666',
		marginBottom: 8,
	},
	noOrdersSubtext: {
		fontSize: 16,
		color: '#999',
		textAlign: 'center',
	},
});

export default ordersStyle;
