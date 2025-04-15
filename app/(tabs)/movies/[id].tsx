import React from 'react';
import {
	View,
	Text,
	ScrollView,
	Image,
	TouchableOpacity,
	Dimensions,
	ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Star, Clock, Calendar, Ticket } from 'lucide-react-native';
import { useMovieStore } from 'store/movieStore';
import movieDetailStyle from 'styles/movies/movie-detail.style';

const { width } = Dimensions.get('window');
const CAST_CARD_WIDTH = width * 0.7;
const CAST_CARD_MARGIN = 16;

interface castMember {
	image?: string | null;
	name?: string;
	character?: string;
}

export default function MovieDetailScreen() {
	const { id } = useLocalSearchParams();
	const movie = useMovieStore((state) => state.selectedMovie);

	const formatMinutesToTime = (minutes: number): string => {
		const hours = Math.floor(minutes / 60);
		const mins = minutes % 60;

		const hourStr = hours > 0 ? `${hours}h` : '';
		const minStr = mins > 0 ? `${mins}min` : '';

		return [hourStr, minStr].filter(Boolean).join(' ');
	};

	if (!movie || movie.id !== id) {
		return (
			<View style={movieDetailStyle.centered}>
				<ActivityIndicator size="large" color="#E50914" />
			</View>
		);
	}

	const renderCastCard = (castMember: castMember, index: number) => (
		<View key={index} style={movieDetailStyle.castCard}>
			<Image
				source={{ uri: castMember.image ?? undefined }}
				style={movieDetailStyle.castPhoto}
			/>
			<View style={movieDetailStyle.castInfo}>
				<Text style={movieDetailStyle.castName}>{castMember.name}</Text>
				<Text style={movieDetailStyle.castCharacter}>
					as {castMember.character}
				</Text>
			</View>
		</View>
	);

	return (
		<ScrollView
			contentContainerStyle={{ flexGrow: 1 }}
			style={movieDetailStyle.container}
		>
			<View style={movieDetailStyle.header}>
				<Image
					source={require('assets/images/cinema-background.jpeg')}
					style={movieDetailStyle.backdrop}
				/>
				<View style={movieDetailStyle.overlay} />
				<View style={movieDetailStyle.posterContainer}>
					<Image
						source={{ uri: movie.posterUrl }}
						style={movieDetailStyle.poster}
					/>
					<View style={movieDetailStyle.movieInfo}>
						<Text style={movieDetailStyle.title}>
							{movie.title}
						</Text>
						<View style={movieDetailStyle.ratingContainer}>
							<Star size={24} color="#FFD700" fill="#FFD700" />
							<Text style={movieDetailStyle.rating}>
								{movie.rating.toFixed(2)}
							</Text>
						</View>
					</View>
				</View>
			</View>

			<View style={movieDetailStyle.content}>
				<View style={movieDetailStyle.metadata}>
					<View style={movieDetailStyle.metadataItem}>
						<Clock size={24} color="#666" />
						<Text style={movieDetailStyle.metadataText}>
							{formatMinutesToTime(movie.duration)}
						</Text>
					</View>
					<View style={movieDetailStyle.metadataSeparator} />
					<View style={movieDetailStyle.metadataItem}>
						<Calendar size={24} color="#666" />
						<Text style={movieDetailStyle.metadataText}>
							{movie.releaseYear}
						</Text>
					</View>
				</View>

				<View style={movieDetailStyle.genreList}>
					{movie.genres.map((g) => (
						<View key={g} style={movieDetailStyle.genreTag}>
							<Text style={movieDetailStyle.genreTagText}>
								{g}
							</Text>
						</View>
					))}
				</View>

				<View style={movieDetailStyle.section}>
					<Text style={movieDetailStyle.sectionTitle}>Synopsis</Text>
					<Text style={movieDetailStyle.synopsis}>
						{movie.synopsis}
					</Text>
				</View>

				<View style={movieDetailStyle.section}>
					<Text style={movieDetailStyle.sectionTitle}>
						Description
					</Text>
					<Text style={movieDetailStyle.description}>
						{movie.description}
					</Text>
				</View>

				<View style={movieDetailStyle.section}>
					<Text style={movieDetailStyle.sectionTitle}>Cast</Text>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={movieDetailStyle.castContainer}
						decelerationRate="fast"
						snapToInterval={CAST_CARD_WIDTH + CAST_CARD_MARGIN}
						snapToAlignment="start"
					>
						{movie.cast.map((castMember, index) =>
							renderCastCard(castMember, index),
						)}
					</ScrollView>
				</View>

				{/* {movie.director && (
					<>
						<Text style={styles.sectionTitle}>Director</Text>
						<View style={styles.directorCard}>
							<Image
								source={{ uri: movie.director.photo }}
								style={styles.directorPhoto}
							/>
							<View style={styles.directorInfo}>
								<Text style={styles.directorName}>{movie.director.name}</Text>
								<Text style={styles.directorBio}>{movie.director.biography}</Text>
							</View>
						</View>
					</>
				)} */}

				<TouchableOpacity
					style={movieDetailStyle.buyButton}
					onPress={() => router.push(`/movies/${movie.id}/seats`)}
				>
					<Ticket size={20} color="#fff" />
					<Text style={movieDetailStyle.buyButtonText}>
						Buy Tickets
					</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
}
