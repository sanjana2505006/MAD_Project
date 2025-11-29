import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { Search, Filter, ChevronLeft } from 'lucide-react-native';
import axios from 'axios';
import ProblemCard from '../components/ProblemCard';

export default function ProblemList({ navigation }) {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('All');

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
            const questions = response.data.data.allQuestions.slice(0, 20);
            const formattedProblems = questions.map((q, index) => ({
                id: index.toString(),
                title: q.title,
                category: q.topicTags.length > 0 ? q.topicTags[0].name : 'General',
                difficulty: q.difficulty,
                status: 'Unsolved', // Default status
                date: 'Just now'
            }));
            setProblems(formattedProblems);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const filteredProblems = problems.filter(problem => {
        const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDifficulty = selectedDifficulty === 'All' || problem.difficulty === selectedDifficulty;
        return matchesSearch && matchesDifficulty;
    });

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeft color="#fff" size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Problems</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.searchContainer}>
                <Search color="#94a3b8" size={20} style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search problems..."
                    placeholderTextColor="#64748b"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            <View style={styles.filterContainer}>
                {['All', 'Easy', 'Medium', 'Hard'].map((difficulty) => (
                    <TouchableOpacity
                        key={difficulty}
                        style={[
                            styles.filterChip,
                            selectedDifficulty === difficulty && styles.activeFilterChip
                        ]}
                        onPress={() => setSelectedDifficulty(difficulty)}
                    >
                        <Text style={[
                            styles.filterText,
                            selectedDifficulty === difficulty && styles.activeFilterText
                        ]}>
                            {difficulty}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#6366f1" style={{ marginTop: 40 }} />
            ) : (
                <FlatList
                    data={filteredProblems}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <ProblemCard
                            {...item}
                            onPress={() => navigation.navigate('ProblemDetail', { problem: item })}
                        />
                    )}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a',
        paddingTop: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    backButton: {
        padding: 8,
        marginLeft: -8,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#f8fafc',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1e293b',
        marginHorizontal: 20,
        borderRadius: 12,
        paddingHorizontal: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#334155',
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        paddingVertical: 12,
        color: '#fff',
        fontSize: 16,
    },
    filterContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 20,
        gap: 8,
    },
    filterChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#1e293b',
        borderWidth: 1,
        borderColor: '#334155',
    },
    activeFilterChip: {
        backgroundColor: '#6366f1',
        borderColor: '#6366f1',
    },
    filterText: {
        color: '#94a3b8',
        fontWeight: '500',
    },
    activeFilterText: {
        color: '#fff',
        fontWeight: '600',
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
});
