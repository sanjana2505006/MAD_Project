import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Code, ChevronRight } from 'lucide-react-native';

const ProjectCard = ({ title, language, progress }) => {
    return (
        <TouchableOpacity style={styles.card}>
            <View style={styles.iconContainer}>
                <Code color="#4dabf7" size={24} />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.language}>{language}</Text>
            </View>
            <View style={styles.arrowContainer}>
                <ChevronRight color="#a0a0a0" size={20} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#252525',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#333',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 8,
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
        color: '#a0a0a0',
    },
    arrowContainer: {
        justifyContent: 'center',
    },
});

export default ProjectCard;
