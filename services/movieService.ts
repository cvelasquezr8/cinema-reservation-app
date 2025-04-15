import api from 'lib/api';

export const fetchMovies = async () => {
	const { data = null } = await api.get('/movies');
	return data;
};

export const fetchMovieById = async (id: string) => {
	console.log(id);
	const { data } = await api.get(`/movies/${id}`);
	console.log([data]);
	return data;
};
