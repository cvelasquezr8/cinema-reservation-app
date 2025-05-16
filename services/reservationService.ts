import api from 'lib/api';

export const fetchMovieShowtimes = async (showtimeID: string) => {
	const { data = null } = await api.get(
		`/reservations/showtimes/${showtimeID}/seats`,
	);
	return data;
};
