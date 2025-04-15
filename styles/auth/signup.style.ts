import { StyleSheet } from 'react-native';
const signUpStyle = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: '#fff',
	},
	scrollContent: {
		flexGrow: 1,
		padding: 24,
		backgroundColor: '#fff',
	},
	backButton: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 24,
	},
	backText: {
		marginLeft: 10,
		fontSize: 18,
		fontWeight: 'bold',
		color: '#1a1a1a',
	},
	headerContainer: {
		marginBottom: 24,
	},
	title: {
		fontSize: 32,
		fontWeight: 'bold',
		color: '#1a1a1a',
		marginBottom: 6,
	},
	subtitle: {
		fontSize: 16,
		color: '#666',
		lineHeight: 24,
	},
	formContainer: {
		width: '100%',
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#f5f5f5',
		borderRadius: 12,
		marginBottom: 8,
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
	errorText: {
		color: '#E50914',
		fontSize: 13,
		marginBottom: 12,
		marginLeft: 8,
	},
	termsText: {
		fontSize: 16,
		color: '#666',
		marginVertical: 16,
		lineHeight: 20,
	},
	linkText: {
		color: '#E50914',
		textDecorationLine: 'underline',
	},
	signUpButton: {
		backgroundColor: '#E50914',
		borderRadius: 12,
		height: 56,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 24,
	},
	disabledButton: {
		backgroundColor: '#ccc',
	},
	signUpButtonText: {
		color: '#fff',
		fontSize: 20,
		fontWeight: '600',
		marginRight: 8,
	},
	divider: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 24,
	},
	dividerLine: {
		flex: 1,
		height: 1,
		backgroundColor: '#e1e1e1',
	},
	dividerText: {
		color: '#666',
		paddingHorizontal: 12,
		fontSize: 20,
	},
	googleContainer: {
		alignItems: 'center',
		marginBottom: 24,
	},
});

export default signUpStyle;
