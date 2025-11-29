import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Alert,
    ScrollView,
    Animated,
    Dimensions,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from "@expo/vector-icons";
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

export default function Login({ navigation }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [savedUser, setSavedUser] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null);

    // Animation values
    const fadeAnim = useState(new Animated.Value(0))[0];
    const slideAnim = useState(new Animated.Value(50))[0];
    const scaleAnim = useState(new Animated.Value(0.8))[0];

    useEffect(() => {
        loadUserData();
        startAnimations();
    }, []);

    const startAnimations = () => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            })
        ]).start();
    };

    const loadUserData = async () => {
        try {
            const savedName = await AsyncStorage.getItem('userName');
            const savedEmail = await AsyncStorage.getItem('userEmail');
            const savedPhone = await AsyncStorage.getItem('userPhone');

            if (savedName && savedEmail && savedPhone) {
                setSavedUser({
                    name: savedName,
                    email: savedEmail,
                    phone: savedPhone
                });
            }
        } catch (error) {
            console.log('Error loading user data:', error);
        }
    };

    const fillSavedData = () => {
        if (savedUser) {
            setName(savedUser.name);
            setEmail(savedUser.email);
            setPhone(savedUser.phone);
        }
    };

    const saveUserData = async () => {
        try {
            await AsyncStorage.setItem('userName', name);
            await AsyncStorage.setItem('userEmail', email);
            await AsyncStorage.setItem('userPhone', phone);
        } catch (error) {
            console.log('Error saving user data:', error);
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone.replace(/\D/g, ''));
    };

    const handleLogin = async () => {
        // Validation
        if (!validateEmail(email)) {
            Alert.alert("Invalid Email", "Please enter a valid email address");
            return;
        }

        if (!validatePhone(phone)) {
            Alert.alert("Invalid Phone", "Please enter a valid 10-digit phone number");
            return;
        }

        if (name.trim().length < 2) {
            Alert.alert("Invalid Name", "Please enter a valid name (at least 2 characters)");
            return;
        }

        setLoading(true);

        try {
            await saveUserData();

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Record Login Event
            const historyItem = {
                type: 'LOGIN',
                timestamp: new Date().toISOString(),
                deviceName: Platform.OS === 'ios' ? 'iPhone' : 'Android' // Simple device info
            };

            const existingHistory = await AsyncStorage.getItem('loginHistory');
            const history = existingHistory ? JSON.parse(existingHistory) : [];
            history.unshift(historyItem); // Add to beginning
            await AsyncStorage.setItem('loginHistory', JSON.stringify(history));

            Alert.alert("Success", "Account created successfully!", [
                {
                    text: "Get Started",
                    onPress: () => navigation.replace('MainTabs')
                }
            ]);
        } catch (e) {
            console.error("Save failed", e);
            Alert.alert("Error", "Something went wrong. Please try again.");
        }

        setLoading(false);
    };

    const InputField = ({ icon, placeholder, value, onChangeText, keyboardType = "default", maxLength, type }) => (
        <TouchableOpacity
            style={[
                styles.inputWrapper,
                focusedInput === type && styles.inputWrapperFocused
            ]}
            activeOpacity={1}
        >
            <View style={styles.inputIconContainer}>
                <Ionicons
                    name={icon}
                    size={22}
                    color={focusedInput === type ? "#6366f1" : "#94a3b8"}
                />
            </View>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="#94a3b8"
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                maxLength={maxLength}
                onFocus={() => setFocusedInput(type)}
                onBlur={() => setFocusedInput(null)}
                autoCapitalize={type === 'email' ? 'none' : 'words'}
            />
            {value.length > 0 && (
                <TouchableOpacity
                    style={styles.clearButton}
                    onPress={() => {
                        if (type === 'name') setName("");
                        if (type === 'email') setEmail("");
                        if (type === 'phone') setPhone("");
                    }}
                >
                    <Ionicons name="close-circle" size={18} color="#94a3b8" />
                </TouchableOpacity>
            )}
        </TouchableOpacity>
    );

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            {/* Animated Background */}
            <View style={styles.background}>
                <View style={[styles.backgroundShape, styles.shape1]} />
                <View style={[styles.backgroundShape, styles.shape2]} />
                <View style={[styles.backgroundShape, styles.shape3]} />
                <View style={[styles.backgroundShape, styles.shape4]} />
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Animated.View
                    style={[
                        styles.content,
                        {
                            opacity: fadeAnim,
                            transform: [
                                { translateY: slideAnim },
                                { scale: scaleAnim }
                            ]
                        }
                    ]}
                >
                    {/* Header Section */}
                    <View style={styles.header}>
                        <View style={styles.animationContainer}>
                            <LottieView
                                source={require('../../assets/animations/coding.json')} // Add your animation file
                                autoPlay
                                loop
                                style={styles.lottieAnimation}
                            />
                        </View>

                        <Text style={styles.title}>Start Your Coding Journey</Text>
                        <Text style={styles.subtitle}>
                            Join thousands of developers improving their skills daily
                        </Text>

                        {savedUser && (
                            <TouchableOpacity
                                style={styles.quickFillButton}
                                onPress={fillSavedData}
                            >
                                <View style={styles.quickFillContent}>
                                    <Ionicons name="refresh" size={18} color="#6366f1" />
                                    <Text style={styles.quickFillText}>
                                        Continue as {savedUser.name}
                                    </Text>
                                </View>
                                <Ionicons name="chevron-forward" size={16} color="#6366f1" />
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* Form Section */}
                    <View style={styles.formContainer}>
                        <Text style={styles.formTitle}>Create Account</Text>

                        <InputField
                            icon="person-outline"
                            placeholder="Full Name"
                            value={name}
                            onChangeText={setName}
                            type="name"
                        />

                        <InputField
                            icon="mail-outline"
                            placeholder="Email Address"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            type="email"
                        />

                        <InputField
                            icon="call-outline"
                            placeholder="Phone Number"
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="phone-pad"
                            maxLength={10}
                            type="phone"
                        />

                        <View style={styles.validationInfo}>
                            <Text style={styles.validationText}>
                                ✓ 10-digit phone number required
                            </Text>
                            <Text style={styles.validationText}>
                                ✓ Valid email format required
                            </Text>
                        </View>
                    </View>

                    {/* Action Section */}
                    <View style={styles.actionContainer}>
                        <TouchableOpacity
                            style={[
                                styles.loginButton,
                                loading && styles.loginButtonDisabled,
                                (!name || !email || !phone) && styles.loginButtonIncomplete
                            ]}
                            onPress={handleLogin}
                            disabled={loading || !name || !email || !phone}
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" size="small" />
                            ) : (
                                <View style={styles.buttonContent}>
                                    <Text style={styles.loginButtonText}>
                                        Create Account
                                    </Text>
                                    <Ionicons name="arrow-forward" size={20} color="#fff" />
                                </View>
                            )}
                        </TouchableOpacity>

                        <View style={styles.divider}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerText}>or</Text>
                            <View style={styles.dividerLine} />
                        </View>

                        <TouchableOpacity
                            style={styles.guestButton}
                            onPress={async () => {
                                // Record Guest Login
                                const historyItem = {
                                    type: 'LOGIN (Guest)',
                                    timestamp: new Date().toISOString(),
                                    deviceName: Platform.OS === 'ios' ? 'iPhone' : 'Android'
                                };
                                const existingHistory = await AsyncStorage.getItem('loginHistory');
                                const history = existingHistory ? JSON.parse(existingHistory) : [];
                                history.unshift(historyItem);
                                await AsyncStorage.setItem('loginHistory', JSON.stringify(history));

                                navigation.replace('MainTabs');
                            }}
                        >
                            <Text style={styles.guestButtonText}>
                                Continue as Guest
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>
                            By creating an account, you agree to our{' '}
                            <Text style={styles.link}>Terms</Text> and{' '}
                            <Text style={styles.link}>Privacy Policy</Text>
                        </Text>

                        <View style={styles.loginPrompt}>
                            <Text style={styles.loginPromptText}>
                                Already have an account?{' '}
                            </Text>
                            <TouchableOpacity>
                                <Text style={styles.loginLink}>Sign In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animated.View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0f172a",
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    backgroundShape: {
        position: 'absolute',
        borderRadius: 50,
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
    },
    shape1: {
        width: 300,
        height: 300,
        top: -150,
        right: -100,
    },
    shape2: {
        width: 200,
        height: 200,
        bottom: -50,
        left: -50,
        backgroundColor: 'rgba(99, 102, 241, 0.08)',
    },
    shape3: {
        width: 150,
        height: 150,
        top: '30%',
        left: -50,
        backgroundColor: 'rgba(99, 102, 241, 0.05)',
    },
    shape4: {
        width: 100,
        height: 100,
        bottom: '20%',
        right: -30,
        backgroundColor: 'rgba(99, 102, 241, 0.06)',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    content: {
        padding: 24,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    animationContainer: {
        width: 120,
        height: 120,
        marginBottom: 20,
    },
    lottieAnimation: {
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#f8fafc',
        textAlign: 'center',
        marginBottom: 12,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 16,
        color: '#94a3b8',
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 20,
    },
    quickFillButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 16,
        marginTop: 20,
        borderWidth: 1,
        borderColor: 'rgba(99, 102, 241, 0.2)',
        width: '100%',
        maxWidth: 280,
    },
    quickFillContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quickFillText: {
        color: '#6366f1',
        fontWeight: '600',
        fontSize: 15,
        marginLeft: 8,
    },
    formContainer: {
        marginBottom: 30,
    },
    formTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#f8fafc',
        marginBottom: 24,
        textAlign: 'center',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 16,
        marginBottom: 16,
        paddingHorizontal: 16,
        borderWidth: 2,
        borderColor: 'transparent',
        height: 60,
    },
    inputWrapperFocused: {
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.05)',
    },
    inputIconContainer: {
        width: 24,
        alignItems: 'center',
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#f8fafc',
        fontWeight: '500',
    },
    clearButton: {
        padding: 4,
    },
    validationInfo: {
        marginTop: 8,
        paddingHorizontal: 8,
    },
    validationText: {
        fontSize: 12,
        color: '#64748b',
        marginBottom: 4,
    },
    actionContainer: {
        marginBottom: 30,
    },
    loginButton: {
        backgroundColor: "#6366f1",
        padding: 20,
        borderRadius: 16,
        alignItems: "center",
        marginBottom: 20,
        shadowColor: "#6366f1",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 8,
    },
    loginButtonDisabled: {
        opacity: 0.7,
    },
    loginButtonIncomplete: {
        opacity: 0.5,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    loginButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "700",
        marginRight: 8,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#334155',
    },
    dividerText: {
        color: '#64748b',
        paddingHorizontal: 16,
        fontSize: 14,
        fontWeight: '600',
    },
    guestButton: {
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#334155',
    },
    guestButtonText: {
        color: '#94a3b8',
        fontSize: 16,
        fontWeight: '600',
    },
    footer: {
        alignItems: "center",
    },
    footerText: {
        fontSize: 13,
        color: "#64748b",
        textAlign: "center",
        lineHeight: 20,
        marginBottom: 16,
    },
    link: {
        color: "#6366f1",
        fontWeight: "600",
    },
    loginPrompt: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    loginPromptText: {
        color: '#64748b',
        fontSize: 14,
    },
    loginLink: {
        color: '#6366f1',
        fontWeight: '600',
        fontSize: 14,
    },
});
