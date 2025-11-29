import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { ChevronLeft, Play, Save } from 'lucide-react-native';
import CodeEditor from '../components/CodeEditor';

const ProjectDetail = ({ route, navigation }) => {
    const { project } = route.params;
    const [code, setCode] = useState(`// ${project.title} - ${project.language}\n\nfunction main() {\n    console.log("Hello, World!");\n}\n\nmain();`);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeft color="#fff" size={24} />
                </TouchableOpacity>
                <Text style={styles.title}>{project.title}</Text>
                <View style={{ width: 40 }} />
            </View>

            <View style={styles.content}>
                <View style={styles.infoBar}>
                    <Text style={styles.language}>{project.language}</Text>
                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.actionButton}>
                            <Save color="#94a3b8" size={20} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.actionButton, styles.runButton]}>
                            <Play color="#fff" size={20} fill="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>

                <CodeEditor
                    code={code}
                    onChangeCode={setCode}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    backButton: {
        padding: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    infoBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    language: {
        color: '#4dabf7',
        fontSize: 16,
        fontWeight: '600',
    },
    actions: {
        flexDirection: 'row',
        gap: 12,
    },
    actionButton: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: '#1e1e1e',
        borderWidth: 1,
        borderColor: '#333',
    },
    runButton: {
        backgroundColor: '#10b981',
        borderColor: '#10b981',
    },
});

export default ProjectDetail;
