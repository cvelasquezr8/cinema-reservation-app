import { StyleSheet } from 'react-native';
const movieListStyle = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#fff' },
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
		flexGrow: 1,
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
	loadingContainer: {
		paddingVertical: 20,
		alignItems: 'center',
	},
});

export default movieListStyle;
