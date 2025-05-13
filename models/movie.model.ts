interface Cast {
	name: string;
	image: string | null;
	character: string;
}

interface DirectorInfo {
	name: string;
	photo: string | null;
	biography: string | null;
}

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
	cast: Cast[];
	directorInfo: DirectorInfo;
	showtimes: string[];
}
