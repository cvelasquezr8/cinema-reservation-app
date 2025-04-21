import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	header: {
		padding: 20,
		paddingTop: Platform.OS === 'ios' ? 60 : 40,
		backgroundColor: '#fff',
		borderBottomWidth: 1,
		borderBottomColor: '#f5f5f5',
	},
	headerTitle: {
		fontSize: 32,
		fontWeight: 'bold',
	},
	avatarContainer: {
		alignItems: 'center',
		padding: 20,
		backgroundColor: '#f8f8f8',
	},
	avatarWrapper: {
		position: 'relative',
		marginBottom: 16,
	},
	avatar: {
		width: 120,
		height: 120,
		borderRadius: 60,
		backgroundColor: '#e1e1e1',
	},
	cameraButton: {
		position: 'absolute',
		right: 0,
		bottom: 0,
		width: 36,
		height: 36,
		borderRadius: 18,
		backgroundColor: '#E50914',
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 3,
		borderColor: '#fff',
	},
	name: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 4,
		color: '#1a1a1a',
	},
	memberSince: {
		fontSize: 14,
		color: '#666',
	},
	content: {
		padding: 20,
	},
	field: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		marginBottom: 20,
		backgroundColor: '#fff',
		borderRadius: 12,
		padding: 16,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
	fieldIcon: {
		marginRight: 16,
		marginTop: 4,
	},
	fieldContent: {
		flex: 1,
	},
	fieldLabel: {
		fontSize: 12,
		color: '#666',
		marginBottom: 4,
	},
	fieldValue: {
		fontSize: 16,
		color: '#1a1a1a',
	},
	input: {
		fontSize: 16,
		color: '#1a1a1a',
		padding: 12,
		backgroundColor: '#f5f5f5',
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#ddd',
	},
	inputError: {
		borderColor: '#E50914',
		backgroundColor: '#FEE2E2',
	},
	errorContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 8,
		gap: 4,
	},
	errorText: {
		color: '#E50914',
		fontSize: 12,
	},
	button: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#E50914',
		paddingVertical: 16,
		borderRadius: 12,
		marginBottom: 12,
		gap: 8,
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '600',
	},
	saveButton: {
		backgroundColor: '#4CAF50',
	},
	cancelButton: {
		backgroundColor: '#f5f5f5',
	},
	cancelButtonText: {
		color: '#666',
	},
	logoutButton: {
		backgroundColor: '#fff',
		borderWidth: 2,
		borderColor: '#E50914',
		marginTop: 8,
	},
	logoutButtonText: {
		color: '#E50914',
	},
	disabledButton: {
		opacity: 0.6,
	},
});
