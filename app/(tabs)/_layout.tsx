import { Stack } from 'expo-router';
import NavigationBar from 'components/NavigationBar';

export default function TabsLayout() {
	return (
		<>
			<Stack screenOptions={{ headerShown: false }} />
			<NavigationBar />
		</>
	);
}
