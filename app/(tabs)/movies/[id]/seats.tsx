import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

import seatScreenStyle from 'styles/movies/seats-screen.style';
import { useMovieStore } from 'store/movieStore';

const SEATS_PER_ROW = 8;

// Mock showtimes data
const SHOWTIMES = [
	{ id: 1, time: '10:30 AM', occupiedSeats: ['A1', 'A2', 'B5'] },
	{ id: 2, time: '1:00 PM', occupiedSeats: ['C3', 'C4', 'D1', 'D2'] },
	{ id: 3, time: '4:30 PM', occupiedSeats: ['B3', 'B4', 'E5', 'E6'] },
	{ id: 4, time: '7:00 PM', occupiedSeats: ['A4', 'A5', 'C1', 'C2'] },
	{ id: 5, time: '9:30 PM', occupiedSeats: ['D4', 'D5', 'E1', 'E2'] },
];

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

export default function SeatsScreen() {
	const { id } = useLocalSearchParams();
	console.log('🚀 ~ SeatsScreen ~ id:', id);
	const movie = useMovieStore((state) => state.selectedMovie);
	console.log('🚀 ~ SeatsScreen ~ movie:', movie);
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
					seatScreenStyle.seat,
					isSelected && seatScreenStyle.seatSelected,
					isOccupied && seatScreenStyle.seatOccupied,
				]}
				onPress={() => handleSeatPress(seatId)}
				disabled={isOccupied}
			>
				<Text
					style={[
						seatScreenStyle.seatText,
						isSelected && seatScreenStyle.seatTextSelected,
						isOccupied && seatScreenStyle.seatTextOccupied,
					]}
				>
					{seatNumber}
				</Text>
			</TouchableOpacity>
		);
	};

	const renderRow = (row: string) => {
		return (
			<View key={row} style={seatScreenStyle.row}>
				<Text style={seatScreenStyle.rowLabel}>{row}</Text>
				<View style={seatScreenStyle.seats}>
					{Array.from({ length: SEATS_PER_ROW }, (_, i) =>
						renderSeat(row, i + 1),
					)}
				</View>
			</View>
		);
	};

	return (
		<View style={seatScreenStyle.container}>
			<View style={seatScreenStyle.header}>
				<TouchableOpacity
					style={seatScreenStyle.backButton}
					onPress={() => router.back()}
				>
					<ArrowLeft size={24} color="#1a1a1a" />
				</TouchableOpacity>
				<Text style={seatScreenStyle.headerTitle}>Select Seats</Text>
			</View>

			<View style={seatScreenStyle.showtimesContainer}>
				<Text style={seatScreenStyle.sectionTitle}>
					Select Showtime
				</Text>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={seatScreenStyle.showtimesList}
				>
					{SHOWTIMES.map((showtime) => (
						<TouchableOpacity
							key={showtime.id}
							style={[
								seatScreenStyle.showtimeButton,
								selectedShowtime.id === showtime.id &&
									seatScreenStyle.showtimeButtonActive,
							]}
							onPress={() => setSelectedShowtime(showtime)}
						>
							<Text
								style={[
									seatScreenStyle.showtimeText,
									selectedShowtime.id === showtime.id &&
										seatScreenStyle.showtimeTextActive,
								]}
							>
								{showtime.time}
							</Text>
						</TouchableOpacity>
					))}
				</ScrollView>
			</View>

			<View style={seatScreenStyle.legendContainer}>
				<View style={seatScreenStyle.legendItem}>
					<View
						style={[
							seatScreenStyle.legendSeat,
							seatScreenStyle.seatAvailable,
						]}
					/>
					<Text style={seatScreenStyle.legendText}>Available</Text>
				</View>
				<View style={seatScreenStyle.legendItem}>
					<View
						style={[
							seatScreenStyle.legendSeat,
							seatScreenStyle.seatSelected,
						]}
					/>
					<Text style={seatScreenStyle.legendText}>Selected</Text>
				</View>
				<View style={seatScreenStyle.legendItem}>
					<View
						style={[
							seatScreenStyle.legendSeat,
							seatScreenStyle.seatOccupied,
						]}
					/>
					<Text style={seatScreenStyle.legendText}>Occupied</Text>
				</View>
			</View>

			<View style={seatScreenStyle.screenContainer}>
				<View style={seatScreenStyle.screen} />
				<Text style={seatScreenStyle.screenText}>SCREEN</Text>
			</View>

			<ScrollView
				style={seatScreenStyle.seatsContainer}
				contentContainerStyle={seatScreenStyle.seatsContent}
				showsVerticalScrollIndicator={false}
			>
				{ROWS.map((row) => renderRow(row))}
			</ScrollView>

			<View style={seatScreenStyle.footer}>
				<View style={seatScreenStyle.selectedInfo}>
					<Text style={seatScreenStyle.selectedCount}>
						Selected Seats: {selectedSeats.length}
					</Text>
					<Text style={seatScreenStyle.totalAmount}>
						Total: ${(selectedSeats.length * 15).toFixed(2)}
					</Text>
				</View>
				<TouchableOpacity
					style={[
						seatScreenStyle.confirmButton,
						selectedSeats.length === 0 &&
							seatScreenStyle.confirmButtonDisabled,
					]}
					onPress={handleConfirm}
					disabled={selectedSeats.length === 0}
				>
					<Text style={seatScreenStyle.confirmButtonText}>
						Confirm Selection
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
