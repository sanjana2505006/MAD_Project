import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Search, ChevronLeft } from 'lucide-react-native';
import ProjectCard from '../components/ProjectCard';

export default function ProjectList({ navigation }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('All');

    const projects = [
        { id: '1', title: 'E-commerce App', language: 'React Native', progress: 75 },
        { id: '2', title: 'Portfolio Website', language: 'React', progress: 100 },
        { id: '3', title: 'Task Manager', language: 'Node.js', progress: 45 },
        { id: '4', title: 'Weather App', language: 'Swift', progress: 90 },
        { id: '5', title: 'Chat Application', language: 'Socket.io', progress: 60 },
        { id: '6', title: 'Blog Platform', language: 'Next.js', progress: 30 },
        { id: '7', title: 'Expense Tracker', language: 'React Native', progress: 80 },
        { id: '8', title: 'Game Engine', language: 'C++', progress: 15 },
    ];

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesLanguage = selectedLanguage === 'All' || project.language === selectedLanguage;
        return matchesSearch && matchesLanguage;
    });

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeft color="#fff" size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Projects</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.searchContainer}>
                <Search color="#94a3b8" size={20} style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search projects..."
                    placeholderTextColor="#64748b"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            <View style={styles.filterContainer}>
                {['All', 'React Native', 'React', 'Node.js'].map((lang) => (
                    <TouchableOpacity
                        key={lang}
                        style={[
                            styles.filterChip,
                            selectedLanguage === lang && styles.activeFilterChip
                        ]}
                        onPress={() => setSelectedLanguage(lang)}
                    >
                        <Text style={[
                            styles.filterText,
                            selectedLanguage === lang && styles.activeFilterText
                        ]}>
                            {lang}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <FlatList
                data={filteredProjects}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ProjectCard
                        title={item.title}
                        language={item.language}
                        progress={item.progress}
                        onPress={() => navigation.navigate('ProjectDetail', { project: item })}
                    />
                )}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
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
