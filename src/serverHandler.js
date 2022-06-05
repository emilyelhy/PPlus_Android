const onAnswer = async (peerConnection, answer) => {
    try{
        await peerConnection.setRemoteDescription(answer);
        console.log("[serverHandler.js] setRemoteDescription complete");
        return true;
    } catch (e) {
        console.log("[serverHandler.js] Failed to set remote description: " + e);
        return false;
    }
}

export { onAnswer };