import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";
import { FIREBASE_AUTH } from "../config";

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
    <SafeAreaView style={{ height: "100%" }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          height: Spacing * 8,
        }}
      >
        <View>
          <TouchableOpacity
            onPress={handleLogout}
            style={{
              backgroundColor: Colors.primary,
              padding: Spacing * 2,
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
        <View>
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
      </View>
    </SafeAreaView>
  );
};

export default HomePage;
