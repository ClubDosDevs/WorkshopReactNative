import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { initializeApp } from "firebase/app";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "api-AIzaSyCWafheK3sKO2raRECYzIEZs7F_XnHmods",
  authDomain: "workshopreactnative.firebaseapp.com",
  databaseURL: "https://workshopreactnative.firebaseio.com",
  projectId: "workshopreactnative",
  storageBucket: "workshopreactnative.appspot.com",
  appId: "workshopreactnative",
};

initializeApp(firebaseConfig);

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
