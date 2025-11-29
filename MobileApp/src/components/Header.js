import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { User, LogOut, Bell } from 'lucide-react-native';

const Header = ({ onLogout, onProfilePress, onNotificationsPress }) => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Hello, Coder! 👋</Text>
                <Text style={styles.subtext}>Let's solve some problems today</Text>
            </View>
            <View style={styles.rightContainer}>
                <TouchableOpacity style={styles.iconButton} onPress={onNotificationsPress}>
                    <Bell color="#fff" size={24} />
                    <View style={styles.badge} />
                </TouchableOpacity>
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
        backgroundColor: '#121212', // Match main background
        paddingTop: 60, // Add padding for status bar
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 4,
    },
    subtext: {
        fontSize: 14,
        color: '#94a3b8',
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 4,
    },
    badge: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ef4444',
        borderWidth: 1,
        borderColor: '#121212',
    },
    profileContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#4dabf7',
    },
    logoutButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Header;
