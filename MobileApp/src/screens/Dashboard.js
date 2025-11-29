import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Bell, Code, Play, Clock, ChevronRight, Grid, Award, TrendingUp } from 'lucide-react-native';
import Header from '../components/Header';
import ProjectCard from '../components/ProjectCard';
import ProblemCard from '../components/ProblemCard';

export default function Dashboard({ navigation }) {
    const [userName, setUserName] = useState('Developer');
    const [loginHistory, setLoginHistory] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const name = await AsyncStorage.getItem('userName');
            if (name) setUserName(name);

            const history = await AsyncStorage.getItem('loginHistory');
            if (history) {
                setLoginHistory(JSON.parse(history));
            }
        } catch (error) {
            console.log('Error loading data:', error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <View style={styles.container}>
            <Header
                userName={userName}
                onProfilePress={() => navigation.navigate('Profile')}
                onNotificationsPress={() => navigation.navigate('Notifications')}
            />

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {/* Stats Row */}
                <View style={styles.statsRow}>
                    <View style={[styles.statCard, { backgroundColor: '#1e293b' }]}>
                        <Award color="#10b981" size={24} style={{ marginBottom: 8 }} />
                        <Text style={styles.statValue}>124</Text>
                        <Text style={styles.statLabel}>Solved</Text>
                    </View>
                    <View style={[styles.statCard, { backgroundColor: '#1e293b' }]}>
                        <TrendingUp color="#f59e0b" size={24} style={{ marginBottom: 8 }} />
                        <Text style={styles.statValue}>12</Text>
                        <Text style={styles.statLabel}>Streak</Text>
                    </View>
                    <View style={[styles.statCard, { backgroundColor: '#1e293b' }]}>
                        <Clock color="#4dabf7" size={24} style={{ marginBottom: 8 }} />
                        <Text style={styles.statValue}>48h</Text>
                        <Text style={styles.statLabel}>Time</Text>
                    </View>
                </View>

                {/* Start Coding Section */}
                <View style={styles.section}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => navigation.navigate('Problems')}
                    >
                        <LinearGradient
                            colors={['#6366f1', '#4f46e5']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.startBtn}
                        >
                            <View style={styles.startBtnIcon}>
                                <Play fill="#fff" color="#fff" size={24} />
                            </View>
                            <View>
                                <Text style={styles.startBtnText}>Start Coding</Text>
                                <Text style={styles.startBtnSubtext}>Practice new problems</Text>
                            </View>
                            <ChevronRight color="#fff" size={24} style={{ marginLeft: 'auto' }} />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                {/* Recommended Problems */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Recommended for you</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Problems')}>
                            <Text style={styles.seeAll}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    <ProblemCard
                        title="Two Sum"
                        category="Array"
                        difficulty="Easy"
                        status="Solved"
                        date="2 days ago"
                    />
                    <ProblemCard
                        title="Add Two Numbers"
                        category="Linked List"
                        difficulty="Medium"
                        status="Attempting"
                        date="5 hours ago"
                    />
                </View>

                {/* Recent Projects */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Recent Projects</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('ProjectList')}>
                            <Text style={styles.seeAll}>View All</Text>
                        </TouchableOpacity>
                    </View>
                    <ProjectCard
                        title="E-commerce App"
                        language="React Native"
                        progress={75}
                        onPress={() => navigation.navigate('ProjectDetail', {
                            project: { title: 'E-commerce App', language: 'React Native' }
                        })}
                    />
                </View>

                {/* Login History */}
                <View style={[styles.section, { marginBottom: 100 }]}>
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a',
    },
    content: {
        padding: 20,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
        gap: 12,
    },
    statCard: {
        flex: 1,
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#334155',
    },
    statValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#94a3b8',
    },
    section: {
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#f8fafc',
    },
    seeAll: {
        color: '#6366f1',
        fontSize: 14,
        fontWeight: '600',
    },
    startBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderRadius: 16,
        shadowColor: '#6366f1',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
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
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 4,
    },
    startBtnSubtext: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
    },
    historyList: {
        backgroundColor: '#1e293b',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#334155',
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
        fontSize: 14,
        fontWeight: '600',
        color: '#f8fafc',
        marginBottom: 2,
    },
    historyDevice: {
        fontSize: 12,
        color: '#94a3b8',
    },
    historyTime: {
        fontSize: 12,
        color: '#64748b',
    },
    emptyText: {
        color: '#94a3b8',
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 8,
    },
});
