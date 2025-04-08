import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Image,
	TouchableOpacity,
	Dimensions,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Star, Clock, Calendar, Ticket } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const CAST_CARD_WIDTH = width * 0.7;
const CAST_CARD_MARGIN = 16;

const MOVIES = {
	1: {
		id: 1,
		title: 'Inception',
		poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=1200&fit=crop',
		backdrop:
			'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop',
		synopsis:
			'A thief uses dream-sharing tech to plant an idea into the mind of a CEO.',
		description:
			'Dom Cobb is a skilled thief, the best in the art of extraction, stealing secrets from deep within the subconscious during dreams.',
		cast: [
			{
				name: 'Leonardo DiCaprio',
				character: 'Dom Cobb',
				photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
			},
			{
				name: 'Elliot Page',
				character: 'Ariadne',
				photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
			},
		],
		director: {
			name: 'Christopher Nolan',
			photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop',
			biography:
				'British-American director known for complex narratives and immersive visuals.',
		},
		rating: 4.8,
		duration: '2h 28min',
		releaseDate: '2010',
		genres: ['Action', 'Sci-Fi', 'Thriller'],
	},
};

export default function MovieDetailScreen() {
	const { id } = useLocalSearchParams();
	const movie = MOVIES[Number(id)];

	if (!movie) {
		return (
			<View style={styles.container}>
				<Text style={styles.errorText}>Movie not found</Text>
			</View>
		);
	}

	return (
		<ScrollView style={styles.container}>
			{/* Backdrop */}
			<View style={styles.header}>
				<Image
					source={{ uri: movie.backdrop }}
					style={styles.backdrop}
				/>
				<View style={styles.overlay} />
				<View style={styles.posterWrapper}>
					<Image
						source={{ uri: movie.poster }}
						style={styles.poster}
					/>
					<View style={styles.info}>
						<Text style={styles.title}>{movie.title}</Text>
						<View style={styles.ratingWrapper}>
							<Star size={20} color="#FFD700" fill="#FFD700" />
							<Text style={styles.rating}>{movie.rating}</Text>
						</View>
					</View>
				</View>
			</View>

			{/* Info */}
			<View style={styles.content}>
				<View style={styles.metadata}>
					<View style={styles.metadataItem}>
						<Clock size={20} color="#666" />
						<Text style={styles.metadataText}>
							{movie.duration}
						</Text>
					</View>
					<View style={styles.metadataItem}>
						<Calendar size={20} color="#666" />
						<Text style={styles.metadataText}>
							{movie.releaseDate}
						</Text>
					</View>
				</View>

				<View style={styles.genreList}>
					{movie.genres.map((g) => (
						<View key={g} style={styles.genre}>
							<Text style={styles.genreText}>{g}</Text>
						</View>
					))}
				</View>

				<Text style={styles.sectionTitle}>Synopsis</Text>
				<Text style={styles.paragraph}>{movie.synopsis}</Text>

				<Text style={styles.sectionTitle}>Description</Text>
				<Text style={styles.paragraph}>{movie.description}</Text>

				<Text style={styles.sectionTitle}>Cast</Text>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.castList}
				>
					{movie.cast.map((actor, i) => (
						<View key={i} style={styles.castCard}>
							<Image
								source={{ uri: actor.photo }}
								style={styles.castImage}
							/>
							<Text style={styles.castName}>{actor.name}</Text>
							<Text style={styles.castRole}>
								as {actor.character}
							</Text>
						</View>
					))}
				</ScrollView>

				<Text style={styles.sectionTitle}>Director</Text>
				<View style={styles.directorCard}>
					<Image
						source={{ uri: movie.director.photo }}
						style={styles.directorImage}
					/>
					<View style={styles.directorInfo}>
						<Text style={styles.directorName}>
							{movie.director.name}
						</Text>
						<Text style={styles.directorBio}>
							{movie.director.biography}
						</Text>
					</View>
				</View>

				<TouchableOpacity
					style={styles.button}
					onPress={() => router.push(`/movies/${movie.id}/seats`)}
				>
					<Ticket size={20} color="#fff" />
					<Text style={styles.buttonText}>Buy Tickets</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#fff' },
	errorText: { textAlign: 'center', marginTop: 50, color: '#666' },
	header: { height: 300, position: 'relative' },
	backdrop: { width: '100%', height: '100%' },
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0,0,0,0.4)',
	},
	posterWrapper: {
		position: 'absolute',
		bottom: -60,
		left: 20,
		flexDirection: 'row',
		alignItems: 'flex-end',
	},
	poster: {
		width: 100,
		height: 150,
		borderRadius: 10,
	},
	info: {
		marginLeft: 16,
		justifyContent: 'flex-end',
	},
	title: {
		fontSize: 26,
		fontWeight: 'bold',
		color: '#fff',
		marginBottom: 6,
	},
	ratingWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	rating: {
		marginLeft: 6,
		color: '#fff',
		fontWeight: '600',
		fontSize: 16,
	},
	content: {
		marginTop: 80,
		padding: 20,
	},
	metadata: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginBottom: 16,
	},
	metadataItem: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	metadataText: {
		fontSize: 14,
		color: '#333',
	},
	genreList: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 10,
		marginBottom: 24,
	},
	genre: {
		backgroundColor: '#f5f5f5',
		paddingVertical: 6,
		paddingHorizontal: 14,
		borderRadius: 16,
	},
	genreText: {
		color: '#555',
		fontWeight: '500',
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: '700',
		marginBottom: 8,
		color: '#1a1a1a',
	},
	paragraph: {
		fontSize: 15,
		lineHeight: 22,
		color: '#444',
		marginBottom: 20,
	},
	castList: {
		paddingVertical: 10,
		gap: 16,
	},
	castCard: {
		width: CAST_CARD_WIDTH,
		backgroundColor: '#f8f8f8',
		borderRadius: 16,
		overflow: 'hidden',
	},
	castImage: {
		width: '100%',
		height: 200,
	},
	castName: {
		fontWeight: 'bold',
		fontSize: 16,
		marginTop: 8,
		marginLeft: 12,
	},
	castRole: {
		fontSize: 13,
		color: '#666',
		marginLeft: 12,
		marginBottom: 12,
	},
	directorCard: {
		flexDirection: 'row',
		backgroundColor: '#f5f5f5',
		borderRadius: 16,
		marginTop: 10,
		overflow: 'hidden',
	},
	directorImage: {
		width: 100,
		height: 100,
	},
	directorInfo: {
		padding: 12,
		flex: 1,
	},
	directorName: {
		fontWeight: '600',
		fontSize: 16,
		marginBottom: 6,
	},
	directorBio: {
		fontSize: 13,
		color: '#666',
		lineHeight: 18,
	},
	button: {
		marginTop: 30,
		backgroundColor: '#E50914',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 14,
		borderRadius: 12,
		gap: 8,
	},
	buttonText: {
		color: '#fff',
		fontWeight: '600',
		fontSize: 16,
	},
});
