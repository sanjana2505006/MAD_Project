import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, Mail, Phone, LogOut, ChevronLeft, Award, TrendingUp, Clock, Edit2 } from 'lucide-react-native';

export default function Profile({ navigation }) {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [fadeAnim] = useState(new Animated.Value(0));
    const [slideAnim] = useState(new Animated.Value(50));

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadUserData();
        });
        startAnimations();
        return unsubscribe;
    }, [navigation]);

    const startAnimations = () => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const loadUserData = async () => {
        try {
            const name = await AsyncStorage.getItem('userName');
            const email = await AsyncStorage.getItem('userEmail');
            const phone = await AsyncStorage.getItem('userPhone');

            setUserData({
                name: name || 'Guest User',
                email: email || 'Not provided',
                phone: phone || 'Not provided'
            });
        } catch (error) {
            console.log('Error loading user data:', error);
        }
    };

    const handleLogout = async () => {
        try {
            // Record Logout Event
            const historyItem = {
                type: 'LOGOUT',
                timestamp: new Date().toISOString(),
                deviceName: Platform.OS === 'ios' ? 'iPhone' : 'Android'
            };

            const existingHistory = await AsyncStorage.getItem('loginHistory');
            const history = existingHistory ? JSON.parse(existingHistory) : [];
            history.unshift(historyItem);
            await AsyncStorage.setItem('loginHistory', JSON.stringify(history));

            // Navigate to Login
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        } catch (error) {
            console.log('Error logging out:', error);
        }
    };

    const StatCard = ({ icon: Icon, label, value, color }) => (
        <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: `${color}20` }]}>
                <Icon size={20} color={color} />
            </View>
            <Text style={styles.statValue}>{value}</Text>
            <Text style={styles.statLabel}>{label}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <ChevronLeft color="#fff" size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Profile</Text>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => navigation.navigate('EditProfile', { userData })}
                >
                    <Edit2 color="#fff" size={20} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
                    {/* Profile Avatar */}
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>
                                {userData.name.charAt(0).toUpperCase()}
                            </Text>
                            <View style={styles.onlineBadge} />
                        </View>
                        <Text style={styles.name}>{userData.name}</Text>
                        <Text style={styles.role}>Senior Developer</Text>
                    </View>

                    {/* Stats Section */}
                    <View style={styles.statsContainer}>
                        <StatCard icon={Award} label="Solved" value="124" color="#10b981" />
                        <StatCard icon={TrendingUp} label="Streak" value="12" color="#f59e0b" />
                        <StatCard icon={Clock} label="Hours" value="48" color="#4dabf7" />
                    </View>

                    {/* Details Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Personal Information</Text>

                        <View style={styles.infoCard}>
                            <View style={styles.infoRow}>
                                <View style={styles.iconContainer}>
                                    <User size={20} color="#6366f1" />
                                </View>
                                <View style={styles.infoContent}>
                                    <Text style={styles.label}>Full Name</Text>
                                    <Text style={styles.value}>{userData.name}</Text>
                                </View>
                            </View>

                            <View style={styles.divider} />

                            <View style={styles.infoRow}>
                                <View style={styles.iconContainer}>
                                    <Mail size={20} color="#6366f1" />
                                </View>
                                <View style={styles.infoContent}>
                                    <Text style={styles.label}>Email Address</Text>
                                    <Text style={styles.value}>{userData.email}</Text>
                                </View>
                            </View>

                            <View style={styles.divider} />

                            <View style={styles.infoRow}>
                                <View style={styles.iconContainer}>
                                    <Phone size={20} color="#6366f1" />
                                </View>
                                <View style={styles.infoContent}>
                                    <Text style={styles.label}>Phone Number</Text>
                                    <Text style={styles.value}>{userData.phone}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Actions */}
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <LogOut size={20} color="#ef4444" style={{ marginRight: 10 }} />
                        <Text style={styles.logoutText}>Log Out</Text>
                    </TouchableOpacity>
                </Animated.View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        backgroundColor: '#1e293b',
    },
    backButton: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    editButton: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    content: {
        padding: 20,
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#6366f1',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 4,
        borderColor: 'rgba(99, 102, 241, 0.3)',
        shadowColor: "#6366f1",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    onlineBadge: {
        position: 'absolute',
        bottom: 4,
        right: 4,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#10b981',
        borderWidth: 3,
        borderColor: '#0f172a',
    },
    avatarText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#fff',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#f8fafc',
        marginBottom: 4,
    },
    role: {
        fontSize: 16,
        color: '#94a3b8',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
        gap: 12,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#1e293b',
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#334155',
    },
    statIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    statValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 2,
    },
    statLabel: {
        fontSize: 12,
        color: '#94a3b8',
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#f8fafc',
        marginBottom: 16,
        marginLeft: 4,
    },
    infoCard: {
        backgroundColor: '#1e293b',
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: '#334155',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    infoContent: {
        flex: 1,
    },
    label: {
        fontSize: 12,
        color: '#94a3b8',
        marginBottom: 4,
    },
    value: {
        fontSize: 16,
        color: '#f8fafc',
        fontWeight: '500',
    },
    divider: {
        height: 1,
        backgroundColor: '#334155',
        marginVertical: 16,
        marginLeft: 56,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(239, 68, 68, 0.2)',
        marginBottom: 20,
    },
    logoutText: {
        color: '#ef4444',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
