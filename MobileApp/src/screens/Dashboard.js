import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { Play, LogOut, Clock } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import ProjectCard from '../components/ProjectCard';
import { useFocusEffect } from '@react-navigation/native';

const Dashboard = ({ navigation }) => {
    const [loginHistory, setLoginHistory] = useState([]);

    const recentProjects = [
        { id: 1, title: 'Python Basics', language: 'Python' },
        { id: 2, title: 'React Native Demo', language: 'JavaScript' },
        { id: 3, title: 'Data Structures', language: 'C++' },
        { id: 4, title: 'Web Scraper', language: 'Python' },
    ];

    useFocusEffect(
        React.useCallback(() => {
            loadLoginHistory();
        }, [])
    );

    const loadLoginHistory = async () => {
        try {
            const history = await AsyncStorage.getItem('loginHistory');
            if (history) {
                setLoginHistory(JSON.parse(history));
            }
        } catch (error) {
            console.log('Error loading history:', error);
        }
    };

    const handleLogout = async () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Logout",
                    style: "destructive",
                    onPress: async () => {
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
                    }
                }
            ]
        );
    };

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
        });
    };

    return (
        <View style={styles.container}>
            <Header onLogout={handleLogout} />

            <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>

                {/* Start Coding Button */}
                <TouchableOpacity style={styles.startBtn}>
                    <View style={styles.startBtnIcon}>
                        <Play fill="#fff" color="#fff" size={24} />
                    </View>
                    <View>
                        <Text style={styles.startBtnText}>Start Coding</Text>
                        <Text style={styles.startBtnSubtext}>Practice new problems</Text>
                    </View>
                </TouchableOpacity>

                {/* Recent Projects Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Recent Projects</Text>
                    {recentProjects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            title={project.title}
                            language={project.language}
                        />
                    ))}
                </View>

                {/* Login History Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Clock size={20} color="#94a3b8" style={{ marginRight: 8 }} />
                        <Text style={styles.sectionTitle}>Login History</Text>
                    </View>

                    {loginHistory.length > 0 ? (
                        <View style={styles.historyList}>
                            {loginHistory.slice(0, 5).map((item, index) => (
                                <View key={index} style={styles.historyItem}>
                                    <View style={[
                                        styles.historyIndicator,
                                        { backgroundColor: item.type.includes('LOGIN') ? '#10b981' : '#ef4444' }
                                    ]} />
                                    <View style={styles.historyInfo}>
                                        <Text style={styles.historyType}>{item.type}</Text>
                                        <Text style={styles.historyDevice}>{item.deviceName}</Text>
                                    </View>
                                    <Text style={styles.historyTime}>{formatDate(item.timestamp)}</Text>
                                </View>
                            ))}
                        </View>
                    ) : (
                        <Text style={styles.emptyText}>No history available</Text>
                    )}
                </View>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    startBtn: {
        backgroundColor: '#4dabf7',
        borderRadius: 16,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
        shadowColor: '#4dabf7',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    startBtnIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    startBtnText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    startBtnSubtext: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
    },
    section: {
        marginBottom: 30,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    historyList: {
        backgroundColor: '#1e293b',
        borderRadius: 12,
        padding: 16,
    },
    historyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#334155',
    },
    historyIndicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 12,
    },
    historyInfo: {
        flex: 1,
    },
    historyType: {
        color: '#f8fafc',
        fontSize: 14,
        fontWeight: '600',
    },
    historyDevice: {
        color: '#94a3b8',
        fontSize: 12,
    },
    historyTime: {
        color: '#64748b',
        fontSize: 12,
    },
    emptyText: {
        color: '#64748b',
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 10,
    },
});

export default Dashboard;
