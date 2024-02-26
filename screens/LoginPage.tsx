import { Ionicons } from "@expo/vector-icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Formik } from "formik";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ActivityIndicator, TextInput } from "react-native-paper";
import { FIREBASE_AUTH } from "../config";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";

const LoginPage: React.FC<{}> = ({ navigation }: any) => {
  const auth = FIREBASE_AUTH;
  const [loading, setIsLoading] = useState(false);

  const handlePress = async (values: any) => {
    setIsLoading(true);
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      console.log(response);

      navigation.navigate("HomePage");
    } catch (error: any) {
      console.log(error);
      Alert.alert(
        "Login unsuccessful. Verify your username and password, and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView>
      <SafeAreaView>
        <View
          style={{
            paddingHorizontal: Spacing * 2,
          }}
        >
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: FontSize.xLarge,
                color: Colors.primary,
                fontWeight: "bold",
                marginVertical: Spacing,
              }}
            >
              Login here
            </Text>
            <Text
              style={{
                fontSize: FontSize.large,
                maxWidth: "60%",
                textAlign: "center",
                marginTop: Spacing,
                fontWeight: "300",
              }}
            >
              Welcome back you've been missed!
            </Text>
          </View>
          <View
            style={{
              marginTop: Spacing * 4,
            }}
          >
            <KeyboardAvoidingView behavior="padding">
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                onSubmit={(values) => {
                  navigation.navigate("HomePage", {
                    email: values.email,
                  });
                }}
              >
                {(props) => (
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 20,
                    }}
                  >
                    <TextInput
                      mode="outlined"
                      label="Email"
                      value={props.values.email}
                      onChangeText={props.handleChange("email")}
                      autoCapitalize="none"
                    />
                    <TextInput
                      mode="outlined"
                      label="Password"
                      value={props.values.password}
                      onChangeText={props.handleChange("password")}
                      secureTextEntry={true}
                    />
                    {loading ? (
                      <ActivityIndicator size="large" color="#0000ff" />
                    ) : (
                      <TouchableOpacity
                        onPress={() => handlePress(props.values)}
                        style={{
                          padding: Spacing * 2,
                          backgroundColor: Colors.primary,
                          marginVertical: Spacing * 3,
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
                            textAlign: "center",
                            fontSize: FontSize.large,
                          }}
                        >
                          Sign in
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}
              </Formik>
            </KeyboardAvoidingView>
          </View>

          <View>
            <Text
              style={{
                fontSize: FontSize.small,
                color: Colors.primary,
                alignSelf: "flex-end",
              }}
            >
              Forgot your password ?
            </Text>
          </View>

          <View
            style={{
              marginVertical: Spacing * 3,
            }}
          >
            <Text
              style={{
                color: Colors.primary,
                textAlign: "center",
                fontSize: FontSize.small,
              }}
            >
              Or continue with
            </Text>

            <View
              style={{
                marginTop: Spacing * 2,
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  padding: Spacing,
                  backgroundColor: Colors.gray,
                  borderRadius: Spacing / 2,
                  marginHorizontal: Spacing,
                }}
              >
                <Ionicons
                  name="logo-google"
                  color={Colors.text}
                  size={Spacing * 2}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  padding: Spacing,
                  backgroundColor: Colors.gray,
                  borderRadius: Spacing / 2,
                  marginHorizontal: Spacing,
                }}
              >
                <Ionicons
                  name="logo-apple"
                  color={Colors.text}
                  size={Spacing * 2}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  padding: Spacing,
                  backgroundColor: Colors.gray,
                  borderRadius: Spacing / 2,
                  marginHorizontal: Spacing,
                }}
              >
                <Ionicons
                  name="logo-facebook"
                  color={Colors.text}
                  size={Spacing * 2}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export { LoginPage };
