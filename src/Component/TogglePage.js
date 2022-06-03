import React, { useState, useEffect, useContext } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    Switch,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Camera } from 'react-native-vision-camera';
import {
    RTCPeerConnection,
    RTCIceCandidate,
    RTCSessionDescription,
    RTCView,
    MediaStream,
    MediaStreamTrack,
    mediaDevices,
    registerGlobals
} from 'react-native-webrtc';

import { SettingContext } from '../contextHandler';
import { onAnswer } from '../serverHandler';

export default function TogglePage({ route }) {
    const { computerName, ipAddress } = route.params;

    const navigation = useNavigation();
    const { WS, enableCamera, setEnableCamera, enableMicrophone, setEnableMicrophone, enableSpeaker, setEnableSpeaker, peerConnection, setPeerConnection } = useContext(SettingContext);

    const handleEnableCamera = () => setEnableCamera(!enableCamera);

    const handleEnableMicrophone = () => setEnableMicrophone(!enableMicrophone);

    const handleEnableSpeaker = () => setEnableSpeaker(!enableSpeaker);

    const [ready, setReady] = useState(false);

    const disconnect = () => {
        // stop streaming with computer (skip for now)

        // navigate to connections page
        navigation.navigate("Connections");
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

    useEffect(() => {
        peerConnection.createOffer().then(desc => {
            peerConnection.setLocalDescription(desc).then(() => {
                // Send pc.localDescription to peer
                const data = {
                    type: "android_offer",
                    pc_ip: ipAddress,
                    offer: peerConnection.localDescription
                }
                setPeerConnection(peerConnection);
                console.log(peerConnection);
                WS.send(JSON.stringify(data));
                WS.onmessage = async (e) => {
                    console.log(e.data);
                    e.data = JSON.parse(e.data);
                    // wait for "pc_answer"
                    // if hv pc_answer, set pc_answer using onAnswer from webrtc_test.js
                    if(e.data.type === "server_pc_answer"){
                        const result = await onAnswer(peerConnection, e.data.answer);
                        setReady(result);
                    }
                };
            });
        });
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "space-around", backgroundColor: "#DAE2E1" }}>
            <View>
                <Text style={{ color: "#7B8D93", fontSize: 21, alignSelf: "center" }}>Connected to: {computerName}</Text>
                <TouchableOpacity
                    disabled={!enableCamera}
                    onPress={() => navigation.navigate("CameraSetting", { computerName })}
                    style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#E8E8E8", padding: '3%', marginHorizontal: '8%', marginTop: '3%' }}
                >
                    <Text style={{ color: "#7B8D93", fontSize: 22, fontWeight: "500", marginLeft: "3%" }}>Camera</Text>
                    <Switch
                        style={{ transform: [{ scale: 1.3 }] }}
                        trackColor={{ true: "#85BBB6", false: "#D5D5D5" }}
                        thumbColor={enableCamera ? "#469287" : "#F1F4F7"}
                        onValueChange={initCamera}
                        value={enableCamera}
                        // disabled={!ready}
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
                        // disabled={!ready}
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
                        // disabled={!ready}
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                onPress={disconnect}
                style={{ backgroundColor: "#DAE2E1", justifyContent: "center", width: "50%", borderRadius: 5, alignSelf: "center", borderWidth: 1, borderColor: "#989DA5" }}
            >
                <Text style={{ color: "#7B8D93", alignSelf: "center", fontSize: 18, marginVertical: '6%' }}>DISCONNECT</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}