const fs = require("react-native-fs");
const path = fs.DocumentDirectoryPath + '/Connection.json';

const setConnectioned = (newConnectionList) => {
    fs.writeFile(path, JSON.stringify(newConnectionList))
        .then((success) => {
            console.log('FILE WRITTEN!');
        })
        .catch((err) => {
            console.log(err.message);
        });

};

const getConnectioned = () => {
    console.log("getConnections")
    fs.readFile(path)
        .then((res) => {
            console.log(res);
            return res;
        })
        .catch((err) => {
            console.log(err.message);
        });
};

const getNoOfConnected = () => {
    fs.readFile(path)
        .then((res) => {
            res = JSON.parse(res);
            return res.length;
        })
        .catch((err) => {
            console.log(err.message);
            return 0;
        });
}

const buildConnection = async (current) => {
    console.log("[buildConnection] ip: " + current.ipAddress + "\tport: " + current.port);
    // hard code for simulating connection from IP Address and port
    const computer = new Object();
    computer.OS = "Windows 10";
    computer.linkedDate = new Date().toLocaleDateString(undefined, {year: 'numeric', month: "2-digit", day: "2-digit"});
    computer.lastActiveDate = new Date().toLocaleDateString(undefined, {year: 'numeric', month: "2-digit", day: "2-digit"});
    // Case 1: 192.168.50.8:1234 for LAPTOP-PLG7Q83Y
    if (current.ipAddress === "192.168.50.8" && current.port === 1234) computer.computerName = "LAPTOP-PLG7Q83Y"
    // Case 2: 192.168.50.12:1234 for LAPTOP-BSK8Y64Q
    else if (current.ipAddress === "192.168.50.12" && current.port === 1234) computer.computerName = "LAPTOP-BSK8Y64Q"
    // Case 3: 192.168.50.13:1234 for LAPTOP-DLLM0NL9
    else if (current.ipAddress === "192.168.50.13" && current.port === 1234) computer.computerName = "LAPTOP-DLLM0NL9";
    else return -1;

    // append new computer info to json file
    fs.readFile(path)
        .then((res) => {
            res = JSON.parse(res);
            res.push(computer);
            console.log(res);
            setConnectioned(res);
        })
        .catch((err) => {
            console.log(err.message);
        });
}

export { setConnectioned, getConnectioned, fs, buildConnection };