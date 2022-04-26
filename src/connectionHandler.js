const fs = require("react-native-fs");
const PATH = fs.DocumentDirectoryPath + '/Connection.json';

const setConnected = (newConnectionList) => {
    fs.writeFile(PATH, JSON.stringify(newConnectionList))
        .then((success) => {
            console.log('FILE WRITTEN!');
        })
        .catch((err) => {
            console.log(err.message);
        });

};

const getConnected = async () => {
    try {
        const res = await fs.readFile(PATH);
        return res;
    } catch(err) {
        console.log(err);
    }
}

const getNoOfConnected = () => {
    fs.readFile(PATH)
        .then((res) => {
            res = JSON.parse(res);
            return res.length;
        })
        .catch((err) => {
            console.log(err.message);
            return 0;
        });
}

const findInfo = (current) => {
    console.log("[findInfo] ip: " + current.ipAddress + "\tport: " + current.port);
    // hard code for simulating connection from IP Address and port
    const computer = new Object();
    computer.OS = "Windows 10";
    computer.linkedDate = new Date().toLocaleDateString(undefined, { year: 'numeric', month: "2-digit", day: "2-digit" });
    computer.lastActiveDate = new Date().toLocaleDateString(undefined, { year: 'numeric', month: "2-digit", day: "2-digit" });
    // Case 1: 192.168.50.8:1234 for LAPTOP-PLG7Q83Y
    if (current.ipAddress === "192.168.50.8" && current.port === 8964) computer.computerName = "LAPTOP-PLG7Q83Y";
    // Case 2: 192.168.50.12:1234 for LAPTOP-BSK8Y64Q
    else if (current.ipAddress === "192.168.50.12" && current.port === 8964) computer.computerName = "LAPTOP-BSK8Y64Q";
    // Case 3: 192.168.50.13:1234 for LAPTOP-DLLM0NL9
    else if (current.ipAddress === "192.168.50.13" && current.port === 8964) computer.computerName = "LAPTOP-DLLM0NL9";
    else return null;
    return computer;
}

export { setConnected, fs, findInfo, PATH, getConnected };