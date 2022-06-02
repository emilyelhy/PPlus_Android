/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
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
import DeviceInfo from 'react-native-device-info';

import WelcomePage from './src/Component/WelcomePage';
import ConnectionPage from './src/Component/ConnectionPage';
import ConfirmationPage from './src/Component/ConfirmationPage';
import TogglePage from './src/Component/TogglePage';
import CameraSettingPage from './src/Component/CameraSettingPage';
import MicrophoneSettingPage from './src/Component/MicrophoneSettingPage';
import SpeakerSettingPage from './src/Component/SpeakerSettingPage';
import CommunicationTest from './src/Component/CommunicationTest';
import { SettingContext } from './src/contextHandler';

const SIGNALING_URL = "ws://192.168.0.106:8886";

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

	// context for camera setting
	const [resoValue, setResoValue] = useState(1080);
    const [FPSValue, setFPSValue] = useState(30);
    const [zoom, setZoom] = useState(1.0);
    const [cameraPosition, setCameraPosition] = useState("back");

	// context for microphone setting
	const [sensitivity, setSensitivity] = useState(0.0);
	const [micBuffer, setMicBuffer] = useState(0.0);
    const [noise, setNoise] = useState(false);

	// context for speaker setting
    const [volume, setVolume] = useState(0.0);
    const [speakerBuffer, setSpeakerBuffer] = useState(0.0);
    const [stereo, setStereo] = useState(false);

	// context for connections
	// const WS = new WebSocket(SIGNALING_URL);
	var tempWS;
	const [WS, setWS] = useState();
	const [DEVICE_NAME, setDeviceName] = useState();
	const [DEVICE_MAC, setDeviceMac] = useState();
	
	useEffect(() => {
		const getDeviceInfo = async () => {
			setDeviceName(await DeviceInfo.getDevice());
			setDeviceMac(await DeviceInfo.getMacAddress());
        }
		getDeviceInfo();
		if(DEVICE_NAME != null && DEVICE_MAC != null){
			tempWS = new WebSocket(SIGNALING_URL);
			setWS(tempWS);
			tempWS.onopen = () => {
				const data = {
					type: "android_connect_server",
					mac: DEVICE_MAC,
					name: DEVICE_NAME
				};
				tempWS.send(JSON.stringify(data));
				console.log("[App.js] deviceName: " + DEVICE_NAME);
				console.log("[App.js] deviceMAC: " + DEVICE_MAC);
			};
			tempWS.onmessage = (e) => {
				console.log(e.data);
			};
		}
    }, [DEVICE_NAME, DEVICE_MAC]);

	return (
		<SafeAreaView style={backgroundStyle}>
			<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
			<SettingContext.Provider value={{ resoValue, setResoValue, FPSValue, setFPSValue, zoom, setZoom, cameraPosition, setCameraPosition, sensitivity, setSensitivity, micBuffer, setMicBuffer, noise, setNoise, volume, setVolume, speakerBuffer, setSpeakerBuffer, stereo, setStereo, WS, DEVICE_NAME, DEVICE_MAC }}>
				<NavigationContainer>
					<Stack.Navigator screenOptions={{ headerShown: false }}>
						<Stack.Screen name="Connections" component={ConnectionPage} />
						<Stack.Screen name="Welcome" component={WelcomePage} />
						<Stack.Screen name="Confirmation" component={ConfirmationPage} />
						<Stack.Screen name="Toggle" component={TogglePage} />
						<Stack.Screen name="CameraSetting" component={CameraSettingPage} />
						<Stack.Screen name="MicrophoneSetting" component={MicrophoneSettingPage} />
						<Stack.Screen name="SpeakerSetting" component={SpeakerSettingPage} />
					</Stack.Navigator>
				</NavigationContainer>
			</SettingContext.Provider>
			{/* <MicrophoneSettingPage></MicrophoneSettingPage> */}
			{/* <CommunicationTest></CommunicationTest> */}
			<FlashMessage position="bottom" />
		</SafeAreaView>
	);
};

export default App;