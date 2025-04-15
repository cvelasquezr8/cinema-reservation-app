export interface Movie {
	id: string;
	title: string;
	synopsis: string;
	director: string;
	duration: number;
	releaseYear: number;
	rating: number;
	genres: string[];
	posterUrl: string;
	description: string;
	cast: {
		name: string;
		image: string | null;
		character: string;
	}[];
	showtimes: string[];
}
