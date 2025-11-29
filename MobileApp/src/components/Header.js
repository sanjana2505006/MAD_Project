import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { User, LogOut } from 'lucide-react-native';

const Header = ({ onLogout, onProfilePress }) => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Hello, Coder!</Text>
                <Text style={styles.subtext}>Ready to code today?</Text>
            </View>
            <View style={styles.rightContainer}>
                <TouchableOpacity onPress={onProfilePress}>
                    <View style={styles.profileContainer}>
                        <User color="#fff" size={24} />
                    </View>
                </TouchableOpacity>
                {onLogout && (
                    <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
                        <LogOut color="#ef4444" size={24} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: '#1e1e1e',
        paddingTop: 50, // Add padding for status bar
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    subtext: {
        fontSize: 14,
        color: '#a0a0a0',
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    profileContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoutButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Header;
