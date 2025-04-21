import React, { useState, useRef } from 'react';
import {
	View,
	Text,
	ScrollView,
	Image,
	TouchableOpacity,
	Dimensions,
	ActivityIndicator,
	Animated,
	Platform,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Star, Clock, Calendar, Ticket, ArrowLeft } from 'lucide-react-native';
import { useMovieStore } from 'store/movieStore';
import movieDetailStyle from 'styles/movies/movie-detail.style';

const { width } = Dimensions.get('window');
const CAST_CARD_WIDTH = width * 0.7;
const CAST_CARD_MARGIN = 16;
const HEADER_HEIGHT = Platform.OS === 'ios' ? 88 : 64;
const SCROLL_THRESHOLD = 200;

interface castMember {
	image?: string | null;
	name?: string;
	character?: string;
}

export default function MovieDetailScreen() {
	const { id } = useLocalSearchParams();
	const movie = useMovieStore((state) => state.selectedMovie);
	const scrollY = useRef(new Animated.Value(0)).current;
	const [isHeaderVisible, setIsHeaderVisible] = useState(false);

	const headerOpacity = scrollY.interpolate({
		inputRange: [SCROLL_THRESHOLD - 50, SCROLL_THRESHOLD],
		outputRange: [0, 1],
		extrapolate: 'clamp',
	});

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

	const handleScroll = Animated.event(
		[{ nativeEvent: { contentOffset: { y: scrollY } } }],
		{
			useNativeDriver: false,
			listener: (event: any) => {
				const offsetY = event.nativeEvent.contentOffset.y;
				setIsHeaderVisible(offsetY > SCROLL_THRESHOLD);
			},
		},
	);

	return (
		<View style={movieDetailStyle.container}>
			{/* Fixed Header */}
			<Animated.View
				style={[
					movieDetailStyle.fixedHeader,
					{
						opacity: headerOpacity,
						transform: [
							{
								translateY: scrollY.interpolate({
									inputRange: [0, SCROLL_THRESHOLD],
									outputRange: [-HEADER_HEIGHT, 0],
									extrapolate: 'clamp',
								}),
							},
						],
					},
				]}
			>
				<TouchableOpacity
					style={movieDetailStyle.backButton}
					onPress={() => router.back()}
				>
					<ArrowLeft size={24} color="#1a1a1a" />
				</TouchableOpacity>
				<Text
					style={movieDetailStyle.fixedHeaderTitle}
					numberOfLines={1}
				>
					{movie.title}
				</Text>
				<View style={movieDetailStyle.placeholder} />
			</Animated.View>

			{/* Floating Back Button */}
			<TouchableOpacity
				style={[
					movieDetailStyle.floatingBackButton,
					isHeaderVisible && movieDetailStyle.hideFloatingButton,
				]}
				onPress={() => router.back()}
			>
				<ArrowLeft size={24} color="#fff" />
			</TouchableOpacity>

			<Animated.ScrollView
				contentContainerStyle={{ flexGrow: 1 }}
				style={movieDetailStyle.scrollView}
				onScroll={handleScroll}
				scrollEventThrottle={16}
			>
				<View style={movieDetailStyle.header}>
					<Image
						source={{ uri: movie.backdropUrl }}
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
								<Star
									size={24}
									color="#FFD700"
									fill="#FFD700"
								/>
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
						<Text style={movieDetailStyle.sectionTitle}>
							Synopsis
						</Text>
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

					{movie.cast.length > 0 && (
						<View style={movieDetailStyle.section}>
							<Text style={movieDetailStyle.sectionTitle}>
								Cast
							</Text>
							<ScrollView
								horizontal
								showsHorizontalScrollIndicator={false}
								contentContainerStyle={
									movieDetailStyle.castContainer
								}
								decelerationRate="fast"
								snapToInterval={
									CAST_CARD_WIDTH + CAST_CARD_MARGIN
								}
								snapToAlignment="start"
							>
								{movie.cast.map((castMember, index) =>
									renderCastCard(castMember, index),
								)}
							</ScrollView>
						</View>
					)}

					{Object.values(movie.directorInfo).every(
						(ele) => ele !== null && ele !== undefined,
					) && (
						<>
							<Text style={movieDetailStyle.sectionTitle}>
								Director
							</Text>
							<View style={movieDetailStyle.directorCard}>
								<Image
									source={{
										uri: movie.directorInfo.photo ?? '',
									}}
									style={movieDetailStyle.directorPhoto}
								/>
								<View style={movieDetailStyle.directorInfo}>
									<Text style={movieDetailStyle.directorName}>
										{movie.directorInfo.name}
									</Text>
									<Text style={movieDetailStyle.directorBio}>
										{movie.directorInfo.biography?.slice(
											0,
											110,
										) + '...'}
									</Text>
								</View>
							</View>
						</>
					)}

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
			</Animated.ScrollView>
		</View>
	);
}
