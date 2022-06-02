import React, { useState, useContext, useEffect } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import RadioGroup from 'react-native-radio-buttons-group';

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

export default function CameraSettingPage({ route }) {
    const { computerName, ipAddress } = route.params;

    const navigation = useNavigation();
    const { resoValue, setResoValue, FPSValue, setFPSValue, zoom, setZoom, cameraPosition, setCameraPosition, WS } = useContext(SettingContext);

    const [openReso, setOpenReso] = useState(false);
    const resoItems = [{ label: "1080P", value: 1080 }, { label: "720P", value: 720 }, { label: "480P", value: 480 }, { label: "360P", value: 360 }];

    const [openFPS, setOpenFPS] = useState(false);
    const FPSItems = [{ label: "30 FPS", value: 30 }, { label: "45 FPS", value: 45 }, { label: "60 FPS", value: 60 }];

    const handleZoom = (value) => { setZoom(value.toFixed(1).toString()) }

    const radioButtonsData = [{
        id: "1",
        label: "Rear",
        value: "back",
        selected: cameraPosition === "back"
    }, {
        id: "2",
        label: "Front",
        value: "front",
        selected: cameraPosition === "front"
    }];
    const [radioButtons, setRadioButtons] = useState(radioButtonsData);
    const handleRadioButtons = (value) => {
        setRadioButtons(value)
        for (var i = 0; i < value.length; i++) {
            if (value[i].selected === true) setCameraPosition(value[i].value);
        }
    }

    const [localStream, setLocalStream] = useState({ toURL: () => null });
    useEffect(() => {
        let isFront = cameraPosition === "back" ? false : true;
        mediaDevices.enumerateDevices().then(sourceInfos => {
            console.log(sourceInfos);
            let videoSourceId;
            for (let i = 0; i < sourceInfos.length; i++) {
                const sourceInfo = sourceInfos[i];
                if (sourceInfo.kind == "videoinput" && sourceInfo.facing == (isFront ? "front" : "environment")) {
                    videoSourceId = sourceInfo.deviceId;
                }
            }
            mediaDevices.getUserMedia({
                audio: true,
                video: {
                    width: resoValue,
                    height: resoValue * 16 / 9,
                    frameRate: FPSValue,
                    facingMode: (isFront ? "user" : "environment"),
                    deviceId: videoSourceId
                }
            })
                .then(stream => {
                    setLocalStream(stream);
                })
                .catch(error => {
                    console.log("[CameraSettingPage.js]: " + error);
                });
        });
    }, [resoValue, FPSValue, cameraPosition]);

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "center", backgroundColor: "#DAE2E1" }}>
            <Text style={{ left: "3%", top: "2%", position: "absolute", fontSize: 25, fontWeight: "600", color: "#7B8D93" }}>Camera Setting</Text>
            <View style={{ marginTop: 30 }}>
                <View>
                    <Text style={{ alignSelf: "center", fontSize: 18, color: "#7B8D93" }}>Connected to: {computerName}</Text>
                    <View style={{ backgroundColor: "#E8E8E8", height: "43%", width: "90%", alignSelf: "center" }}>
                        <RTCView streamURL={localStream.toURL()} style={StyleSheet.absoluteFillObject} objectFit={'cover'} />
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#E8E8E8", marginHorizontal: '8%', marginTop: '3%', zIndex: 1000 }}>
                        <Text style={{ color: "#7B8D93", fontSize: 18, fontWeight: "500", marginLeft: "3%", alignSelf: "center" }}>Resolution</Text>
                        <DropDownPicker
                            open={openReso}
                            setOpen={setOpenReso}
                            value={resoValue}
                            setValue={setResoValue}
                            items={resoItems}
                            style={{ backgroundColor: "#989BA3", borderWidth: 0 }}
                            containerStyle={{ transform: [{ scale: 0.7 }], width: "60%" }}
                            textStyle={{ fontWeight: "500", fontSize: 20 }}
                        />
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#E8E8E8", marginHorizontal: '8%', marginTop: '3%', zIndex: 900 }}>
                        <Text style={{ color: "#7B8D93", fontSize: 18, fontWeight: "500", marginLeft: "3%", alignSelf: "center" }}>Frame rate</Text>
                        <DropDownPicker
                            open={openFPS}
                            setOpen={setOpenFPS}
                            value={FPSValue}
                            setValue={setFPSValue}
                            items={FPSItems}
                            style={{ backgroundColor: "#989BA3", borderWidth: 0 }}
                            containerStyle={{ transform: [{ scale: 0.7 }], width: "60%" }}
                            textStyle={{ fontWeight: "500", fontSize: 20 }}
                        />
                    </View>
                    <View style={{ backgroundColor: "#E8E8E8", paddingTop: '1%', marginHorizontal: '8%', marginTop: '3%' }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: "1%" }}>
                            <Text style={{ color: "#7B8D93", fontSize: 18, fontWeight: "500", marginHorizontal: "3%", alignSelf: "center" }}>Zoom</Text>
                            <Text style={{ color: "#7B8D93", fontSize: 15, fontWeight: "500", marginHorizontal: "3%", alignSelf: "center" }}>{zoom}x</Text>
                        </View>
                        <Slider
                            style={{ width: 300, height: 40 }}
                            // minimumValue={device == null ? 1 : device.minZoom}
                            // maximumValue={device == null ? 1 : device.maxZoom}
                            minimumValue={1}
                            maximumValue={4}
                            minimumTrackTintColor="#989BA3"
                            maximumTrackTintColor="#989BA3"
                            thumbTintColor="#7B8D93"
                            step={0.1}
                            value={parseFloat(zoom)}
                            onSlidingComplete={(value) => handleZoom(value)}
                        />
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#E8E8E8", marginHorizontal: '8%', marginTop: '3%', paddingVertical: "2%" }}>
                        <Text style={{ color: "#7B8D93", fontSize: 18, fontWeight: "500", marginLeft: "3%", alignSelf: "center" }}>Camera use</Text>
                        <RadioGroup
                            radioButtons={radioButtons}
                            onPress={(value) => handleRadioButtons(value)}
                            layout="row"
                        />
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Toggle")}
                    style={{ backgroundColor: "#DAE2E1", justifyContent: "center", width: "50%", borderRadius: 5, alignSelf: "center", borderWidth: 1, borderColor: "#989DA5" }}
                >
                    <Text style={{ color: "#7B8D93", alignSelf: "center", fontSize: 18, marginVertical: '6%' }}>BACK</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}