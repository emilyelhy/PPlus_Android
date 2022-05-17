import React, { useState } from 'react';
import {
    SafeAreaView,
    Text,
    View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function CameraSettingPage() {
    const [openReso, setOpenReso] = useState(false);
    const [resoValue, setResoValue] = useState("1080P");
    const resoItems = [{ label: "1080P", value: "1080P" }, { label: "720P", value: "720P" }, { label: "480P", value: "480P" }, { label: "360P", value: "360P" }];

    const [openFPS, setOpenFPS] = useState(false);
    const [FPSValue, setFPSValue] = useState("30FPS");
    const FPSItems = [{ label: "30 FPS", value: "30FPS" }, { label: "45 FPS", value: "45FPS" }, { label: "60 FPS", value: "60FPS" }];

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "space-around", backgroundColor: "#DAE2E1" }}>
            <Text style={{ left: "3%", top: "2%", position: "absolute", fontSize: 25, fontWeight: "600", color: "#7B8D93" }}>Camera Setting</Text>
            <View>
                <Text style={{ alignSelf: "center", fontSize: 21, color: "#7B8D93" }}>Connected to: { }</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#E8E8E8", padding: '3%', marginHorizontal: '8%', marginTop: '3%' }}>
                    <Text style={{ color: "#7B8D93", fontSize: 20, fontWeight: "500", marginLeft: "3%", alignSelf: "center" }}>Resolution</Text>
                    <DropDownPicker
                        open={openReso}
                        setOpen={setOpenReso}
                        value={resoValue}
                        setValue={setResoValue}
                        items={resoItems}
                        style={{ backgroundColor: "#989BA3", borderWidth: 0 }}
                        containerStyle={{ transform: [{ scale: 0.8 }], width: "60%" }}
                        textStyle={{ fontWeight: "500", fontSize: 20 }}
                    />
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#E8E8E8", padding: '3%', marginHorizontal: '8%', marginTop: '3%' }}>
                    <Text style={{ color: "#7B8D93", fontSize: 20, fontWeight: "500", marginLeft: "3%", alignSelf: "center" }}>Frame rate</Text>
                    <DropDownPicker
                        open={openFPS}
                        setOpen={setOpenFPS}
                        value={FPSValue}
                        setValue={setFPSValue}
                        items={FPSItems}
                        style={{ backgroundColor: "#989BA3", borderWidth: 0 }}
                        containerStyle={{ transform: [{ scale: 0.8 }], width: "60%" }}
                        textStyle={{ fontWeight: "500", fontSize: 20 }}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}