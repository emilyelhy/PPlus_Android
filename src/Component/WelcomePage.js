/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useRef } from 'react';
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
import FlashMessage from "react-native-flash-message";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from '@react-navigation/native';

import { buildConnection } from '../connectionHandler';

export default function WelcomePage() {
	const isDarkMode = useColorScheme() === 'dark';

	const backgroundStyle = {
		flex: 1,
		backgroundColor: "#DAE2E1",
	};

	const navigation = useNavigation();

	const connectData = useRef({ ipAddress: "", port: 0 });
	const handleIPAddress = (value) => { connectData.current.ipAddress = value; };
	const handlePort = (value) => { connectData.current.port = Number(value); };

	const submitConnection = async () => {
		if (!connectData.current.ipAddress) showMessage({ message: "Please enter IP Address first" });
		if (connectData.current.port === 0) showMessage({ message: "Please enter port first" });
		console.log("IPAddress: " + connectData.current.ipAddress);
		console.log("Port: " + connectData.current.port);
		if (await buildConnection(connectData.current) === -1) {
			showMessage({ message: "Error when connecting" });
			return;
		}
		navigation.navigate('Connections');
	}

	const CopyLink = () => {
		Clipboard.setString("https://www.pplus.com/windows/install");
		showMessage({ message: "Copied to clipboard" });
	}

	return (
		<SafeAreaView style={backgroundStyle}>
			<View style={{ justifyContent: "space-evenly", flex: 1 }}>
				<FlashMessage position="bottom" />
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
