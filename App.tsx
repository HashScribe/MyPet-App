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
import AddMedicalHistory from "./components/AddMedicalHistory";
import EditMedicalHistory from "./components/EditMedicalHistory";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";
import Colors from "./constants/Colors";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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
          <Stack.Screen name="HomePage" component={MainStackNavigator} />
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
        <Stack.Screen name="AddMedicalHistory" component={AddMedicalHistory} />
        <Stack.Screen
          name="EditMedicalHistory"
          component={EditMedicalHistory}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeTab" component={HomeTabNavigator} />
    </Stack.Navigator>
  );
};

const HomeTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.background,
        },
        tabBarActiveTintColor: Colors.text,
        headerShadowVisible: false,
      }}
    >
      <Tab.Screen
        name="HomePage"
        component={HomePage}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialIcons
              name={focused ? "home" : "home"} // Change to your desired icon names
              size={size}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="QRCodeScanner"
        component={QRCodeScannerScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name={focused ? "qrcode-scan" : "qrcode-scan"}
              size={size}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="PetProfileForm"
        component={PetProfileForm}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialIcons
              name={focused ? "pets" : "pets"}
              size={size}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="OwnerProfileForm"
        component={OwnerProfileForm}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Entypo
              name={focused ? "user" : "user"}
              size={size}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};
