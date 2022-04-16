const fs = require("react-native-fs");

const setConnections = (newConnectionList) => {
    const path = fs.DocumentDirectoryPath + '/Connection.json';
    fs.writeFile(path, JSON.stringify(newConnectionList))
        .then((success) => {
            console.log('FILE WRITTEN!');
        })
        .catch((err) => {
            console.log(err.message);
        });

};

const getConnections = () => {
    console.log("getConnections")
    const path = fs.DocumentDirectoryPath + '/Connection.json';
    fs.readFile(path)
        .then((res) => {
            console.log(res);
            return res;
        })
        .catch((err) => {
            console.log(err.message);
        });
};

export { setConnections, getConnections, fs };