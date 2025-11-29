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
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={styles.header}>
                <Text style={[styles.difficulty, { borderColor: getDifficultyColor(difficulty) }]}>
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
        backgroundColor: 'white',
        padding: 12,
        marginBottom: 12,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    difficulty: {
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 2,
        fontWeight: 'bold',
        fontSize: 12,
    },
    status: {
        fontWeight: 'bold',
        fontSize: 12,
        textTransform: 'capitalize',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    meta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    category: {
        fontSize: 14,
        color: '#6b7280',
    },
    date: {
        fontSize: 14,
        color: '#6b7280',
    },
});
