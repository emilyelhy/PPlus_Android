/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useContext} from 'react';
import {
    SafeAreaView,
    Text,
    View,
    Button,
    Dimensions,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';

// import { connections } from "../Connection.json";
import { setConnected, getConnected } from "../connectionHandler";
import { SettingContext } from '../contextHandler';

export default function WelcomePage(props) {
    const navigation = useNavigation();
    const { computerName, OS, linkedDate, lastActiveDate, ipAddress } = props;

    const { WS } = useContext(SettingContext);

    const windowWidth = Dimensions.get('window').width;

    const backgroundStyle = {
        flex: 1,
        backgroundColor: "#DAE2E1",
    };

    const delConnection = async (computerName) => {
        var connected = await getConnected();
        connected = JSON.parse(connected);
        for (let i = 0; i < connected.length; i++) {
            if (connected[i].computerName === computerName) {
                connected.splice(i, 1);
                break;
            }
        }

        const data = {
            type: "android_disconnect_pc",
            pc_ip: ipAddress
        }
        WS.send(JSON.stringify(data));
        WS.onmessage = (e) => {
            console.log(e.data);
        };

        if (connected.length === 0) navigation.navigate("Welcome");
        await setConnected(connected);
    }

    const connect = (computerName) => {
        // start streaming with computer (skip for now)

        // navigate to toggle page
        navigation.navigate("Toggle", props);
    }

    return (
        <SafeAreaView style={backgroundStyle}>
            <View style={{ backgroundColor: "#E8E8E8", minHeight: 220, width: (windowWidth / 2 - 30), justifyContent: "space-evenly", borderRadius: 10, borderColor: "#B0B0B9", borderWidth: 1 }} >
                <View style={{ position: "absolute", alignSelf: "flex-end" }}>
                    <Entypo.Button name="cross" color="#444444" size={20} onPress={() => delConnection(computerName)} backgroundColor="#E8E8E800" style={{ padding: 0 }} iconStyle={{ marginRight: 0 }}></Entypo.Button>
                </View>
                <View style={{ alignItems: "center", marginTop: "8%", marginRight: 0 }}>
                    <MaterialCommunityIcons name="monitor" color="#444444" size={50}></MaterialCommunityIcons>
                </View>
                <View style={{ alignItems: "center" }}>
                    <Text style={{ color: "#7B8D93", fontWeight: "500", fontSize: 15, textAlign: "center" }}>{computerName}</Text>
                    <Text style={{ color: "#7B8D93", textAlign: "center" }}>{OS}</Text>
                    <Text style={{ color: "#7B8D93", fontWeight: "400", fontSize: 13, textAlign: "center" }}>Linked: {linkedDate}</Text>
                    <Text style={{ color: "#7B8D93", fontWeight: "400", fontSize: 13, textAlign: "center" }}>Last active: {lastActiveDate}</Text>
                </View>
                <View style={{ alignSelf: "center", width: "70%", marginBottom: "8%" }}>
                    <Button onPress={() => connect(computerName)} title="ENTER" color="#989da5" />
                </View>
            </View>
        </SafeAreaView>
    );
};
