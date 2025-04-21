import { create } from 'zustand';
import { MovieModel } from 'models/movie.model';

interface MovieStore {
	selectedMovie: MovieModel | null;
	setSelectedMovie: (movie: MovieModel) => void;
	clearSelectedMovie: () => void;
}

export const useMovieStore = create<MovieStore>((set) => ({
	selectedMovie: null,
	setSelectedMovie: (movie) => set({ selectedMovie: movie }),
	clearSelectedMovie: () => set({ selectedMovie: null }),
}));
