import React, { useContext } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    Switch,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from "react-native-flash-message";
import { Camera } from 'react-native-vision-camera';

import { SettingContext } from '../contextHandler';

export default function TogglePage({ route }) {
    const { computerName, ipAddress } = route.params;

    const navigation = useNavigation();
    const { WS, enableCamera, setEnableCamera, enableMicrophone, setEnableMicrophone, enableSpeaker, setEnableSpeaker, ready, setReady } = useContext(SettingContext);

    const handleEnableCamera = () => setEnableCamera(!enableCamera);

    const handleEnableMicrophone = () => setEnableMicrophone(!enableMicrophone);

    const handleEnableSpeaker = () => setEnableSpeaker(!enableSpeaker);

    const buttonSubmit = () => {
        if(ready){
            // disable all stuff n navigate to connections page if currently connect
            const data = {
                type: "android_disconnect_pc",
                pc_ip: ipAddress
            }
            WS.send(JSON.stringify(data));
            console.log("[TogglePage.js] Sent deletion request to server");
            peerConnection.close();
            setReady(false);
            setEnableCamera(false);
            setEnableMicrophone(false);
            setEnableSpeaker(false);
            navigation.navigate("Connections");
        } else{
            // send connection req if currently disconnect
            sendPCConnReq();
        }
    }

    const initCamera = async () => {
        if (!enableCamera) {
            const cameraPermission = await Camera.requestCameraPermission();
            if (cameraPermission !== "authorized") {
                setEnableCamera(false);
                return;
            }
            console.log("[TogglePage.js] cameraPermission: " + cameraPermission);
        }
        handleEnableCamera();
    }

    const initMicrophone = async () => {
        if (!enableMicrophone) {
            const microphonePermission = await Camera.requestMicrophonePermission();
            if (microphonePermission !== "authorized") {
                setEnableMicrophone(false);
                return;
            }
            console.log("[TogglePage.js] microphonePermission: " + microphonePermission);
        }
        handleEnableMicrophone();
    }

    const sendPCConnReq = async () => {
        const connData = {
            type: "android_connect_pc",
            pc_ip: ipAddress
        };
        WS.send(JSON.stringify(connData));
        WS.onmessage = (e) => {
            e.data = JSON.parse(e.data);
            console.log(e.data);
            if(e.data.type === "server_pc_accept") setReady(true);
            else showMessage({ message: "Error when connecting" });
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "space-around", backgroundColor: "#DAE2E1" }}>
            <View>
                <Text style={{ color: "#7B8D93", fontSize: 21, alignSelf: "center" }}>Connected to: {computerName}</Text>
                <TouchableOpacity
                    disabled={!enableCamera}
                    onPress={() => navigation.navigate("CameraSetting", { computerName, ipAddress })}
                    style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#E8E8E8", padding: '3%', marginHorizontal: '8%', marginTop: '3%' }}
                >
                    <Text style={{ color: "#7B8D93", fontSize: 22, fontWeight: "500", marginLeft: "3%" }}>Camera</Text>
                    <Switch
                        style={{ transform: [{ scale: 1.3 }] }}
                        trackColor={{ true: "#85BBB6", false: "#D5D5D5" }}
                        thumbColor={enableCamera ? "#469287" : "#F1F4F7"}
                        onValueChange={initCamera}
                        value={enableCamera}
                        disabled={!ready}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    disabled={!enableMicrophone}
                    onPress={() => navigation.navigate("MicrophoneSetting", { computerName })}
                    style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#E8E8E8", padding: '3%', marginHorizontal: '8%', marginTop: '3%' }}
                >
                    <Text style={{ color: "#7B8D93", fontSize: 22, fontWeight: "500", marginLeft: "3%" }}>Microphone</Text>
                    <Switch
                        style={{ transform: [{ scale: 1.3 }] }}
                        trackColor={{ true: "#85BBB6", false: "#D5D5D5" }}
                        thumbColor={enableMicrophone ? "#469287" : "#F1F4F7"}
                        onValueChange={initMicrophone}
                        value={enableMicrophone}
                        disabled={!ready}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    disabled={!enableSpeaker}
                    onPress={() => navigation.navigate("SpeakerSetting", { computerName })}
                    style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#E8E8E8", padding: '3%', marginHorizontal: '8%', marginTop: '3%' }}
                >
                    <Text style={{ color: "#7B8D93", fontSize: 22, fontWeight: "500", marginLeft: "3%" }}>Speaker</Text>
                    <Switch
                        style={{ transform: [{ scale: 1.3 }] }}
                        trackColor={{ true: "#85BBB6", false: "#D5D5D5" }}
                        thumbColor={enableSpeaker ? "#469287" : "#F1F4F7"}
                        onValueChange={handleEnableSpeaker}
                        value={enableSpeaker}
                        disabled={!ready}
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                onPress={buttonSubmit}
                style={{ backgroundColor: "#DAE2E1", justifyContent: "center", width: "50%", borderRadius: 5, alignSelf: "center", borderWidth: 1, borderColor: "#989DA5" }}
            >
                <Text style={{ color: "#7B8D93", alignSelf: "center", fontSize: 18, marginVertical: '6%' }}>{ready? "DISCONNECT" : "CONNECT"}</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}