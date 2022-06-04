import React from 'react';
import {
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from "react-native-flash-message";

import { setConnected, getConnected } from '../connectionHandler';

export default function ConfirmationPage({ route }) {
    const { computerName, OS, linkedDate, lastActiveDate } = route.params;
    const navigation = useNavigation();

    const backgroundStyle = {
        flex: 1,
        backgroundColor: "#DAE2E1",
    };

    const connect = async () => {
        // Actual connection code, maybe call handler again
        // skip from now

        // check hv ng hv file
        // if no file -> write file
        // if hv file -> get content -> write new file

        var result = await getConnected();
        if (result.length > 0){
            result = JSON.parse(result);
            for (let i = 0; i < result.length; i++){
                if (result[i].computerName === computerName) {
                    console.log("Same")
                    showMessage({ message: "Already paired up with this computer" });
                    return;
                }
            }
        } else {
            result = [];
        }
        result.push(route.params);
        await setConnected(result);
        navigation.navigate('Connections');
    }

    const cancel = async () => {
        var result = await getConnected();
        result = JSON.parse(result);
        if(result.length === 0) navigation.navigate('Welcome');
        else navigation.navigate('Connections');
    }

    return (
        <SafeAreaView style={backgroundStyle}>
            <View style={{ left: 20, top: 15, position: "absolute" }}>
                <Text style={{ fontSize: 25, fontWeight: "500", color: "#7B8D93" }}>PPlus</Text>
            </View>
            <View style={{ justifyContent: "center", flex: 1 }}>
                <View style={{ alignSelf: "center" }}>
                    <MaterialCommunityIcons name="monitor" color="#444444" size={100}></MaterialCommunityIcons>
                </View>
                <View style={{ alignItems: "center" }}>
                    <Text style={{ color: "#7B8D93", fontWeight: "500", fontSize: 25 }}>{computerName}</Text>
                    <Text style={{ color: "#7B8D93", fontSize: 20 }}>{OS}</Text>
                    <Text style={{ color: "#7B8D93", fontWeight: "400", fontSize: 20 }}>Linked: {linkedDate}</Text>
                    <Text style={{ color: "#7B8D93", fontWeight: "400", fontSize: 20 }}>Last active: {lastActiveDate}</Text>
                </View>
                <TouchableOpacity
                    onPress={connect}
                    style={{ backgroundColor: "#989DA5", justifyContent: "center", width: "40%", borderRadius: 5, alignSelf: "center", marginTop: "3%" }}
                >
                    <Text style={{ color: "#E8E8E8", alignSelf: "center", fontSize: 15, marginVertical: '5%' }}>CONNECT</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={cancel}
                    style={{ backgroundColor: "#DAE2E1", justifyContent: "center", width: "40%", borderRadius: 5, alignSelf: "center", borderWidth: 1, borderColor: "#989DA5", marginTop: "3%" }}
                >
                    <Text style={{ color: "#7B8D93", alignSelf: "center", fontSize: 15, marginVertical: '5%' }}>CANCEL</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}