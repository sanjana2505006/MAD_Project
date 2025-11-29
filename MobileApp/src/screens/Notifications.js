import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { Bell, ChevronLeft, CheckCircle, AlertCircle, Info } from 'lucide-react-native';

const Notifications = ({ navigation }) => {
    const notifications = [
        {
            id: '1',
            title: 'Welcome to the App!',
            message: 'Thanks for joining our coding community. Start solving problems now!',
            type: 'info',
            time: '2 hours ago',
            read: false,
        },
        {
            id: '2',
            title: 'Daily Streak!',
            message: 'You have maintained a 5-day streak. Keep it up!',
            type: 'success',
            time: '1 day ago',
            read: true,
        },
        {
            id: '3',
            title: 'New Problem Added',
            message: 'Check out the new "Dynamic Programming" challenge.',
            type: 'alert',
            time: '2 days ago',
            read: true,
        },
    ];

    const getIcon = (type) => {
        switch (type) {
            case 'success':
                return <CheckCircle color="#10b981" size={24} />;
            case 'alert':
                return <AlertCircle color="#f59e0b" size={24} />;
            default:
                return <Info color="#4dabf7" size={24} />;
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={[styles.notificationItem, !item.read && styles.unreadItem]}>
            <View style={styles.iconContainer}>
                {getIcon(item.type)}
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.headerRow}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.time}>{item.time}</Text>
                </View>
                <Text style={styles.message}>{item.message}</Text>
            </View>
            {!item.read && <View style={styles.dot} />}
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeft color="#fff" size={24} />
                </TouchableOpacity>
                <Text style={styles.title}>Notifications</Text>
                <View style={{ width: 40 }} />
            </View>

            <FlatList
                data={notifications}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Bell color="#64748b" size={48} />
                        <Text style={styles.emptyText}>No notifications yet</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    backButton: {
        padding: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    listContent: {
        padding: 16,
    },
    notificationItem: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#1e1e1e',
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#2a2a2a',
    },
    unreadItem: {
        backgroundColor: '#2a2a2a',
        borderColor: '#4dabf7',
    },
    iconContainer: {
        marginRight: 16,
        justifyContent: 'center',
    },
    contentContainer: {
        flex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    time: {
        fontSize: 12,
        color: '#94a3b8',
    },
    message: {
        fontSize: 14,
        color: '#cbd5e1',
        lineHeight: 20,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#4dabf7',
        position: 'absolute',
        top: 16,
        right: 16,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 100,
    },
    emptyText: {
        color: '#64748b',
        marginTop: 16,
        fontSize: 16,
    },
});

export default Notifications;
