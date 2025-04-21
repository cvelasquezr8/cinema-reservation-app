import api from 'lib/api';

export const fetchMovies = async () => {
	const { data = null } = await api.get('/movies');
	return data;
};

export const fetchMovieById = async (id: string) => {
	const { data = null } = await api.get(`/movies/${id}`);
	return data;
};
