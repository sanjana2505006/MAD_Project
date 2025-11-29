import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Code, ChevronRight } from 'lucide-react-native';

const ProjectCard = ({ title, language, progress }) => {
    return (
        <TouchableOpacity style={styles.card} activeOpacity={0.7}>
            <View style={styles.iconContainer}>
                <Code color="#4dabf7" size={24} />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.language}>{language}</Text>
            </View>
            <View style={styles.arrowContainer}>
                <ChevronRight color="#64748b" size={20} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1e1e1e',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#2a2a2a',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: 'rgba(77, 171, 247, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    infoContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 4,
    },
    language: {
        fontSize: 14,
        color: '#94a3b8',
    },
    arrowContainer: {
        justifyContent: 'center',
    },
});

export default ProjectCard;
