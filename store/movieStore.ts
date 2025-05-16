import { create } from 'zustand';
import { MovieModel } from '../models/movie.model';
interface Showtime {
	id: string;
	time: string;
	createdAt: string;
	updatedAt: string;
}

interface MovieStore {
	selectedMovie: MovieModel | null;
	selectedSeats: string[];
	selectedShowtime: Showtime | null;

	setSelectedMovie: (movie: MovieModel) => void;
	clearSelectedMovie: () => void;

	setSelectedSeats: (seats: string[]) => void;
	setSelectedShowtime: (showtime: Showtime) => void;
	clearSelection: () => void;

	clearAll: () => void;
}

export const useMovieStore = create<MovieStore>((set) => ({
	selectedMovie: null,
	selectedSeats: [],
	selectedShowtime: null,

	setSelectedMovie: (movie) => set({ selectedMovie: movie }),
	clearSelectedMovie: () => set({ selectedMovie: null }),

	setSelectedSeats: (seats) => set({ selectedSeats: seats }),
	setSelectedShowtime: (showtime) => set({ selectedShowtime: showtime }),

	clearSelection: () => set({ selectedSeats: [], selectedShowtime: null }),

	clearAll: () =>
		set({ selectedMovie: null, selectedSeats: [], selectedShowtime: null }),
}));
