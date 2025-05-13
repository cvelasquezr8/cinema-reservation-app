import { useState, useCallback } from 'react';

type NotificationType = 'success' | 'error' | 'info';

interface NotificationState {
	visible: boolean;
	type: NotificationType;
	title: string;
	message?: string;
}

export function useNotification() {
	const [notification, setNotification] = useState<NotificationState>({
		visible: false,
		type: 'info',
		title: '',
		message: '',
	});

	const showNotification = useCallback(
		(type: NotificationType, title: string, message?: string) => {
			setNotification({
				visible: true,
				type,
				title,
				message,
			});
		},
		[],
	);

	const hideNotification = useCallback(() => {
		setNotification((prev) => ({ ...prev, visible: false }));
	}, []);

	return {
		notification,
		showNotification,
		hideNotification,
	};
}
