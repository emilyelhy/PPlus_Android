/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useRef, useContext } from 'react';
import {
	SafeAreaView,
	Text,
	useColorScheme,
	View,
	TextInput,
	Button,
} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import Entypo from 'react-native-vector-icons/Entypo';
import { showMessage } from "react-native-flash-message";
import { useNavigation } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';

import { SettingContext } from '../contextHandler';

export default function WelcomePage() {
	const backgroundStyle = {
		flex: 1,
		backgroundColor: "#DAE2E1",
	};

	const navigation = useNavigation();
	const { setWS } = useContext(SettingContext);

	const connectData = useRef({ ipAddress: "", port: 0 });
	const handleIPAddress = (value) => { connectData.current.ipAddress = value; };
	const handlePort = (value) => { connectData.current.port = Number(value); };
	var DEVICE_NAME, DEVICE_MAC;

	const submitConnection = async () => {
		if (!connectData.current.ipAddress) showMessage({ message: "Please enter IP Address first" });
		if (connectData.current.port === 0) showMessage({ message: "Please enter port first" });
		
		// connect to ws
		DEVICE_NAME = await DeviceInfo.getDevice();
		DEVICE_MAC = await DeviceInfo.getMacAddress();
		var SIGNALING_URL = "ws://" + connectData.current.ipAddress + ":" + connectData.current.port.toString();
		console.log("[WelcomePage.js] Signaling URL: " + SIGNALING_URL);
		if(DEVICE_NAME != null && DEVICE_MAC != null){
			var tempWS = new WebSocket(SIGNALING_URL);
			console.log(tempWS);
			setWS(tempWS);
			tempWS.onopen = () => {
				console.log("Opened")
				const data = {
					type: "android_connect_server",
					mac: DEVICE_MAC,
					name: DEVICE_NAME,
					pc_ip: connectData.current.ipAddress
				};
				tempWS.send(JSON.stringify(data));
				console.log("[App.js] deviceName: " + DEVICE_NAME);
				console.log("[App.js] deviceMAC: " + DEVICE_MAC);
			};
			// send connection req
			tempWS.onmessage = (e) => {
				e.data = JSON.parse(e.data);
				console.log(e.data);
				if(e.data.type === "server_connect"){
					var lastActiveDate = new Date();
					lastActiveDate = lastActiveDate.getDate().toString().padStart(2, '0') + "/" +  (lastActiveDate.getMonth()+1).toString().padStart(2, '0') + "/" + lastActiveDate.getFullYear();
					var linkedDate = new Date();
					linkedDate = linkedDate.getDate().toString().padStart(2, '0') + "/" +  (linkedDate.getMonth()+1).toString().padStart(2, '0') + "/" + linkedDate.getFullYear();
					navigation.navigate('Confirmation', { ipAddress: connectData.current.ipAddress, port: connectData.current.port, computerName: e.data.pc_name, OS: e.data.pc_os, linkedDate: linkedDate, lastActiveDate: lastActiveDate });
				} else showMessage({ message: "Error when connecting server" });
			};
		}
	}

	const CopyLink = () => {
		Clipboard.setString("https://www.pplus.com/windows/install");
		showMessage({ message: "Copied to clipboard" });
	}

	return (
		<SafeAreaView style={backgroundStyle}>
			<View style={{ justifyContent: "space-evenly", flex: 1 }}>
				<Text style={{ fontSize: 40, fontWeight: "600", color: "#7B8D93", textAlign: "center" }}>
					Welcome{"\n"}to PPlus
				</Text>
				<View>
					<Text style={{ fontSize: 20, fontWeight: "400", color: "#7B8D93", textAlign: "center" }}>
						Please enter the following{"\n"}information to finish initial pairing
					</Text>
					<View style={{ justifyContent: "center", flexDirection: "row" }}>
						<TextInput
							placeholder="IP Address"
							keyboardType="numeric"
							style={{ borderColor: "#999999", borderWidth: 1, width: '55%', height: 40, marginTop: 10, marginRight: 10 }}
							onChangeText={(value) => handleIPAddress(value)}
						/>
						<TextInput
							placeholder="Port"
							keyboardType="numeric"
							style={{ borderColor: "#999999", borderWidth: 1, width: '25%', height: 40, marginTop: 10 }}
							onChangeText={(value) => handlePort(value)}
						/>
					</View>
					<View style={{ marginTop: 10, width: '30%', alignSelf: "center" }}>
						<Button
							title="CONNECT"
							color="#989da5"
							onPress={submitConnection}
						/>
					</View>
				</View>
				<View>
					<Text style={{ fontSize: 15, fontWeight: "400", color: "#7B8D93", textAlign: "center" }}>
						Not yet install PPlus PC host?
					</Text>
					<Entypo.Button
						name="share"
						backgroundColor="#DAE2E1"
						justifyContent="center"
						onPress={CopyLink}
						iconStyle={{ color: "#7B8D93", marginRight: 3, marginTop: 0 }}>
						<Text style={{ color: '#7B8D93', fontSize: 15, textDecorationLine: "underline" }}>
							SHARE INSTALLATION LINK
						</Text>
					</Entypo.Button>
				</View>
			</View>
		</SafeAreaView>
	);
};
