import api from 'lib/api';
import { useMovieStore } from 'store/movieStore';

export const createPaymentIntent = async (type: string) => {
	const { selectedMovie, selectedShowtime, selectedSeats, clearAll } =
		useMovieStore.getState();

	if (!selectedMovie || !selectedShowtime || selectedSeats.length === 0) {
		throw new Error('Missing movie, showtime, or seats selection');
	}

	const payload = {
		type,
		total: selectedSeats.length * 15 * 100,
		date: new Date().toISOString(),
		showtimeId: selectedShowtime.id,
		seats: selectedSeats,
	};

	const { data = null } = await api.post(
		'/payments/create-payment-intent',
		payload,
	);

	clearAll();

	return data;
};
