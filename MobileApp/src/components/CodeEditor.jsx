import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

export default function CodeEditor({ code, onChangeCode }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>JavaScript Editor</Text>
            </View>
            <TextInput
                style={styles.input}
                multiline
                value={code}
                onChangeText={onChangeCode}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="// Write your solution here..."
                placeholderTextColor="#6b7280"
                textAlignVertical="top"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#1f2937',
        height: 300,
    },
    header: {
        backgroundColor: '#374151',
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#4b5563',
    },
    headerText: {
        color: '#d1d5db',
        fontSize: 12,
        fontWeight: 'bold',
    },
    input: {
        flex: 1,
        padding: 12,
        color: '#f3f4f6',
        fontFamily: 'monospace',
        fontSize: 14,
        lineHeight: 20,
    },
});
