import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Platform,
} from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Film, Ticket, User } from 'lucide-react-native';

const TABS = [
	{
		name: 'User',
		path: '/(tabs)/profile',
		icon: User,
	},
	{
		name: 'Movies',
		path: '/(tabs)/movies',
		icon: Film,
	},
	{
		name: 'Orders',
		path: '/(tabs)/orders',
		icon: Ticket,
	},
];

export default function BottomNavigation() {
	const router = useRouter();
	const pathname = usePathname();

	const isActive = (path: string) => {
		return pathname.startsWith(path);
	};

	return (
		<View style={styles.container}>
			{TABS.map((tab) => {
				const active = isActive(tab.path);
				return (
					<TouchableOpacity
						key={tab.path}
						style={styles.tab}
						onPress={() => router.push(tab.path as any)}
					>
						<View style={styles.tabContent}>
							<tab.icon
								size={24}
								color={active ? '#E50914' : '#666'}
								style={styles.icon}
							/>
							<Text
								style={[
									styles.label,
									active && styles.activeLabel,
								]}
							>
								{tab.name}
							</Text>
							{active && <View style={styles.indicator} />}
						</View>
					</TouchableOpacity>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: '#fff',
		borderTopWidth: 1,
		borderTopColor: '#f5f5f5',
		paddingBottom: Platform.OS === 'ios' ? 24 : 8,
		paddingTop: 12,
		elevation: 8,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: -2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 3,
	},
	tab: {
		flex: 1,
		alignItems: 'center',
	},
	tabContent: {
		alignItems: 'center',
		position: 'relative',
	},
	icon: {
		marginBottom: 4,
	},
	label: {
		fontSize: 12,
		color: '#666',
		fontWeight: '500',
	},
	activeLabel: {
		color: '#E50914',
		fontWeight: '600',
	},
	indicator: {
		position: 'absolute',
		top: -12,
		width: 4,
		height: 4,
		borderRadius: 2,
		backgroundColor: '#E50914',
	},
});
