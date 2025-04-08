import React, { useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	ScrollView,
	TouchableOpacity,
	Image,
} from 'react-native';
import { Search, Star } from 'lucide-react-native';
import { Link } from 'expo-router';

const MOVIES = [
	{
		id: 1,
		title: 'Oppenheimer',
		poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&h=700&fit=crop',
		actors: ['Cillian Murphy', 'Emily Blunt'],
		rating: 4.9,
		genres: ['Drama', 'Biography'],
		format: 'IMAX',
	},
	{
		id: 2,
		title: 'Dune: Part Two',
		poster: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500&h=700&fit=crop',
		actors: ['Timothée Chalamet', 'Zendaya'],
		rating: 4.8,
		genres: ['Sci-Fi', 'Adventure'],
		format: 'Premium Dolby',
	},
	{
		id: 3,
		title: 'Poor Things',
		poster: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=500&h=700&fit=crop',
		actors: ['Emma Stone', 'Mark Ruffalo'],
		rating: 4.7,
		genres: ['Comedy', 'Drama'],
		format: 'Standard',
	},
	{
		id: 4,
		title: 'The Batman',
		poster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=700&fit=crop',
		actors: ['Robert Pattinson', 'Zoë Kravitz'],
		rating: 4.6,
		genres: ['Action', 'Drama'],
		format: 'IMAX 3D',
	},
	{
		id: 5,
		title: 'Barbie',
		poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=700&fit=crop',
		actors: ['Margot Robbie', 'Ryan Gosling'],
		rating: 4.5,
		genres: ['Comedy', 'Adventure'],
		format: 'VIP Experience',
	},
];

const GENRES = [
	'All',
	'Action',
	'Adventure',
	'Comedy',
	'Drama',
	'Sci-Fi',
	'Biography',
];

export default function MoviesScreen() {
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedGenre, setSelectedGenre] = useState('All');

	const filteredMovies = MOVIES.filter((movie) => {
		const matchesSearch =
			movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			movie.actors.some((actor) =>
				actor.toLowerCase().includes(searchQuery.toLowerCase()),
			);
		const matchesGenre =
			selectedGenre === 'All' || movie.genres.includes(selectedGenre);
		return matchesSearch && matchesGenre;
	});

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Movies</Text>
				<View style={styles.searchContainer}>
					<Search size={20} color="#666" style={styles.searchIcon} />
					<TextInput
						style={styles.searchInput}
						placeholder="Search movies or actors..."
						value={searchQuery}
						onChangeText={setSearchQuery}
						placeholderTextColor="#666"
					/>
				</View>
			</View>

			<View style={styles.genreSection}>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.genreContent}
				>
					{GENRES.map((genre) => (
						<TouchableOpacity
							key={genre}
							style={[
								styles.genreButton,
								selectedGenre === genre &&
									styles.genreButtonActive,
							]}
							onPress={() => setSelectedGenre(genre)}
						>
							<Text
								style={[
									styles.genreButtonText,
									selectedGenre === genre &&
										styles.genreButtonTextActive,
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
				contentContainerStyle={styles.movieList}
			>
				{filteredMovies.length === 0 ? (
					<View style={styles.noResults}>
						<Text style={styles.noResultsText}>
							No movies found
						</Text>
						<Text style={styles.noResultsSubtext}>
							Try adjusting your search or filters
						</Text>
					</View>
				) : (
					filteredMovies.map((movie) => (
						<Link
							key={movie.id}
							href={`/movies/${movie.id}`}
							asChild
						>
							<TouchableOpacity style={styles.movieCard}>
								<Image
									source={{ uri: movie.poster }}
									style={styles.moviePoster}
								/>
								<View style={styles.movieInfo}>
									<Text style={styles.movieTitle}>
										{movie.title}
									</Text>
									<View style={styles.ratingContainer}>
										<Star
											size={16}
											color="#FFD700"
											fill="#FFD700"
										/>
										<Text style={styles.rating}>
											{movie.rating}
										</Text>
									</View>
									<Text style={styles.actors}>
										{movie.actors.join(', ')}
									</Text>
									<View style={styles.formatBadge}>
										<Text style={styles.formatText}>
											{movie.format}
										</Text>
									</View>
									<View style={styles.genreList}>
										{movie.genres.map((genre) => (
											<View
												key={genre}
												style={styles.genreTag}
											>
												<Text
													style={styles.genreTagText}
												>
													{genre}
												</Text>
											</View>
										))}
									</View>
								</View>
							</TouchableOpacity>
						</Link>
					))
				)}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	header: {
		padding: 20,
		paddingTop: 60,
		backgroundColor: '#fff',
		borderBottomWidth: 1,
		borderBottomColor: '#f5f5f5',
	},
	headerTitle: {
		fontSize: 32,
		fontWeight: 'bold',
		marginBottom: 16,
	},
	searchContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#f5f5f5',
		borderRadius: 12,
		padding: 12,
	},
	searchIcon: {
		marginRight: 8,
	},
	searchInput: {
		flex: 1,
		fontSize: 16,
		color: '#000',
	},
	genreSection: {
		height: 60,
		borderBottomWidth: 1,
		borderBottomColor: '#f5f5f5',
		backgroundColor: '#fff',
	},
	genreContent: {
		paddingHorizontal: 16,
		paddingVertical: 12,
		gap: 8,
	},
	genreButton: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 20,
		backgroundColor: '#f5f5f5',
		marginRight: 8,
	},
	genreButtonActive: {
		backgroundColor: '#E50914',
	},
	genreButtonText: {
		fontSize: 14,
		color: '#666',
	},
	genreButtonTextActive: {
		color: '#fff',
		fontWeight: '600',
	},
	movieList: {
		padding: 16,
		gap: 16,
	},
	noResults: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 40,
	},
	noResultsText: {
		fontSize: 18,
		fontWeight: '600',
		color: '#666',
		marginBottom: 8,
	},
	noResultsSubtext: {
		fontSize: 14,
		color: '#999',
	},
	movieCard: {
		flexDirection: 'row',
		backgroundColor: '#fff',
		borderRadius: 12,
		overflow: 'hidden',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
	moviePoster: {
		width: 100,
		height: 150,
	},
	movieInfo: {
		flex: 1,
		padding: 12,
	},
	movieTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 4,
	},
	ratingContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 8,
	},
	rating: {
		marginLeft: 4,
		fontSize: 14,
		color: '#666',
	},
	actors: {
		fontSize: 14,
		color: '#666',
		marginBottom: 8,
	},
	formatBadge: {
		backgroundColor: '#E3F2FD',
		paddingHorizontal: 12,
		paddingVertical: 4,
		borderRadius: 12,
		alignSelf: 'flex-start',
		marginBottom: 8,
	},
	formatText: {
		color: '#1976D2',
		fontSize: 12,
		fontWeight: '600',
	},
	genreList: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 4,
	},
	genreTag: {
		backgroundColor: '#f5f5f5',
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 4,
	},
	genreTagText: {
		fontSize: 12,
		color: '#666',
	},
});
