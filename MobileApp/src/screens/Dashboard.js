import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform, ActivityIndicator, Dimensions } from 'react-native';
import { Play, LogOut, Clock, Zap, Award, TrendingUp } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header';
import ProjectCard from '../components/ProjectCard';
import ProblemCard from '../components/ProblemCard';
import { useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const Dashboard = ({ navigation }) => {
    const [loginHistory, setLoginHistory] = useState([]);
    const [recommendedProblems, setRecommendedProblems] = useState([]);
    const [loadingProblems, setLoadingProblems] = useState(true);

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

    useEffect(() => {
        fetchRecommendedProblems();
    }, []);

    const fetchRecommendedProblems = async () => {
        try {
            // Try to load from cache first
            const cachedProblems = await AsyncStorage.getItem('cachedRecommendedProblems');
            if (cachedProblems) {
                setRecommendedProblems(JSON.parse(cachedProblems));
                setLoadingProblems(false);
            }

            const query = `
        query {
          allQuestions {
            title
            titleSlug
            difficulty
            topicTags {
              name
            }
          }
        }
      `;
            const response = await axios.post('https://leetcode.com/graphql', { query });
            const questions = response.data.data.allQuestions.slice(0, 3); // Limit to 3 for dashboard
            const formattedProblems = questions.map((q, index) => ({
                id: index.toString(),
                title: q.title,
                category: q.topicTags.length > 0 ? q.topicTags[0].name : 'General',
                difficulty: q.difficulty,
                status: 'Unsolved',
                date: 'Recommended'
            }));

            setRecommendedProblems(formattedProblems);
            setLoadingProblems(false);

            // Update cache
            await AsyncStorage.setItem('cachedRecommendedProblems', JSON.stringify(formattedProblems));
        } catch (err) {
            console.error('Failed to fetch recommended problems', err);
            setLoadingProblems(false);
        }
    };

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
            <Header
                onLogout={handleLogout}
                onProfilePress={() => navigation.navigate('Profile')}
            />

            <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Start Coding Button */}
                <TouchableOpacity onPress={() => navigation.navigate('Problems')} activeOpacity={0.9}>
                    <LinearGradient
                        colors={['#4dabf7', '#3b82f6']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.startBtn}
                    >
                        <View style={styles.startBtnContent}>
                            <View style={styles.startBtnIcon}>
                                <Play fill="#4dabf7" color="#4dabf7" size={24} />
                            </View>
                            <View style={styles.startBtnTextContainer}>
                                <Text style={styles.startBtnText}>Start Coding</Text>
                                <Text style={styles.startBtnSubtext}>Practice new problems & improve skills</Text>
                            </View>
                            <View style={styles.arrowContainer}>
                                <Zap color="#fff" size={24} fill="#fff" />
                            </View>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>

                {/* Stats Row */}
                <View style={styles.statsRow}>
                    <View style={styles.statCard}>
                        <Award color="#f59e0b" size={24} />
                        <Text style={styles.statValue}>12</Text>
                        <Text style={styles.statLabel}>Solved</Text>
                    </View>
                    <View style={styles.statCard}>
                        <TrendingUp color="#10b981" size={24} />
                        <Text style={styles.statValue}>5</Text>
                        <Text style={styles.statLabel}>Streak</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Clock color="#8b5cf6" size={24} />
                        <Text style={styles.statValue}>2h</Text>
                        <Text style={styles.statLabel}>Today</Text>
                    </View>
                </View>

                {/* Recommended Problems Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Recommended for You</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAll}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    {loadingProblems && recommendedProblems.length === 0 ? (
                        <ActivityIndicator size="large" color="#4dabf7" style={{ marginVertical: 20 }} />
                    ) : (
                        recommendedProblems.map((problem) => (
                            <ProblemCard
                                key={problem.id}
                                {...problem}
                                onPress={() => navigation.navigate('ProblemDetail', { problem })}
                            />
                        ))
                    )}
                </View>

                {/* Recent Projects Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Recent Projects</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAll}>View All</Text>
                        </TouchableOpacity>
                    </View>
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
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Clock size={20} color="#94a3b8" style={{ marginRight: 8 }} />
                            <Text style={styles.sectionTitle}>Login History</Text>
                        </View>
                    </View>

                    <View style={styles.historyCard}>
                        {loginHistory.length > 0 ? (
                            <View style={styles.historyList}>
                                {loginHistory.slice(0, 5).map((item, index) => (
                                    <View key={index} style={[styles.historyItem, index === loginHistory.slice(0, 5).length - 1 && { borderBottomWidth: 0 }]}>
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
        borderRadius: 20,
        padding: 24,
        marginBottom: 24,
        shadowColor: '#4dabf7',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
        elevation: 8,
    },
    startBtnContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    startBtnIcon: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    startBtnTextContainer: {
        flex: 1,
    },
    startBtnText: {
        fontSize: 22,
        fontWeight: '800',
        color: '#fff',
        marginBottom: 4,
    },
    startBtnSubtext: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.9)',
        fontWeight: '500',
    },
    arrowContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32,
    },
    statCard: {
        backgroundColor: '#1e1e1e',
        borderRadius: 16,
        padding: 16,
        width: (width - 40 - 24) / 3,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#2a2a2a',
    },
    statValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 8,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#94a3b8',
    },
    section: {
        marginBottom: 32,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    seeAll: {
        color: '#4dabf7',
        fontSize: 14,
        fontWeight: '600',
    },
    historyCard: {
        backgroundColor: '#1e1e1e',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#2a2a2a',
    },
    historyList: {
        // Removed background color as it's now handled by historyCard
    },
    historyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    historyIndicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 12,
    },
    historyInfo: {
        flex: 1,
    },
    historyType: {
        color: '#f8fafc',
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 2,
    },
    historyDevice: {
        color: '#94a3b8',
        fontSize: 13,
    },
    historyTime: {
        color: '#64748b',
        fontSize: 13,
        fontWeight: '500',
    },
    emptyText: {
        color: '#64748b',
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 10,
    },
});

export default Dashboard;
