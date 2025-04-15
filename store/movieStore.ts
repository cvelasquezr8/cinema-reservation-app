import { create } from 'zustand';
import { Movie } from 'models/Movie';

interface MovieStore {
	selectedMovie: Movie | null;
	setSelectedMovie: (movie: Movie) => void;
	clearSelectedMovie: () => void;
}

export const useMovieStore = create<MovieStore>((set) => ({
	selectedMovie: null,
	setSelectedMovie: (movie) => set({ selectedMovie: movie }),
	clearSelectedMovie: () => set({ selectedMovie: null }),
}));
