import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { Filter, Search, ChevronLeft } from 'lucide-react-native';
import ProblemCard from '../components/ProblemCard';

export default function ProblemList({ navigation }) {
    const [difficultyFilter, setDifficultyFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProblems();
    }, []);

    const fetchProblems = async () => {
        try {
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
            const questions = response.data.data.allQuestions.slice(0, 100); // Limit to first 100 for demo
            const formattedProblems = questions.map((q, index) => ({
                id: index.toString(),
                title: q.title,
                category: q.topicTags.length > 0 ? q.topicTags[0].name : 'General',
                difficulty: q.difficulty,
                status: 'Unsolved', // Default status since API doesn't provide user status
                date: 'not started'
            }));
            setProblems(formattedProblems);
        } catch (err) {
            setError('Failed to fetch problems from LeetCode');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const filteredProblems = problems.filter(problem => {
        if (selectedCategory && problem.category.toLowerCase() !== selectedCategory) return false;
        if (difficultyFilter !== 'all' && problem.difficulty.toLowerCase() !== difficultyFilter) return false;
        if (statusFilter !== 'all' && problem.status.toLowerCase() !== statusFilter) return false;
        return true;
    });

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.headerTop}>
                    <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={styles.backButton}>
                        <ChevronLeft color="#fff" size={24} />
                    </TouchableOpacity>
                    <Text style={styles.header}>Problems</Text>
                </View>
                <Text style={styles.subHeader}>Practice coding problems by category and difficulty</Text>
            </View>

            <View style={styles.filtersContainer}>
                <View style={styles.pickerWrapper}>
                    <Picker
                        selectedValue={difficultyFilter}
                        style={styles.picker}
                        dropdownIconColor="#fff"
                        onValueChange={(itemValue) => setDifficultyFilter(itemValue)}
                    >
                        <Picker.Item label="All Levels" value="all" color="#fff" />
                        <Picker.Item label="Easy" value="easy" color="#fff" />
                        <Picker.Item label="Medium" value="medium" color="#fff" />
                        <Picker.Item label="Hard" value="hard" color="#fff" />
                    </Picker>
                </View>

                <View style={styles.pickerWrapper}>
                    <Picker
                        selectedValue={statusFilter}
                        style={styles.picker}
                        dropdownIconColor="#fff"
                        onValueChange={(itemValue) => setStatusFilter(itemValue)}
                    >
                        <Picker.Item label="All Status" value="all" color="#fff" />
                        <Picker.Item label="Solved" value="solved" color="#fff" />
                        <Picker.Item label="Attempting" value="attempting" color="#fff" />
                        <Picker.Item label="Unsolved" value="unsolved" color="#fff" />
                    </Picker>
                </View>
            </View>

            {loading ? (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color="#4dabf7" />
                </View>
            ) : (
                <FlatList
                    data={filteredProblems}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <ProblemCard
                            {...item}
                            onPress={() => navigation.navigate('ProblemDetail', { problem: item })}
                        />
                    )}
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                    windowSize={5}
                    removeClippedSubviews={true}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Filter color="#64748b" size={48} />
                            <Text style={styles.noResults}>No problems found matching your filters.</Text>
                        </View>
                    }
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    headerContainer: {
        padding: 20,
        paddingTop: 60,
        backgroundColor: '#1e293b',
        borderBottomWidth: 1,
        borderBottomColor: '#334155',
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    backButton: {
        marginRight: 12,
        padding: 4,
        borderRadius: 8,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
    },
    subHeader: {
        fontSize: 14,
        color: '#94a3b8',
    },
    filtersContainer: {
        flexDirection: 'row',
        padding: 16,
        gap: 12,
    },
    pickerWrapper: {
        flex: 1,
        backgroundColor: '#1e1e1e',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#333',
        overflow: 'hidden',
        height: 50,
        justifyContent: 'center',
    },
    picker: {
        color: '#fff',
        marginLeft: -8, // Adjust for default picker padding
    },
    listContent: {
        padding: 16,
        paddingTop: 0,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 60,
    },
    noResults: {
        textAlign: 'center',
        marginTop: 16,
        fontSize: 16,
        color: '#64748b',
    },
    error: {
        color: '#ef4444',
        fontSize: 16,
        textAlign: 'center',
    }
});
