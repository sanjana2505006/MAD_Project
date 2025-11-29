import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './src/screens/Dashboard';
import Login from './src/screens/Login';
import ProblemList from './src/screens/ProblemList';
import ProblemDetail from './src/screens/ProblemDetail';
import ProjectDetail from './src/screens/ProjectDetail';
import Notifications from './src/screens/Notifications';

import TabNavigator from './src/navigation/TabNavigator';
import Profile from './src/screens/Profile';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#121212' }
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen name="ProblemDetail" component={ProblemDetail} options={{ headerShown: true, title: 'Problem Detail' }} />
        <Stack.Screen name="ProjectDetail" component={ProjectDetail} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
});
