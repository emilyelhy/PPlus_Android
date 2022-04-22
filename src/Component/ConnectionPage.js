import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    SafeAreaView,
    View,
    FlatList,
    TouchableOpacity,
    Text,
} from 'react-native';

// import { connections } from '../Connection.json';
import ConnectionCard from './ConnectionCard';
import { getConnected } from '../connectionHandler';

export default function ConnectionPage() {
    const navigation = useNavigation();
    const [connections, setConnections] = useState([]);

    useEffect(() => {
        const updateConnections = async () => {
            var result = await getConnected();
            result = JSON.parse(result);
            setConnections(result);
        }
        updateConnections();
    }, [connections]);

    const backgroundStyle = {
        flex: 1,
        backgroundColor: "#DAE2E1",
        flexDirection: 'row',
    };

    return (
        <SafeAreaView style={backgroundStyle}>
            <FlatList
                contentContainerStyle={{ marginHorizontal: "7%", marginVertical: "5%" }}
                ListFooterComponent={() => <View style={{ height: 50 }}></View>}
                scrollEnabled={true}
                data={connections}
                numColumns={2}
                keyExtractor={(item) => item.conputerName}
                renderItem={({ item }) => (
                    <ConnectionCard
                        computerName={item.computerName}
                        OS={item.OS}
                        linkedDate={item.linkedDate}
                        lastActiveDate={item.lastActiveDate}
                    />
                )}
            />
            <View style={{ position: "absolute", bottom: 25, right: 15}}>
                <TouchableOpacity
                    style={{backgroundColor: "#989DA5", borderRadius: 50, width: 50, height: 50, justifyContent: "center"}}
                    onPress={() => {navigation.navigate('Welcome');}}
                    >
                    <Text style={{color: "#E8E8E8", alignSelf: "center", fontSize: 20, fontWeight: "900"}}>十</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}