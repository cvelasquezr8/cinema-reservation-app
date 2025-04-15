import { Platform, StyleSheet } from 'react-native';
const forgotPasswordStyle = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	scrollContent: {
		flexGrow: 1,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 20,
		paddingTop: Platform.OS === 'ios' ? 60 : 40,
		backgroundColor: '#fff',
		borderBottomWidth: 1,
		borderBottomColor: '#f5f5f5',
	},
	backButton: {
		marginRight: 16,
	},
	headerTitle: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#1a1a1a',
	},
	content: {
		flex: 1,
		padding: 20,
	},
	infoSection: {
		marginBottom: 32,
	},
	title: {
		fontSize: 28,
		fontWeight: 'bold',
		color: '#1a1a1a',
		marginBottom: 12,
	},
	description: {
		fontSize: 16,
		color: '#666',
		lineHeight: 24,
	},
	formSection: {
		marginBottom: 40,
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#f5f5f5',
		borderRadius: 12,
		marginBottom: 20,
		paddingHorizontal: 16,
		height: 56,
	},
	inputIcon: {
		marginRight: 12,
	},
	input: {
		flex: 1,
		fontSize: 16,
		color: '#1a1a1a',
	},
	submitButton: {
		backgroundColor: '#E50914',
		borderRadius: 12,
		height: 56,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 8,
	},
	submitButtonDisabled: {
		backgroundColor: '#ccc',
	},
	submitButtonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: '600',
	},
	resendButton: {
		alignItems: 'center',
		marginTop: 16,
	},
	resendButtonText: {
		color: '#E50914',
		fontSize: 16,
		fontWeight: '500',
	},
	helpSection: {
		marginTop: 'auto',
	},
	helpTitle: {
		fontSize: 20,
		fontWeight: '600',
		color: '#1a1a1a',
		marginBottom: 16,
	},
	helpCard: {
		backgroundColor: '#f8f8f8',
		borderRadius: 16,
		padding: 20,
	},
	helpText: {
		fontSize: 14,
		color: '#666',
		lineHeight: 20,
		marginBottom: 16,
	},
	contactButton: {
		backgroundColor: '#fff',
		borderRadius: 8,
		paddingVertical: 12,
		alignItems: 'center',
	},
	contactButtonText: {
		color: '#E50914',
		fontSize: 16,
		fontWeight: '600',
	},
	errorText: {
		color: '#E50914',
		fontSize: 13,
		marginBottom: 12,
		marginLeft: 8,
	},
});

export default forgotPasswordStyle;
