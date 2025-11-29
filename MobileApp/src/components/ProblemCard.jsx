import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const getDifficultyColor = (diff) => {
    switch (diff.toLowerCase()) {
        case 'easy':
            return '#10b981';
        case 'medium':
            return '#f59e0b';
        case 'hard':
            return '#ef4444';
        default:
            return '#6b7280';
    }
};

const getStatusTextStyle = (status) => {
    switch (status.toLowerCase()) {
        case 'solved':
            return { color: '#10b981' };
        case 'attempting':
            return { color: '#f59e0b' };
        case 'unsolved':
            return { color: '#ef4444' };
        default:
            return { color: '#6b7280' };
    }
};

function ProblemCard({ title, category, difficulty, status, date, onPress }) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
            <View style={styles.header}>
                <Text style={[styles.difficulty, { borderColor: getDifficultyColor(difficulty), color: getDifficultyColor(difficulty) }]}>
                    {difficulty}
                </Text>
                <Text style={[styles.status, getStatusTextStyle(status)]}>{status}</Text>
            </View>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.meta}>
                <Text style={styles.category}>{category}</Text>
                <Text style={styles.date}>{date}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default React.memo(ProblemCard);

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#1e1e1e',
        padding: 16,
        marginBottom: 12,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#2a2a2a',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    difficulty: {
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 4,
        fontWeight: '600',
        fontSize: 12,
        textTransform: 'capitalize',
    },
    status: {
        fontWeight: '600',
        fontSize: 12,
        textTransform: 'capitalize',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    meta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    category: {
        fontSize: 13,
        color: '#94a3b8',
    },
    date: {
        fontSize: 13,
        color: '#64748b',
    },
});
