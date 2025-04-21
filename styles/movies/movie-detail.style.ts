import { Dimensions, Platform, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window');
const CAST_CARD_WIDTH = width * 0.7;
const CAST_CARD_MARGIN = 16;
const HEADER_HEIGHT = Platform.OS === 'ios' ? 90 : 70;

const movieDetailStyle = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#fff' },
	centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
	errorText: { textAlign: 'center', color: '#666', fontSize: 16 },
	header: { height: 300, position: 'relative' },
	backdrop: { width: '100%', height: '100%' },
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0,0,0,0.4)',
	},
	posterContainer: {
		position: 'absolute',
		bottom: -50,
		left: 0,
		right: 0,
		flexDirection: 'row',
		padding: 20,
	},
	poster: {
		width: 100,
		height: 150,
		borderRadius: 8,
	},
	movieInfo: {
		flex: 1,
		marginLeft: 16,
		justifyContent: 'flex-end',
	},
	title: {
		fontSize: 28,
		fontWeight: 'bold',
		color: '#fff',
		marginBottom: 8,
	},
	ratingContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 20,
		alignSelf: 'flex-start',
	},
	ratingIcon: {
		marginRight: 6,
	},
	rating: {
		fontSize: 18,
		color: '#fff',
		fontWeight: '600',
		paddingLeft: 10,
	},
	content: {
		flex: 1,
		marginTop: 30,
		padding: 20,
	},
	metadata: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 20,
		backgroundColor: '#f8f8f8',
		padding: 16,
		borderRadius: 12,
	},
	metadataItem: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	metadataSeparator: {
		width: 1,
		height: 24,
		backgroundColor: '#ddd',
		marginHorizontal: 20,
	},
	metadataText: {
		fontSize: 16,
		color: '#1a1a1a',
		fontWeight: '500',
	},
	genreList: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
		marginBottom: 24,
	},
	genreTag: {
		backgroundColor: '#f5f5f5',
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 20,
	},
	genreTagText: {
		fontSize: 14,
		color: '#666',
		fontWeight: '500',
	},
	section: {
		marginBottom: 32,
	},
	sectionTitle: {
		fontSize: 22,
		fontWeight: 'bold',
		marginBottom: 16,
		color: '#1a1a1a',
	},
	synopsis: {
		fontSize: 16,
		lineHeight: 24,
		color: '#1a1a1a',
	},
	description: {
		fontSize: 16,
		lineHeight: 24,
		color: '#666',
	},
	castContainer: {
		paddingRight: 20,
		gap: CAST_CARD_MARGIN,
	},
	castCard: {
		width: CAST_CARD_WIDTH,
		backgroundColor: '#f8f8f8',
		borderRadius: 16,
		overflow: 'hidden',
	},
	castPhoto: {
		width: '100%',
		height: 200,
	},
	castInfo: {
		padding: 16,
	},
	castName: {
		fontSize: 18,
		fontWeight: '600',
		color: '#1a1a1a',
		marginBottom: 4,
	},
	castCharacter: {
		fontSize: 14,
		color: '#666',
	},
	directorCard: {
		flexDirection: 'row',
		backgroundColor: '#f8f8f8',
		borderRadius: 16,
		overflow: 'hidden',
	},
	directorPhoto: {
		width: 120,
		height: 120,
	},
	directorInfo: {
		flex: 1,
		padding: 16,
	},
	directorName: {
		fontSize: 18,
		fontWeight: '600',
		color: '#1a1a1a',
		marginBottom: 8,
	},
	directorBio: {
		fontSize: 14,
		color: '#666',
		lineHeight: 20,
	},
	buyButton: {
		backgroundColor: '#E50914',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 16,
		borderRadius: 12,
		gap: 8,
		marginTop: 8,
	},
	buyButtonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: '600',
	},
	backButton: {
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
	fixedHeader: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		height: HEADER_HEIGHT,
		backgroundColor: '#fff',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingTop: Platform.OS === 'ios' ? 44 : 25,
		zIndex: 1000,
		borderBottomWidth: 1,
		borderBottomColor: '#f5f5f5',
	},
	fixedHeaderTitle: {
		flex: 1,
		fontSize: 18,
		fontWeight: '600',
		color: '#1a1a1a',
		marginHorizontal: 16,
		textAlign: 'center',
	},
	placeholder: {
		width: 40,
	},
	floatingBackButton: {
		position: 'absolute',
		top: Platform.OS === 'ios' ? 44 : 30,
		left: 16,
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 1000,
	},
	hideFloatingButton: {
		opacity: 0,
	},
	scrollView: {
		flex: 1,
	},
});

export default movieDetailStyle;
