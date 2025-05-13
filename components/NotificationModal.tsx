import React, { useEffect, useRef } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Animated,
	TouchableOpacity,
	Dimensions,
	Platform,
} from 'react-native';
import {
	CircleAlert as AlertCircle,
	CircleCheck as CheckCircle,
	Circle as XCircle,
	X,
} from 'lucide-react-native';

type NotificationType = 'success' | 'error' | 'info';

interface NotificationProps {
	visible: boolean;
	type?: NotificationType;
	title: string;
	message?: string;
	onClose: () => void;
	duration?: number;
}

export default function NotificationModal({
	visible,
	type = 'info',
	title,
	message = '',
	onClose,
	duration = 3000,
}: NotificationProps) {
	const translateY = useRef(new Animated.Value(-100)).current;
	const opacity = useRef(new Animated.Value(0)).current;
	const mountedRef = useRef(true);

	useEffect(() => {
		return () => {
			mountedRef.current = false;
		};
	}, []);

	useEffect(() => {
		if (visible) {
			Animated.parallel([
				Animated.timing(translateY, {
					toValue: 0,
					duration: 300,
					useNativeDriver: true,
				}),
				Animated.timing(opacity, {
					toValue: 1,
					duration: 300,
					useNativeDriver: true,
				}),
			]).start();

			const timer = setTimeout(() => {
				if (mountedRef.current) {
					handleClose();
				}
			}, duration);

			return () => clearTimeout(timer);
		}
	}, [visible, duration]);

	const handleClose = () => {
		if (!mountedRef.current) return;

		Animated.parallel([
			Animated.timing(translateY, {
				toValue: -100,
				duration: 300,
				useNativeDriver: true,
			}),
			Animated.timing(opacity, {
				toValue: 0,
				duration: 300,
				useNativeDriver: true,
			}),
		]).start(() => {
			if (mountedRef.current) {
				onClose();
			}
		});
	};

	const getIcon = () => {
		switch (type) {
			case 'success':
				return <CheckCircle size={24} color="#4CAF50" />;
			case 'error':
				return <AlertCircle size={24} color="#E50914" />;
			default:
				return <AlertCircle size={24} color="#2196F3" />;
		}
	};

	const getBackgroundColor = () => {
		switch (type) {
			case 'success':
				return '#E8F5E9';
			case 'error':
				return '#FEE2E2';
			default:
				return '#E3F2FD';
		}
	};

	if (!visible) return null;

	return (
		<Animated.View
			style={[
				styles.container,
				{
					transform: [{ translateY }],
					opacity,
					backgroundColor: getBackgroundColor(),
				},
			]}
		>
			<View style={styles.content}>
				<View style={styles.iconContainer}>{getIcon()}</View>
				<View style={styles.textContainer}>
					<Text style={styles.title}>{title}</Text>
					{message ? (
						<Text style={styles.message}>{message}</Text>
					) : null}
				</View>
				<TouchableOpacity
					style={styles.closeButton}
					onPress={handleClose}
				>
					<X size={20} color="#666" />
				</TouchableOpacity>
			</View>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: Platform.OS === 'ios' ? 60 : Platform.OS === 'android' ? 40 : 20,
		left: 20,
		right: 20,
		zIndex: 1000,
		borderRadius: 12,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 5,
	},
	content: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 16,
	},
	iconContainer: {
		marginRight: 12,
	},
	textContainer: {
		flex: 1,
	},
	title: {
		fontSize: 16,
		fontWeight: '600',
		color: '#1a1a1a',
		marginBottom: 4,
	},
	message: {
		fontSize: 14,
		color: '#666',
	},
	closeButton: {
		marginLeft: 12,
		padding: 4,
	},
});
