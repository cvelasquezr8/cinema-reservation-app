import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

import seatScreenStyle from 'styles/movies/seats-screen.style';
import { useMovieStore } from 'store/movieStore';
import { fetchMovieShowtimes } from 'services/reservationService';

interface Showtime {
	id: string;
	time: string;
	createdAt: string;
	updatedAt: string;
}

const SEATS_PER_ROW = 8;
const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

function convertTo24Hour(time: string): string {
	const match = time.match(/(\d{1,2}):(\d{2})\s?(AM|PM)/i);
	if (!match) throw new Error(`Invalid time format: ${time}`);

	let [_, hours, minutes, modifier] = match;
	let hrs = parseInt(hours, 10);

	if (modifier.toUpperCase() === 'PM' && hrs !== 12) hrs += 12;
	if (modifier.toUpperCase() === 'AM' && hrs === 12) hrs = 0;

	return `${hrs.toString().padStart(2, '0')}:${minutes}`;
}

function sortByTimeAsc(data: Showtime[]): Showtime[] {
	return [...data].sort((a, b) => {
		const timeA = new Date(`1970-01-01T${convertTo24Hour(a.time)}:00`);
		const timeB = new Date(`1970-01-01T${convertTo24Hour(b.time)}:00`);
		return timeA.getTime() - timeB.getTime();
	});
}

export default function SeatsScreen() {
	const { id } = useLocalSearchParams();
	const movieId = typeof id === 'string' ? id : '';
	const movie = useMovieStore((state) => state.selectedMovie);
	console.log({ movie });
	const showtimes = sortByTimeAsc((movie?.showtimes ?? []) as Showtime[]);
	console.log({ showtimes });
	const selectedSeats = useMovieStore((state) => state.selectedSeats);
	const selectedShowtime =
		useMovieStore((state) => state.selectedShowtime) ??
		showtimes[0] ??
		null;

	const setSelectedSeats = useMovieStore((state) => state.setSelectedSeats);
	const setSelectedShowtime = useMovieStore(
		(state) => state.setSelectedShowtime,
	);

	const [reservedSeats, setReservedSeats] = useState<string[]>([]);

	useEffect(() => {
		const loadReservedSeats = async () => {
			if (!selectedShowtime) return;
			try {
				const response = await fetchMovieShowtimes(selectedShowtime.id);
				console.log(response);
				if (Array.isArray(response)) setReservedSeats(response);
				else setReservedSeats([]);
			} catch (error) {
				console.error('Error loading reserved seats:', error);
				setReservedSeats([]);
			}
		};

		loadReservedSeats();
		setSelectedSeats([]);
	}, [selectedShowtime?.id]);

	const handleSeatPress = (seatId: string) => {
		if (reservedSeats.includes(seatId)) return;
		if (selectedSeats.includes(seatId)) {
			setSelectedSeats(selectedSeats.filter((seat) => seat !== seatId));
		} else {
			setSelectedSeats([...selectedSeats, seatId]);
		}
	};

	const handleConfirm = () => {
		if (selectedSeats.length === 0) {
			Alert.alert(
				'No Seats Selected',
				'Please select at least one seat to continue.',
			);
			return;
		}

		if (selectedShowtime) {
			setSelectedShowtime(selectedShowtime);
		}

		setSelectedSeats(selectedSeats);

		router.push(`/movies/${movieId}/confirmation`);
	};

	const handleShowtimeChange = (showtime: Showtime) => {
		setSelectedShowtime(showtime);
		setSelectedSeats([]);
	};

	const renderSeat = (row: string, seatNumber: number) => {
		const seatId = `${row}${seatNumber}`;
		const isSelected = selectedSeats.includes(seatId);
		const isOccupied = reservedSeats.includes(seatId);

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

	const renderRow = (row: string) => (
		<View key={row} style={seatScreenStyle.row}>
			<Text style={seatScreenStyle.rowLabel}>{row}</Text>
			<View style={seatScreenStyle.seats}>
				{Array.from({ length: SEATS_PER_ROW }, (_, i) =>
					renderSeat(row, i + 1),
				)}
			</View>
		</View>
	);

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
					{showtimes.map((showtime) => (
						<TouchableOpacity
							key={showtime.id}
							style={[
								seatScreenStyle.showtimeButton,
								selectedShowtime?.id === showtime.id &&
									seatScreenStyle.showtimeButtonActive,
							]}
							onPress={() => handleShowtimeChange(showtime)}
						>
							<Text
								style={[
									seatScreenStyle.showtimeText,
									selectedShowtime?.id === showtime.id &&
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
