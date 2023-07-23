import React, { useEffect, useRef } from 'react';
import { BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';

const App = () => {
  const webViewRef = useRef(null);

  useEffect(() => {
    const backAction = () => {
      if (webViewRef.current) {
        // Check if WebView can go back
        webViewRef.current.goBack();
        return true;
      }

      // If WebView cannot go back, prevent the app from exiting
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    // Clean up the event listener when the component unmounts
    return () => backHandler.remove();
  }, []);

  const onShouldStartLoadWithRequest = (event) => {
    // This function will be called when the WebView is about to load a new URL
    // You can use this to prevent certain URLs from loading if needed

    // In this example, we allow all URLs to load
    return true;
  };

  return (
    <WebView
      ref={webViewRef}
      source={{ uri: 'dev.to' }}
      style={{ flex: 1 }}
      onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
    />
  );
};

export default App;
