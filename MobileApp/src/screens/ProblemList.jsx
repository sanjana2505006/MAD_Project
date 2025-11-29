import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
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
            <Text style={styles.header}>Problems</Text>
            <Text style={styles.subHeader}>Practice coding problems by category and difficulty</Text>

            <View style={styles.filters}>
                <Picker
                    selectedValue={difficultyFilter}
                    style={styles.picker}
                    onValueChange={(itemValue) => setDifficultyFilter(itemValue)}
                >
                    <Picker.Item label="All Levels" value="all" />
                    <Picker.Item label="Easy" value="easy" />
                    <Picker.Item label="Medium" value="medium" />
                    <Picker.Item label="Hard" value="hard" />
                </Picker>

                <Picker
                    selectedValue={statusFilter}
                    style={styles.picker}
                    onValueChange={(itemValue) => setStatusFilter(itemValue)}
                >
                    <Picker.Item label="All Status" value="all" />
                    <Picker.Item label="Solved" value="solved" />
                    <Picker.Item label="Attempting" value="attempting" />
                    <Picker.Item label="Unsolved" value="unsolved" />
                </Picker>
            </View>

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
                ListEmptyComponent={<Text style={styles.noResults}>No problems found matching your filters.</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 16, flex: 1, backgroundColor: '#f3f4f6' },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
    subHeader: { fontSize: 14, color: 'gray', marginBottom: 12 },
    filters: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
    picker: { height: 50, flex: 1 },
    noResults: { textAlign: 'center', marginTop: 20, fontSize: 16, color: 'gray' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    error: { color: 'red', fontSize: 16, textAlign: 'center' }
});
