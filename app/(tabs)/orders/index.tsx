import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { Calendar, Clock, MapPin } from 'lucide-react-native';
import { getOrders } from 'services/orderService';
import ordersStyle from 'styles/orders/orders.style';

interface Order {
	id: string;
	movieTitle: string;
	poster: string;
	date: string;
	time: string;
	seats: string[];
	total: number;
	cinema: string;
	transactionId: string;
	status: string;
}

export default function OrdersScreen() {
	const [allOrders, setAllOrders] = useState<Order[]>([]);

	useEffect(() => {
		const load = async () => {
			try {
				const response = await getOrders();
				setAllOrders((response as Order[]) || []);
			} catch (err) {
				console.error('Error fetching orders:', err);
				setAllOrders([]);
			}
		};
		load();
	}, []);

	return (
		<View style={ordersStyle.container}>
			<View style={ordersStyle.header}>
				<Text style={ordersStyle.headerTitle}>My Orders</Text>
			</View>

			{allOrders.length === 0 ? (
				<View style={ordersStyle.noOrdersContainer}>
					<Text style={ordersStyle.noOrdersText}>
						No orders found
					</Text>
					<Text style={ordersStyle.noOrdersSubtext}>
						You haven't purchased any tickets yet.
					</Text>
				</View>
			) : (
				<ScrollView
					style={ordersStyle.content}
					contentContainerStyle={ordersStyle.contentContainer}
					showsVerticalScrollIndicator={false}
				>
					{allOrders.map((order) => (
						<TouchableOpacity
							key={order.id}
							style={ordersStyle.orderCard}
							onPress={() => router.push(`/orders/${order.id}`)}
						>
							<Image
								source={{ uri: order.poster }}
								style={ordersStyle.moviePoster}
							/>
							<View style={ordersStyle.orderInfo}>
								<Text style={ordersStyle.movieTitle}>
									{order.movieTitle}
								</Text>

								<View style={ordersStyle.detailRow}>
									<Calendar size={16} color="#666" />
									<Text style={ordersStyle.detailText}>
										{new Date(
											order.date,
										).toLocaleDateString('en-US', {
											year: 'numeric',
											month: 'long',
											day: 'numeric',
										})}
									</Text>
								</View>

								<View style={ordersStyle.detailRow}>
									<Clock size={16} color="#666" />
									<Text style={ordersStyle.detailText}>
										{order.time}
									</Text>
								</View>

								<View style={ordersStyle.detailRow}>
									<MapPin size={16} color="#666" />
									<Text style={ordersStyle.detailText}>
										{order.cinema}
									</Text>
								</View>

								<View style={ordersStyle.footer}>
									<View style={ordersStyle.seatsContainer}>
										<Text style={ordersStyle.seatsLabel}>
											{order.seats.length}{' '}
											{order.seats.length === 1
												? 'Seat'
												: 'Seats'}
											:
										</Text>
										<Text style={ordersStyle.seatsText}>
											{order.seats.join(', ')}
										</Text>
									</View>
									<Text style={ordersStyle.totalAmount}>
										${order.total.toFixed(2)}
									</Text>
								</View>
							</View>
						</TouchableOpacity>
					))}
				</ScrollView>
			)}
		</View>
	);
}
