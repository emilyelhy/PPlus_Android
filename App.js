/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import {
	SafeAreaView,
	StatusBar,
	useColorScheme,
	View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LogBox } from "react-native";

import WelcomePage from './src/Component/WelcomePage';
import ConnectionPage from './src/Component/ConnectionPage';
// import { connections } from './src/Connection.json';
import { fs } from './src/connectionHandler';

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

	const path = fs.DocumentDirectoryPath + '/Connection.json';
	const [existData, setExistData] = useState(false);
	const [connections, setConnections] = useState([]);
	useEffect(() => {
        fs.readFile(path)
            .then((res) => {
                // console.log(res);
				setConnections(JSON.parse(res));
                if(connections.length > 0) setExistData(true);
				else setExistData(false);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [connections]);


	return (
		<SafeAreaView style={backgroundStyle}>
			<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
			<NavigationContainer>
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					{existData
						? <Stack.Screen name="Connections" component={ConnectionPage} />
						: <Stack.Screen name="Welcome" component={WelcomePage} />
					}
				</Stack.Navigator>
			</NavigationContainer>
			{/* <WelcomePage></WelcomePage> */}

		</SafeAreaView>
	);
};

export default App;