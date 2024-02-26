import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import { Button } from "react-native-paper";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";

type RootStackParamList = {
  WelcomPage: undefined;
  LoginPage: undefined;
  RegisterPage: undefined;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "LoginPage">;
};

const WelcomePage = ({ navigation }: Props) => {
  const { height } = Dimensions.get("window");
  return (
    <SafeAreaView>
      <View>
        <ImageBackground
          style={{
            height: height / 2.5,
          }}
          resizeMode="contain"
          source={require("../assets/images/welcome-image.jpg")}
        />
        <View
          style={{ paddingHorizontal: Spacing * 4, paddingTop: Spacing * 4 }}
        >
          <Text
            style={{
              fontSize: FontSize.xxLarge,
              color: Colors.primary,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Find the Perfect Job for You at the My Pet App!
          </Text>

          <Text
            style={{
              fontSize: FontSize.small,
              color: Colors.text,
              textAlign: "center",
              marginTop: Spacing * 2,
            }}
          >
            Explore Diverse Veterinary Roles Tailored to Your Interests and
            Expertise
          </Text>
        </View>
        <View
          style={{
            paddingHorizontal: Spacing * 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: Spacing * 2,
          }}
        >
          <Button
            style={{
              paddingVertical: Spacing * 1.5,
              paddingHorizontal: Spacing * 2,
              width: "48%",
              borderRadius: Spacing,
            }}
            mode="contained"
            buttonColor={Colors.primary}
            onPress={() => navigation.navigate("LoginPage")}
          >
            Get Started
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export { WelcomePage };
