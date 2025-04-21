import React, { useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Platform,
	Alert,
	Dimensions,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SEAT_SIZE = 30;
const SEAT_MARGIN = 4;
const SEATS_PER_ROW = 8;

// Mock showtimes data
const SHOWTIMES = [
	{ id: 1, time: '10:30 AM', occupiedSeats: ['A1', 'A2', 'B5'] },
	{ id: 2, time: '1:00 PM', occupiedSeats: ['C3', 'C4', 'D1', 'D2'] },
	{ id: 3, time: '4:30 PM', occupiedSeats: ['B3', 'B4', 'E5', 'E6'] },
	{ id: 4, time: '7:00 PM', occupiedSeats: ['A4', 'A5', 'C1', 'C2'] },
	{ id: 5, time: '9:30 PM', occupiedSeats: ['D4', 'D5', 'E1', 'E2'] },
];

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

export default function SeatsScreen() {
	const { id } = useLocalSearchParams();
	const [selectedShowtime, setSelectedShowtime] = useState(SHOWTIMES[0]);
	const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

	const handleSeatPress = (seatId: string) => {
		if (selectedShowtime.occupiedSeats.includes(seatId)) {
			return;
		}

		setSelectedSeats((prev) => {
			if (prev.includes(seatId)) {
				return prev.filter((seat) => seat !== seatId);
			}
			return [...prev, seatId];
		});
	};

	const handleConfirm = () => {
		if (selectedSeats.length === 0) {
			Alert.alert(
				'No Seats Selected',
				'Please select at least one seat to continue.',
			);
			return;
		}

		router.push({
			pathname: `/movies/${id}/confirmation`,
			params: {
				seats: selectedSeats.join(','),
				showtime: selectedShowtime.time,
			},
		});
	};

	const renderSeat = (row: string, seatNumber: number) => {
		const seatId = `${row}${seatNumber}`;
		const isSelected = selectedSeats.includes(seatId);
		const isOccupied = selectedShowtime.occupiedSeats.includes(seatId);

		return (
			<TouchableOpacity
				key={seatId}
				style={[
					styles.seat,
					isSelected && styles.seatSelected,
					isOccupied && styles.seatOccupied,
				]}
				onPress={() => handleSeatPress(seatId)}
				disabled={isOccupied}
			>
				<Text
					style={[
						styles.seatText,
						isSelected && styles.seatTextSelected,
						isOccupied && styles.seatTextOccupied,
					]}
				>
					{seatNumber}
				</Text>
			</TouchableOpacity>
		);
	};

	const renderRow = (row: string) => {
		return (
			<View key={row} style={styles.row}>
				<Text style={styles.rowLabel}>{row}</Text>
				<View style={styles.seats}>
					{Array.from({ length: SEATS_PER_ROW }, (_, i) =>
						renderSeat(row, i + 1),
					)}
				</View>
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity
					style={styles.backButton}
					onPress={() => router.back()}
				>
					<ArrowLeft size={24} color="#1a1a1a" />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>Select Seats</Text>
			</View>

			<View style={styles.showtimesContainer}>
				<Text style={styles.sectionTitle}>Select Showtime</Text>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.showtimesList}
				>
					{SHOWTIMES.map((showtime) => (
						<TouchableOpacity
							key={showtime.id}
							style={[
								styles.showtimeButton,
								selectedShowtime.id === showtime.id &&
									styles.showtimeButtonActive,
							]}
							onPress={() => setSelectedShowtime(showtime)}
						>
							<Text
								style={[
									styles.showtimeText,
									selectedShowtime.id === showtime.id &&
										styles.showtimeTextActive,
								]}
							>
								{showtime.time}
							</Text>
						</TouchableOpacity>
					))}
				</ScrollView>
			</View>

			<View style={styles.legendContainer}>
				<View style={styles.legendItem}>
					<View style={[styles.legendSeat, styles.seatAvailable]} />
					<Text style={styles.legendText}>Available</Text>
				</View>
				<View style={styles.legendItem}>
					<View style={[styles.legendSeat, styles.seatSelected]} />
					<Text style={styles.legendText}>Selected</Text>
				</View>
				<View style={styles.legendItem}>
					<View style={[styles.legendSeat, styles.seatOccupied]} />
					<Text style={styles.legendText}>Occupied</Text>
				</View>
			</View>

			<View style={styles.screenContainer}>
				<View style={styles.screen} />
				<Text style={styles.screenText}>SCREEN</Text>
			</View>

			<ScrollView
				style={styles.seatsContainer}
				contentContainerStyle={styles.seatsContent}
				showsVerticalScrollIndicator={false}
			>
				{ROWS.map((row) => renderRow(row))}
			</ScrollView>

			<View style={styles.footer}>
				<View style={styles.selectedInfo}>
					<Text style={styles.selectedCount}>
						Selected Seats: {selectedSeats.length}
					</Text>
					<Text style={styles.totalAmount}>
						Total: ${(selectedSeats.length * 15).toFixed(2)}
					</Text>
				</View>
				<TouchableOpacity
					style={[
						styles.confirmButton,
						selectedSeats.length === 0 &&
							styles.confirmButtonDisabled,
					]}
					onPress={handleConfirm}
					disabled={selectedSeats.length === 0}
				>
					<Text style={styles.confirmButtonText}>
						Confirm Selection
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
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
		fontSize: 12,
		color: '#666',
	},
	screenContainer: {
		alignItems: 'center',
		paddingVertical: 20,
	},
	screen: {
		width: SCREEN_WIDTH * 0.7,
		height: 8,
		backgroundColor: '#ddd',
		borderRadius: 4,
		transform: [{ perspective: 100 }, { rotateX: '-30deg' }],
	},
	screenText: {
		marginTop: 8,
		fontSize: 12,
		color: '#666',
	},
	seatsContainer: {
		flex: 1,
	},
	seatsContent: {
		padding: 20,
		gap: 16,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 16,
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
		gap: SEAT_MARGIN,
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
		backgroundColor: '#E50914',
	},
	seatOccupied: {
		backgroundColor: '#ddd',
	},
	seatText: {
		fontSize: 12,
		color: '#666',
	},
	seatTextSelected: {
		color: '#fff',
	},
	seatTextOccupied: {
		color: '#999',
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
