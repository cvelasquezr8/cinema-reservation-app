import { StyleSheet } from 'react-native';

const loginStyle = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#fff' },
	heroSection: { height: 300, position: 'relative' },
	heroImage: { width: '100%', height: '100%' },
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	heroContent: {
		position: 'absolute',
		bottom: 40,
		left: 24,
		right: 24,
	},
	welcomeText: { color: '#fff', fontSize: 27, marginBottom: 4 },
	appName: {
		color: '#fff',
		fontSize: 40,
		fontWeight: 'bold',
		marginBottom: 8,
	},
	tagline: { color: '#fff', fontSize: 20, opacity: 0.9 },
	formContainer: {
		backgroundColor: '#fff',
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		marginTop: -20,
		padding: 24,
		paddingTop: 30,
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
	inputIcon: { marginRight: 12 },
	input: { flex: 1, fontSize: 16, color: '#1a1a1a' },
	errorText: {
		color: '#E50914',
		fontSize: 13,
		marginBottom: 12,
		marginLeft: 8,
	},
	forgotPassword: {
		alignSelf: 'flex-end',
		marginBottom: 24,
	},
	forgotPasswordText: {
		color: '#1e90ff',
		fontWeight: 'bold',
		fontSize: 17,
	},
	loginButton: {
		backgroundColor: '#E50914',
		borderRadius: 12,
		height: 56,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 24,
	},
	loginButtonDisabled: {
		backgroundColor: '#ccc',
	},
	loginButtonText: {
		color: '#fff',
		fontSize: 20,
		fontWeight: '600',
		marginRight: 8,
	},
	divider: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 35,
		marginTop: 35,
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
	signupContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	signupText: {
		color: '#666',
		fontSize: 20,
	},
	signupLink: {
		color: '#E50914',
		fontSize: 20,
		fontWeight: '600',
	},
});

export default loginStyle;
