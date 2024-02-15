import { SafeAreaView } from "react-native";
import { WelcomePage } from "./screens/WelcomePage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { LoginPage } from "./screens/LoginPage";
// import RegisterPage from "./screens/RegisterPage";
import background from "./constants/Colors";
import HomePage from "./screens/HomePage";
import PetProfileForm from "./components/PetProfileForm";
import PetProfile from "./screens/PetProfile";
import QRCodeScannerScreen from "./components/QRCodeScannerScreen";
import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./config";
import OwnerProfileForm from "./components/OwnerProfileForm";
import OwnerProfile from "./screens/OwnerProfile";
import AllOwners from "./components/AllOwners";

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: background.background,
  },
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log("user", user);
      setUser(user);
    });
  }, []);

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator initialRouteName="WelcomePage">
        {user ? (
          <Stack.Screen name="HomePage" component={HomePage} />
        ) : (
          <Stack.Screen name="LoginPage" component={LoginPage} />
        )}
        <Stack.Screen name="WelcomePage" component={WelcomePage} />
        <Stack.Screen name="OwnerProfileForm" component={OwnerProfileForm} />
        <Stack.Screen name="AllOwner" component={AllOwners} />
        <Stack.Screen name="OwnerProfile" component={OwnerProfile} />
        <Stack.Screen name="PetProfileForm" component={PetProfileForm} />
        <Stack.Screen name="PetProfile" component={PetProfile} />
        <Stack.Screen name="QRCodeScanner" component={QRCodeScannerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
