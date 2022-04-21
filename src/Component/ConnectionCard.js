/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
    SafeAreaView,
    Text,
    View,
    Button
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';

// import { connections } from "../Connection.json";
import { setConnectioned, fs } from "../connectionHandler";

export default function WelcomePage(props) {
    const navigation = useNavigation();
    const { computerName, OS, linkedDate, lastActiveDate } = props;
    const path = fs.DocumentDirectoryPath + '/Connection.json';

    const backgroundStyle = {
        flex: 1,
        backgroundColor: "#DAE2E1",
    };

    const delConnection = async (computerName) => {
        fs.readFile(path)
            .then((res) => {
                var connections = JSON.parse(res);
                for (let i = 0; i < connections.length; i++) {
                    if (connections[i].computerName === computerName) {
                        connections.splice(i, 1);                // comment this line for debug use
                        break;
                    }
                }
                if(connections.length === 0) navigation.navigate("Welcome");
                setConnectioned(connections);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    return (
        <SafeAreaView style={backgroundStyle}>
            <View style={{ backgroundColor: "#E8E8E8", minHeight: 220, width: 177, justifyContent: "space-evenly", borderRadius: 10, borderColor: "#B0B0B9", borderWidth: 1 }} >
                <View style={{ position: "absolute", alignSelf: "flex-end" }}>
                    <Entypo.Button name="cross" color="#444444" size={20} onPress={() => delConnection(computerName)} backgroundColor="#E8E8E800" style={{ padding: 0 }} iconStyle={{ marginRight: 0 }}></Entypo.Button>
                </View>
                <View style={{ alignItems: "center", marginTop: "8%", marginRight: 0 }}>
                    <MaterialCommunityIcons name="monitor" color="#444444" size={50}></MaterialCommunityIcons>
                </View>
                <View style={{ alignItems: "center" }}>
                    <Text style={{ color: "#7B8D93", fontWeight: "500", fontSize: 15 }}>{computerName}</Text>
                    <Text style={{ color: "#7B8D93" }}>{OS}</Text>
                    <Text style={{ color: "#7B8D93", fontWeight: "400" }}>Linked: {linkedDate}</Text>
                    <Text style={{ color: "#7B8D93", fontWeight: "400" }}>Last active: {lastActiveDate}</Text>
                </View>
                <View style={{ alignSelf: "center", width: "70%", marginBottom: "8%" }}>
                    <Button title="CONNECT" color="#989da5" />
                </View>
            </View>
        </SafeAreaView>
    );
};
