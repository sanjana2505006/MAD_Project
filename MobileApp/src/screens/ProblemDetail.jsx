import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import CodeEditor from '../components/CodeEditor';

export default function ProblemDetail({ route }) {
    const { problem } = route.params;
    const [code, setCode] = useState('');
    const [result, setResult] = useState(null);

    const handleRunCode = () => {
        // Simulate code execution
        setResult('Running...');
        setTimeout(() => {
            // Simple mock check
            if (code.length > 10) {
                setResult('Success: All test cases passed! (Mock)');
            } else {
                setResult('Error: Syntax error or incorrect logic. (Mock)');
            }
        }, 1000);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{problem.title}</Text>
                <View style={styles.badges}>
                    <Text style={[styles.badge, styles[problem.difficulty.toLowerCase()]]}>
                        {problem.difficulty}
                    </Text>
                    <Text style={styles.category}>{problem.category}</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.description}>
                    This is a placeholder description for {problem.title}.
                    In a real app, this would fetch the full problem description from the API.
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Solution</Text>
                <CodeEditor code={code} onChangeCode={setCode} />
            </View>

            <TouchableOpacity style={styles.runButton} onPress={handleRunCode}>
                <Text style={styles.runButtonText}>Run Code</Text>
            </TouchableOpacity>

            {result && (
                <View style={[styles.result, result.startsWith('Success') ? styles.success : styles.error]}>
                    <Text style={styles.resultText}>{result}</Text>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    header: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    badges: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginRight: 8,
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white',
    },
    easy: { backgroundColor: '#10b981' },
    medium: { backgroundColor: '#f59e0b' },
    hard: { backgroundColor: '#ef4444' },
    category: {
        color: '#6b7280',
        fontSize: 14,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#374151',
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#4b5563',
    },
    runButton: {
        backgroundColor: '#2563eb',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 24,
    },
    runButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    result: {
        padding: 16,
        borderRadius: 8,
        marginBottom: 40,
    },
    success: {
        backgroundColor: '#d1fae5',
    },
    error: {
        backgroundColor: '#fee2e2',
    },
    resultText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#1f2937',
    },
});
