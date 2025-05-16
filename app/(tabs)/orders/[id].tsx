import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import {
	ArrowLeft,
	Calendar,
	Clock,
	MapPin,
	Ticket,
	Receipt,
} from 'lucide-react-native';
import { getOrderById } from 'services/orderService';
import orderDetailStyles from 'styles/orders/order-detail.style';

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
	ticketPrice: number;
	format: string;
	paymentMethod: string;
}

export default function OrderDetailScreen() {
	const { id } = useLocalSearchParams();
	const [order, setOrder] = useState<Order>({} as Order);

	useEffect(() => {
		const load = async () => {
			try {
				const response = await getOrderById(id as string);
				setOrder((response as Order) || {});
			} catch (err) {
				console.error('Error fetching order:', err);
				setOrder({} as Order);
			}
		};
		load();
	}, []);

	if (!order.id) {
		return (
			<View style={orderDetailStyles.container}>
				<Text style={orderDetailStyles.errorText}>Order not found</Text>
			</View>
		);
	}

	return (
		<View style={orderDetailStyles.container}>
			<View style={orderDetailStyles.header}>
				<TouchableOpacity
					style={orderDetailStyles.backButton}
					onPress={() => router.back()}
				>
					<ArrowLeft size={24} color="#1a1a1a" />
				</TouchableOpacity>
				<Text style={orderDetailStyles.headerTitle}>Order Details</Text>
			</View>

			<ScrollView
				style={orderDetailStyles.content}
				contentContainerStyle={orderDetailStyles.contentContainer}
				showsVerticalScrollIndicator={false}
			>
				<View style={orderDetailStyles.movieSection}>
					<Image
						source={{ uri: order.poster }}
						style={orderDetailStyles.moviePoster}
					/>
					<View style={orderDetailStyles.movieInfo}>
						<Text style={orderDetailStyles.movieTitle}>
							{order.movieTitle}
						</Text>
						<View style={orderDetailStyles.detailRow}>
							<Calendar size={16} color="#666" />
							<Text style={orderDetailStyles.detailText}>
								{new Date(order.date).toLocaleDateString(
									'en-US',
									{
										year: 'numeric',
										month: 'long',
										day: 'numeric',
									},
								)}
							</Text>
						</View>
						<View style={orderDetailStyles.detailRow}>
							<Clock size={16} color="#666" />
							<Text style={orderDetailStyles.detailText}>
								{order.time}
							</Text>
						</View>
						<View style={orderDetailStyles.detailRow}>
							<MapPin size={16} color="#666" />
							<Text style={orderDetailStyles.detailText}>
								{order.cinema}
							</Text>
						</View>
						<View style={orderDetailStyles.formatBadge}>
							<Text style={orderDetailStyles.formatText}>
								{order.format}
							</Text>
						</View>
					</View>
				</View>

				<View style={orderDetailStyles.card}>
					<View style={orderDetailStyles.cardHeader}>
						<Ticket size={20} color="#E50914" />
						<Text style={orderDetailStyles.cardTitle}>
							Ticket Details
						</Text>
					</View>
					<View style={orderDetailStyles.cardContent}>
						<View style={orderDetailStyles.row}>
							<Text style={orderDetailStyles.label}>Seats</Text>
							<Text style={orderDetailStyles.value}>
								{order.seats.join(', ')}
							</Text>
						</View>
						<View style={orderDetailStyles.row}>
							<Text style={orderDetailStyles.label}>
								Price per Ticket
							</Text>
							<Text style={orderDetailStyles.value}>
								${order.ticketPrice.toFixed(2)}
							</Text>
						</View>
						<View style={orderDetailStyles.row}>
							<Text style={orderDetailStyles.label}>
								Number of Tickets
							</Text>
							<Text style={orderDetailStyles.value}>
								{order.seats.length}
							</Text>
						</View>
					</View>
				</View>

				<View style={orderDetailStyles.card}>
					<View style={orderDetailStyles.cardHeader}>
						<Receipt size={20} color="#E50914" />
						<Text style={orderDetailStyles.cardTitle}>
							Payment Details
						</Text>
					</View>
					<View style={orderDetailStyles.cardContent}>
						<View style={orderDetailStyles.row}>
							<Text style={orderDetailStyles.label}>
								Transaction ID
							</Text>
							<Text style={orderDetailStyles.value}>
								{order.transactionId}
							</Text>
						</View>
						<View style={orderDetailStyles.row}>
							<Text style={orderDetailStyles.label}>
								Payment Method
							</Text>
							<Text style={orderDetailStyles.value}>
								{order.paymentMethod}
							</Text>
						</View>
						<View style={orderDetailStyles.row}>
							<Text style={orderDetailStyles.label}>Status</Text>
							<View style={orderDetailStyles.statusBadge}>
								<Text style={orderDetailStyles.statusText}>
									{order.status.charAt(0).toUpperCase() +
										order.status.slice(1)}
								</Text>
							</View>
						</View>
						<View
							style={[
								orderDetailStyles.row,
								orderDetailStyles.totalRow,
							]}
						>
							<Text style={orderDetailStyles.totalLabel}>
								Total Amount
							</Text>
							<Text style={orderDetailStyles.totalAmount}>
								${order.total.toFixed(2)}
							</Text>
						</View>
					</View>
				</View>
			</ScrollView>
		</View>
	);
}
