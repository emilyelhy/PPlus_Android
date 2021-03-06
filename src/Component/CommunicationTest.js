import React, { useState } from 'react';
import {
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    Text,
} from 'react-native';
import { showMessage } from "react-native-flash-message";

export default function CommunicationTest() {
    const [msg, setMsg] = useState("");
    const handleMsg = (msg) => setMsg(msg);

    const [IP, setIP] = useState("");
    const handleIP = (IP) => setIP(IP);

    const backgroundStyle = {
        flex: 1,
        backgroundColor: "#DAE2E1",
        justifyContent: "center"
    };

    const sendMsg = async () => {
        console.log("[CommunicationTest.js] now send msg \"" + msg + "\"");
        // send by http req
        try {
            var connectURL = "http://" + IP + ":5000/";
            const res = await fetch(
                connectURL, {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify({ msg: msg })
            }
            );
            if (res.status === 200) showMessage({ message: "Msg sent successfully" });
        } catch (error) {
            console.log("[CommunicationTest.js] " + error);
        }
    }

    const wsConnect = async () => {
        var ws = new WebSocket("ws://" + IP +":8886");
        ws.onopen = () => {
            ws.send(msg);
        };
        ws.onmessage = (e) => {
            console.log(e.data);
        };
    }

    return (
        <SafeAreaView style={backgroundStyle}>
            <Text style={{ position: 'absolute', left: 10, top: 10, fontSize: 25, fontWeight: "bold" }}>PC Connection Test</Text>
            <Text style={{ fontSize: 20, alignSelf: "flex-start", marginHorizontal: 10, marginVertical: 15 }}>Enter demo text:</Text>
            <TextInput
                placeholder="IP"
                keyboardType="numeric"
                style={{ borderColor: "#999999", borderWidth: 1, margin: 10 }}
                onChangeText={(value) => handleIP(value)}
            />
            <TextInput
                placeholder="msg"
                style={{ borderColor: "#999999", borderWidth: 1, marginHorizontal: 10 }}
                onChangeText={(value) => handleMsg(value)}
            />
            <TouchableOpacity
                style={{ backgroundColor: "#989DA5", alignSelf: "center", marginVertical: 15 }}
                onPress={wsConnect}
            >
                <Text style={{ alignSelf: "center", padding: 10 }}>SEND</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}