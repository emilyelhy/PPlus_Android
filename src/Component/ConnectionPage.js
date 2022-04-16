import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    FlatList
} from 'react-native';

// import { connections } from '../Connection.json';
import ConnectionCard from './ConnectionCard';
import { fs } from '../connectionHandler';

export default function ConnectionPage() {
    const path = fs.DocumentDirectoryPath + '/Connection.json';
    const [connections, setConnections] = useState([]);

    useEffect(() => {
        fs.readFile(path)
            .then((res) => {
                // console.log(res);
                setConnections(JSON.parse(res));
            })
            .catch((err) => {
                console.log(err.message);
            });
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
                keyExtractor={(item) => item.connectionID}
                renderItem={({ item }) => (
                    <ConnectionCard
                        computerName={item.computerName}
                        OS={item.OS}
                        linkedDate={item.linkedDate}
                        lastActiveDate={item.lastActiveDate}
                    />
                )}
            />
        </SafeAreaView>
    )
}

{/* <FlatList
    data={connections}
    numColumns={2}
    keyExtractor={(item) => item.connectionID}
    renderItem={({ item }) => (
        <ConnectionCard
            computerName={item.computerName}
            OS={item.OS}
            linkedDate={item.linkedDate}
            lastActiveDate={item.lastActiveDate}
        />
    )} /> */}

{/* <SafeAreaView style={backgroundStyle}>
            {connections.map((connection, i) => (
                <ConnectionCard
                    key={i}
                    computerName={connection.computerName}
                    OS={connection.OS}
                    linkedDate={connection.linkedDate}
                    lastActiveDate={connection.lastActiveDate}
                />
            ))}
        </SafeAreaView> */}