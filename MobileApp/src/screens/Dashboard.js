import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Play } from 'lucide-react-native';
import Header from '../components/Header';
import ProjectCard from '../components/ProjectCard';

const Dashboard = () => {
    const recentProjects = [
        { id: 1, title: 'Python Basics', language: 'Python' },
        { id: 2, title: 'React Native Demo', language: 'JavaScript' },
        { id: 3, title: 'Data Structures', language: 'C++' },
        { id: 4, title: 'Web Scraper', language: 'Python' },
    ];

    return (
        <View style={styles.container}>
            <Header />
            <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>

                {/* Start Coding Button */}
                <TouchableOpacity style={styles.startBtn}>
                    <View style={styles.startBtnIcon}>
                        <Play fill="#fff" color="#fff" size={24} />
                    </View>
                    <View>
                        <Text style={styles.startBtnText}>Start Coding</Text>
                        <Text style={styles.startBtnSubtext}>Practice new problems</Text>
                    </View>
                </TouchableOpacity>

                {/* Recent Projects Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Recent Projects</Text>
                    {recentProjects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            title={project.title}
                            language={project.language}
                        />
                    ))}
                </View>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
    },
    startBtn: {
        backgroundColor: '#4dabf7',
        borderRadius: 16,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
        shadowColor: '#4dabf7',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    startBtnIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    startBtnText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    startBtnSubtext: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 16,
    },
});

export default Dashboard;
