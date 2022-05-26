import React, { useState, useContext } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import Slider from '@react-native-community/slider';
import RadioGroup from 'react-native-radio-buttons-group';

import { CameraContext } from '../contextHandler';

export default function CameraSettingPage({ route }) {
    const { computerName } = route.params;

    const navigation = useNavigation();
    const { reso } = useContext(CameraContext);

    const devices = useCameraDevices('wide-angle-camera');
    const [cameraPosition, setCameraPosition] = useState("back");
    const device = devices[cameraPosition];

    const [openReso, setOpenReso] = useState(false);
    const [resoValue, setResoValue] = useState(reso);
    const handleResoValue = (value) =>{
        console.log(value);
        // setResoValue(value);
        reso = value;
    }
    const resoItems = [{ label: "1080P", value: "1080P" }, { label: "720P", value: "720P" }, { label: "480P", value: "480P" }, { label: "360P", value: "360P" }];

    const [openFPS, setOpenFPS] = useState(false);
    const [FPSValue, setFPSValue] = useState(30);
    const FPSItems = [{ label: "30 FPS", value: 30 }, { label: "45 FPS", value: 45 }, { label: "60 FPS", value: 60 }];

    const [zoom, setZoom] = useState(1.0);
    const handleZoom = (value) => { setZoom(value.toFixed(1).toString()) }

    const radioButtonsData = [{
        id: "1",
        label: "Rear",
        value: "back",
        selected: true
    }, {
        id: "2",
        label: "Front",
        value: "front",
        selected: false
    }];
    const [radioButtons, setRadioButtons] = useState(radioButtonsData);
    const handleRadioButtons = (value) => {
        setRadioButtons(value)
        for (var i = 0; i < value.length; i++) {
            if (value[i].selected === true) setCameraPosition(value[i].value);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "center", backgroundColor: "#DAE2E1" }}>
            <Text style={{ left: "3%", top: "2%", position: "absolute", fontSize: 25, fontWeight: "600", color: "#7B8D93" }}>Camera Setting</Text>
            <View style={{ marginTop: 30 }}>
                <View>
                    <CameraContext.Provider value={{ reso }}>
                        <Text style={{ alignSelf: "center", fontSize: 18, color: "#7B8D93" }}>Connected to: {computerName}</Text>
                        <View style={{ backgroundColor: "#E8E8E8", height: "43%", width: "90%", alignSelf: "center" }}>
                            {(device == null) ? <></> :
                                <Camera
                                    style={StyleSheet.absoluteFill}
                                    device={device}
                                    isActive={true}
                                    fps={FPSValue}
                                    zoom={parseFloat(zoom)}
                                />
                            }
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#E8E8E8", marginHorizontal: '8%', marginTop: '3%', zIndex: 1000 }}>
                            <Text style={{ color: "#7B8D93", fontSize: 18, fontWeight: "500", marginLeft: "3%", alignSelf: "center" }}>Resolution</Text>
                            <DropDownPicker
                                open={openReso}
                                setOpen={setOpenReso}
                                value={resoValue}
                                onChangeValue={(value) => handleResoValue(value)}
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
                                minimumValue={device == null ? 1 : device.minZoom}
                                maximumValue={device == null ? 1 : device.maxZoom}
                                minimumTrackTintColor="#989BA3"
                                maximumTrackTintColor="#989BA3"
                                thumbTintColor="#7B8D93"
                                step={0.1}
                                onValueChange={(value) => handleZoom(value)}
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
                    </CameraContext.Provider>
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