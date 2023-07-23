import React, { useEffect, useRef }  from 'react';
import { StyleSheet, SafeAreaView, View, Platform, StatusBar, BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';

const WebviewScreen = () => {
  const webViewRef = useRef(null);

  useEffect(() => {
    const backAction = () => {
      if (webViewRef.current) {
        // Check if WebView can go back
        webViewRef.current.goBack();
        return true;
      }

      // If WebView cannot go back, exit the app
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    // Clean up the event listener when the component unmounts
    return () => backHandler.remove();
  }, []);
  
  return (
    <View style={styles.container}>
      {Platform.OS === 'android' && <StatusBar translucent backgroundColor="transparent" />}
      <WebView
        source={{ uri: 'dev.to' }}
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    ...Platform.select({
      android: {
        marginTop: -StatusBar.currentHeight,
      },
    }),
  },
  webview: {
    flex: 1,
  },
});

export default WebviewScreen;
