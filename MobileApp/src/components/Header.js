import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { User } from 'lucide-react-native';

const Header = () => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Hello, Coder!</Text>
                <Text style={styles.subtext}>Ready to code today?</Text>
            </View>
            <View style={styles.profileContainer}>
                <User color="#fff" size={24} />
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
    profileContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Header;
