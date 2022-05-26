import React, { useState, useContext } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import Slider from '@react-native-community/slider';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';

import { SettingContext } from '../contextHandler';

export default function SpaekerSettingPage({ route }) {
    const { computerName } = route.params;

    const navigation = useNavigation();
    const { volume, setVolume, speakerBuffer, setSpeakerBuffer, stereo, setStereo } = useContext(SettingContext);

    const handleVolume = (value) => { setVolume(value.toFixed(1).toString()) };

    const handleBuffer = (value) => { setSpeakerBuffer(value.toFixed(1).toString()) };

    const handleStereo = () => { setStereo(!stereo) };

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "space-around", backgroundColor: "#DAE2E1" }}>
            <Text style={{ left: "3%", top: "2%", position: "absolute", fontSize: 25, fontWeight: "600", color: "#7B8D93" }}>Speaker Setting</Text>
            <View>
                <Text style={{ alignSelf: "center", fontSize: 18, color: "#7B8D93" }}>Connected to: {computerName}</Text>
                <View style={{ backgroundColor: "#E8E8E8", paddingTop: '1%', marginHorizontal: '8%', marginTop: '3%' }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: "3%" }}>
                        <Text style={{ color: "#7B8D93", fontSize: 18, fontWeight: "500", marginHorizontal: "3%", alignSelf: "center" }}>Volume</Text>
                        <Text style={{ color: "#7B8D93", fontSize: 15, fontWeight: "500", marginHorizontal: "3%", alignSelf: "center" }}>{volume}</Text>
                    </View>
                    <Slider
                        style={{ width: 300, height: 40 }}
                        minimumValue={0}
                        maximumValue={1}
                        minimumTrackTintColor="#989BA3"
                        maximumTrackTintColor="#989BA3"
                        thumbTintColor="#7B8D93"
                        step={0.1}
                        value={parseFloat(volume)}
                        onSlidingComplete={(value) => handleVolume(value)}
                    />
                </View>
                <View style={{ backgroundColor: "#E8E8E8", paddingTop: '1%', marginHorizontal: '8%', marginTop: '3%' }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: "3%" }}>
                        <Text style={{ color: "#7B8D93", fontSize: 18, fontWeight: "500", marginHorizontal: "3%", alignSelf: "center" }}>Buffer size</Text>
                        <Text style={{ color: "#7B8D93", fontSize: 15, fontWeight: "500", marginHorizontal: "3%", alignSelf: "center" }}>{speakerBuffer}</Text>
                    </View>
                    <Slider
                        style={{ width: 300, height: 40 }}
                        minimumValue={0}
                        maximumValue={1}
                        minimumTrackTintColor="#989BA3"
                        maximumTrackTintColor="#989BA3"
                        thumbTintColor="#7B8D93"
                        step={0.1}
                        value={parseFloat(speakerBuffer)}
                        onSlidingComplete={(value) => handleBuffer(value)}
                    />
                </View>
                <View style={{ flexDirection: "row", backgroundColor: "#E8E8E8", padding: '1%', marginHorizontal: '8%', marginTop: '3%', justifyContent: "space-between" }}>
                    <Text style={{ color: "#7B8D93", fontSize: 18, fontWeight: "500", marginHorizontal: "3%", marginVertical: "3%" }}>Stereo audio</Text>
                    <CheckBox
                        style={{ alignSelf: "center", marginHorizontal: "3%" }}
                        value={stereo}
                        onChange={handleStereo}
                        tintColors={{ true: "#7B8D93", false: "#7B8D93" }}
                    />
                </View>
            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate("Toggle")}
                style={{ backgroundColor: "#DAE2E1", justifyContent: "center", width: "50%", borderRadius: 5, alignSelf: "center", borderWidth: 1, borderColor: "#989DA5" }}
            >
                <Text style={{ color: "#7B8D93", alignSelf: "center", fontSize: 18, marginVertical: '6%' }}>BACK</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}