import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Star } from 'lucide-react-native';
import { MovieModel } from 'models/movie.model';
import { useMovieStore } from 'store/movieStore';
import { router } from 'expo-router';

interface Props {
	movies: MovieModel[];
	onMovieSelect: (movie: MovieModel) => void;
}

export default function MovieCardList({ movies, onMovieSelect }: Props) {
	return (
		<>
			{movies.map((movie) => (
				<TouchableOpacity
					key={movie.id}
					style={styles.card}
					onPress={() => onMovieSelect(movie)}
				>
					<Image
						source={{ uri: movie.posterUrl }}
						style={styles.poster}
					/>
					<View style={styles.info}>
						<Text style={styles.title}>{movie.title}</Text>
						<View style={styles.ratingContainer}>
							<Star size={16} color="#FFD700" fill="#FFD700" />
							<Text style={styles.rating}>
								{movie.rating.toFixed(1)}
							</Text>
						</View>
						<Text style={styles.actors}>
							{movie.cast.map((actor) => actor.name).join(', ')}
						</Text>
						<View style={styles.genreList}>
							{movie.genres.map((genre) => (
								<View key={genre} style={styles.genreTag}>
									<Text style={styles.genreText}>
										{genre}
									</Text>
								</View>
							))}
						</View>
					</View>
				</TouchableOpacity>
			))}
		</>
	);
}

const styles = StyleSheet.create({
	card: {
		flexDirection: 'row',
		backgroundColor: '#fff',
		borderRadius: 12,
		overflow: 'hidden',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
		marginBottom: 16,
	},
	poster: {
		width: 100,
		height: 150,
	},
	info: {
		flex: 1,
		padding: 12,
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
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
	genreText: {
		fontSize: 12,
		color: '#666',
	},
});
