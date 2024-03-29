import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";
import { FIREBASE_AUTH, collection, db, doc, getDoc } from "../config";
import QRCodeScannerScreen from "../components/QRCodeScannerScreen";
import { PetCard } from "../components/PetCard";
import { Searchbar } from "react-native-paper";
import { useEffect, useState } from "react";

const HomePage = ({ navigation }: any) => {
  const handleLogout = async () => {
    try {
      await FIREBASE_AUTH.signOut();
      navigation.navigate("LoginPage");
    } catch (error: any) {
      console.log("Error signing out:", error.message);
    }
  };

  return (
    <>
      <SafeAreaView
        style={{
          height: "100%",
          padding: -Spacing * 3.5,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            paddingLeft: Spacing,
          }}
        >
          <View>
            <TouchableOpacity
              onPress={handleLogout}
              style={{
                backgroundColor: Colors.primary,
                padding: Spacing * 2,
                marginTop: Spacing * 5,
                borderRadius: Spacing,
                shadowColor: Colors.primary,
                shadowOffset: {
                  width: 0,
                  height: Spacing,
                },
                shadowOpacity: 0.3,
                shadowRadius: Spacing,
              }}
            >
              <Text
                style={{
                  color: Colors.onPrimary,
                  fontSize: FontSize.large,
                  display: "flex",
                  alignItems: "center",
                  paddingHorizontal: Spacing * 4,
                }}
              >
                Logout
              </Text>
            </TouchableOpacity>
          </View>
          {/* <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("QRCodeScanner")}
              style={{
                backgroundColor: Colors.primary,
                borderRadius: Spacing,
                padding: Spacing * 2,
                shadowColor: Colors.primary,
                shadowOffset: {
                  width: 0,
                  height: Spacing,
                },
                shadowOpacity: 0.3,
                shadowRadius: Spacing,
              }}
            >
              <Text
                style={{
                  color: Colors.onPrimary,
                  fontSize: FontSize.large,
                  display: "flex",
                  alignItems: "center",
                  paddingHorizontal: Spacing * 4,
                }}
              >
                Create Pet
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("OwnerProfileForm")}
              style={{
                backgroundColor: Colors.primary,
                borderRadius: Spacing,
                padding: Spacing * 2,
                shadowColor: Colors.primary,
                shadowOffset: {
                  width: 0,
                  height: Spacing,
                },
                shadowOpacity: 0.3,
                shadowRadius: Spacing,
              }}
            >
              <Text
                style={{
                  color: Colors.onPrimary,
                  fontSize: FontSize.large,
                  display: "flex",
                  alignItems: "center",
                  paddingHorizontal: Spacing * 4,
                }}
              >
                Add Owner
              </Text>
            </TouchableOpacity>
          </View> */}
        </View>

        <View>
          <PetCard />
        </View>
      </SafeAreaView>
    </>
  );
};

export default HomePage;
