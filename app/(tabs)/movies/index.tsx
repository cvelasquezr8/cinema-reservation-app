import React, { useState, useEffect, useCallback } from 'react';
import {
	View,
	Text,
	TextInput,
	ScrollView,
	TouchableOpacity,
	ActivityIndicator,
	NativeSyntheticEvent,
	NativeScrollEvent,
} from 'react-native';
import { Search } from 'lucide-react-native';
import { MovieModel } from 'models/movie.model';
import MovieCardList from 'components/MovieCardList';
import { fetchMovies } from 'services/movieService';
import movieListStyle from 'styles/movies/movies-list.style';

const GENRES = [
	'All',
	'Action',
	'Adventure',
	'Comedy',
	'Crime',
	'Drama',
	'Family',
	'Fantasy',
	'Horror',
	'Mystery',
	'Romance',
	'Sci-Fi',
	'Thriller',
	'War',
	'Western',
];

const MOVIES_PER_PAGE = 4;

export default function MoviesScreen() {
	const [allMovies, setAllMovies] = useState<MovieModel[]>([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedGenre, setSelectedGenre] = useState('All');
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const load = async () => {
			setLoading(true);
			try {
				const response = await fetchMovies();
				setAllMovies(response || []);
			} catch (err) {
				console.error('Error fetching movies:', err);
			} finally {
				setLoading(false);
			}
		};
		load();
	}, []);

	const filteredMovies = allMovies.filter((movie) => {
		const matchesSearch =
			movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			movie.cast.some((actor) =>
				actor.name.toLowerCase().includes(searchQuery.toLowerCase()),
			);
		const matchesGenre =
			selectedGenre === 'All' || movie.genres.includes(selectedGenre);
		return matchesSearch && matchesGenre;
	});

	const displayedMovies = filteredMovies.slice(0, page * MOVIES_PER_PAGE);
	const hasMore = displayedMovies.length < filteredMovies.length;

	const loadMore = useCallback(() => {
		if (!hasMore || loading) return;
		setLoading(true);
		setTimeout(() => {
			setPage((prev) => prev + 1);
			setLoading(false);
		}, 500);
	}, [hasMore, loading]);

	const handleScroll = useCallback(
		(event: NativeSyntheticEvent<NativeScrollEvent>) => {
			const { layoutMeasurement, contentOffset, contentSize } =
				event.nativeEvent;
			const isCloseToBottom =
				layoutMeasurement.height + contentOffset.y >=
				contentSize.height - 50;
			if (isCloseToBottom) loadMore();
		},
		[loadMore],
	);

	return (
		<View style={movieListStyle.container}>
			<View style={movieListStyle.header}>
				<Text style={movieListStyle.headerTitle}>Movies</Text>
				<View style={movieListStyle.searchContainer}>
					<Search
						size={20}
						color="#666"
						style={movieListStyle.searchIcon}
					/>
					<TextInput
						style={movieListStyle.searchInput}
						placeholder="Search movies or actors..."
						value={searchQuery}
						onChangeText={setSearchQuery}
						placeholderTextColor="#666"
					/>
				</View>
			</View>

			<View style={movieListStyle.genreSection}>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={movieListStyle.genreContent}
				>
					{GENRES.map((genre) => (
						<TouchableOpacity
							key={genre}
							style={[
								movieListStyle.genreButton,
								selectedGenre === genre &&
									movieListStyle.genreButtonActive,
							]}
							onPress={() => {
								setSelectedGenre(genre);
								setPage(1);
							}}
						>
							<Text
								style={[
									movieListStyle.genreButtonText,
									selectedGenre === genre &&
										movieListStyle.genreButtonTextActive,
								]}
							>
								{genre}
							</Text>
						</TouchableOpacity>
					))}
				</ScrollView>
			</View>

			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={movieListStyle.movieList}
				onScroll={handleScroll}
				scrollEventThrottle={16}
			>
				{displayedMovies.length === 0 && !loading ? (
					<View style={movieListStyle.noResults}>
						<Text style={movieListStyle.noResultsText}>
							No movies found
						</Text>
						<Text style={movieListStyle.noResultsSubtext}>
							Try adjusting your search or filters
						</Text>
					</View>
				) : (
					<>
						<MovieCardList movies={displayedMovies} />
						{loading && (
							<View style={movieListStyle.loadingContainer}>
								<ActivityIndicator
									size="large"
									color="#E50914"
								/>
							</View>
						)}
					</>
				)}
			</ScrollView>
		</View>
	);
}
