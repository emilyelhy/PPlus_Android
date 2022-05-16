/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'react-native-gesture-handler';
import {
	SafeAreaView,
	StatusBar,
	useColorScheme,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LogBox } from "react-native";
import FlashMessage from "react-native-flash-message";

import WelcomePage from './src/Component/WelcomePage';
import ConnectionPage from './src/Component/ConnectionPage';
import ConfirmationPage from './src/Component/ConfirmationPage';
import TogglePage from './src/Component/TogglePage';
import CommunicationTest from './src/Component/CommunicationTest';

LogBox.ignoreLogs([
	"exported from 'deprecated-react-native-prop-types'.",
])

const App = () => {
	const isDarkMode = useColorScheme() === 'dark';

	const Stack = createStackNavigator();

	const backgroundStyle = {
		flex: 1,
		backgroundColor: "#DAE2E1",
	};

	return (
		<SafeAreaView style={backgroundStyle}>
			<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
			{/* <NavigationContainer>
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					<Stack.Screen name="Connections" component={ConnectionPage} />
					<Stack.Screen name="Welcome" component={WelcomePage} />
					<Stack.Screen name="Confirmation" component={ConfirmationPage} />
					<Stack.Screen name="Toggle" component={TogglePage} />
				</Stack.Navigator>
			</NavigationContainer> */}
			<CommunicationTest></CommunicationTest>
			<FlashMessage position="bottom" />
		</SafeAreaView>
	);
};

export default App;