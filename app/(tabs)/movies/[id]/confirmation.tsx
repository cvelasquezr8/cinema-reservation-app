import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import {
	ArrowLeft,
	Calendar,
	Clock,
	MapPin,
	CreditCard,
} from 'lucide-react-native';
import { useMovieStore } from 'store/movieStore';
import confirmationStyles from 'styles/movies/confirmation-screen.style';

export default function ConfirmationScreen() {
	const { id } = useLocalSearchParams();
	const movieId = typeof id === 'string' ? id : '';
	const { selectedMovie, selectedSeats, selectedShowtime } = useMovieStore();

	if (!selectedMovie || !selectedShowtime || selectedSeats.length === 0) {
		return (
			<View style={confirmationStyles.errorContainer}>
				<Text style={confirmationStyles.errorText}>
					Missing selection data
				</Text>
				<TouchableOpacity
					style={confirmationStyles.backButton}
					onPress={() => router.back()}
				>
					<ArrowLeft size={24} color="#1a1a1a" />
					<Text style={confirmationStyles.backButtonText}>
						Go Back
					</Text>
				</TouchableOpacity>
			</View>
		);
	}

	const totalAmount = selectedSeats.length * 15;

	const handleProceedToPayment = () => {
		router.push(`/movies/${movieId}/payment`);
	};

	return (
		<View style={confirmationStyles.container}>
			<View style={confirmationStyles.header}>
				<TouchableOpacity
					style={confirmationStyles.backButton}
					onPress={() => router.back()}
				>
					<ArrowLeft size={24} color="#1a1a1a" />
				</TouchableOpacity>
				<Text style={confirmationStyles.headerTitle}>
					Booking Summary
				</Text>
			</View>

			<ScrollView
				style={confirmationStyles.content}
				contentContainerStyle={confirmationStyles.contentContainer}
				showsVerticalScrollIndicator={false}
			>
				<View style={confirmationStyles.movieSection}>
					<Image
						source={{ uri: selectedMovie.posterUrl }}
						style={confirmationStyles.moviePoster}
					/>
					<View style={confirmationStyles.movieInfo}>
						<Text style={confirmationStyles.movieTitle}>
							{selectedMovie.title}
						</Text>
						<View style={confirmationStyles.detailRow}>
							<Calendar size={16} color="#666" />
							<Text style={confirmationStyles.detailText}>
								{new Date().toLocaleDateString('en-US', {
									weekday: 'long',
									year: 'numeric',
									month: 'long',
									day: 'numeric',
								})}
							</Text>
						</View>
						<View style={confirmationStyles.detailRow}>
							<Clock size={16} color="#666" />
							<Text style={confirmationStyles.detailText}>
								{selectedShowtime.time}
							</Text>
						</View>
						<View style={confirmationStyles.detailRow}>
							<MapPin size={16} color="#666" />
							<Text style={confirmationStyles.detailText}>
								CineReserve IMAX
							</Text>
						</View>
					</View>
				</View>

				<View style={confirmationStyles.card}>
					<Text style={confirmationStyles.cardTitle}>
						Selected Seats
					</Text>
					<View style={confirmationStyles.seatsGrid}>
						{selectedSeats.map((seat) => (
							<View
								key={seat}
								style={confirmationStyles.seatBadge}
							>
								<Text style={confirmationStyles.seatText}>
									{seat}
								</Text>
							</View>
						))}
					</View>
				</View>

				<View style={confirmationStyles.card}>
					<Text style={confirmationStyles.cardTitle}>
						Total Amount
					</Text>
					<Text style={confirmationStyles.totalAmount}>
						${totalAmount.toFixed(2)}
					</Text>
				</View>
			</ScrollView>

			<View style={confirmationStyles.footer}>
				<TouchableOpacity
					style={confirmationStyles.paymentButton}
					onPress={handleProceedToPayment}
				>
					<CreditCard size={24} color="#fff" />
					<Text style={confirmationStyles.paymentButtonText}>
						Proceed to Payment
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
