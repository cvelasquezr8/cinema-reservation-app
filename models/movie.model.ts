export interface MovieModel {
	id: string;
	title: string;
	synopsis: string;
	director: string;
	duration: number;
	releaseYear: number;
	rating: number;
	genres: string[];
	posterUrl: string;
	backdropUrl: string;
	description: string;
	cast: {
		name: string;
		image: string | null;
		character: string;
	}[];
	directorInfo: {
		name: string;
		photo: string | null;
		biography: string | null;
	};
	showtimes: string[];
}
