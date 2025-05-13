import { Platform, StyleSheet } from 'react-native';
const SEAT_MARGIN = 4;
const SEAT_SIZE = 30;
const seatScreenStyle = StyleSheet.create({
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
	showtimesContainer: {
		padding: 20,
		borderBottomWidth: 1,
		borderBottomColor: '#f5f5f5',
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: '600',
		marginBottom: 16,
		color: '#1a1a1a',
	},
	showtimesList: {
		gap: 8,
	},
	showtimeButton: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 20,
		backgroundColor: '#f5f5f5',
		marginRight: 8,
	},
	showtimeButtonActive: {
		backgroundColor: '#E50914',
	},
	showtimeText: {
		fontSize: 14,
		color: '#666',
	},
	showtimeTextActive: {
		color: '#fff',
		fontWeight: '600',
	},
	legendContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		paddingVertical: 16,
		gap: 20,
		borderBottomWidth: 1,
		borderBottomColor: '#f5f5f5',
	},
	legendItem: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	legendSeat: {
		width: 20,
		height: 20,
		borderRadius: 4,
	},
	legendText: {
		fontSize: 15,
		color: '#666',
	},
	screenContainer: {
		alignItems: 'center',
		paddingVertical: 30,
	},
	screen: {
		width: 100,
		height: 12,
		backgroundColor: '#ddd',
		borderRadius: 4,
		transform: [{ perspective: 100 }, { rotateX: '-30deg' }],
	},
	screenText: {
		marginTop: 8,
		fontSize: 15,
		color: '#666',
	},
	seatsContainer: {
		flex: 1,
	},
	seatsContent: {
		padding: 20,
		gap: 20,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 20,
	},
	rowLabel: {
		fontSize: 14,
		fontWeight: '600',
		color: '#1a1a1a',
		width: 20,
		textAlign: 'center',
	},
	seats: {
		flexDirection: 'row',
		gap: 15,
	},
	seat: {
		width: SEAT_SIZE,
		height: SEAT_SIZE,
		borderRadius: 4,
		backgroundColor: '#f5f5f5',
		justifyContent: 'center',
		alignItems: 'center',
	},
	seatAvailable: {
		backgroundColor: '#f5f5f5',
	},
	seatSelected: {
		backgroundColor: '#3BB143',
	},
	seatOccupied: {
		backgroundColor: '#E50914',
	},
	seatText: {
		fontSize: 12,
		color: '#000000',
	},
	seatTextSelected: {
		color: '#fff',
	},
	seatTextOccupied: {
		color: '#f5f5f5',
	},
	footer: {
		padding: 20,
		borderTopWidth: 1,
		borderTopColor: '#f5f5f5',
		backgroundColor: '#fff',
	},
	selectedInfo: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 16,
	},
	selectedCount: {
		fontSize: 14,
		color: '#666',
	},
	totalAmount: {
		fontSize: 16,
		fontWeight: '600',
		color: '#1a1a1a',
	},
	confirmButton: {
		backgroundColor: '#E50914',
		padding: 16,
		borderRadius: 12,
		alignItems: 'center',
	},
	confirmButtonDisabled: {
		backgroundColor: '#f5f5f5',
	},
	confirmButtonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '600',
	},
});

export default seatScreenStyle;
