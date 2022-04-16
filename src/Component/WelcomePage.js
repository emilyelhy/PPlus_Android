/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import {
   SafeAreaView,
   Text,
   useColorScheme,
   View,
 } from 'react-native';
 import Clipboard from '@react-native-community/clipboard';
 import Entypo from 'react-native-vector-icons/Entypo';
 import FlashMessage from "react-native-flash-message";
 import { showMessage } from "react-native-flash-message";
 
 export default function WelcomePage()  {
   const isDarkMode = useColorScheme() === 'dark';
 
   const backgroundStyle = {
     flex: 1,
     backgroundColor: "#DAE2E1",
   };

  const CopyLink = () => {
    Clipboard.setString("https://www.pplus.com/windows/install");
    showMessage({ message: "Copied to clipboard" });
  }
 
   return (
     <SafeAreaView style={backgroundStyle}>
       <View style={{ justifyContent: "space-evenly", flex: 1 }}>
         <FlashMessage position="bottom" />
         <Text style={{ fontSize: 40, fontWeight: "600", color: "#7B8D93", textAlign: "center" }}>Welcome{"\n"}to PPlus</Text>
         <Text style={{ fontSize: 20, fontWeight: "400", color: "#7B8D93", textAlign: "center" }}>Please enter the following{"\n"}information to finish initial pairing</Text>
         <View>
           <Text style={{ fontSize: 15, fontWeight: "400", color: "#7B8D93", textAlign: "center" }}>Not yet install PPlus PC host?</Text>
           <Entypo.Button name="share" backgroundColor="#DAE2E1" justifyContent="center" onPress={CopyLink} iconStyle={{ color: "#7B8D93", marginRight: 3, marginTop: 0 }}>
             <Text style={{ color: '#7B8D93', fontSize: 15, textDecorationLine: 'underline' }}>
               SHARE INSTALLATION LINK
             </Text>
           </Entypo.Button>
         </View>
       </View>
     </SafeAreaView>
   );
 };
