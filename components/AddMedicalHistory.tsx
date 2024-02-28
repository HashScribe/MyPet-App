import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import { Text, TextInput } from "react-native-paper";
import Spacing from "../constants/Spacing";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import { addDoc, collection, db } from "../config/index";
import { useNavigation, useRoute } from "@react-navigation/native"; // Import useNavigation
import { serverTimestamp } from "firebase/firestore";

const AddMedicalHistory = ({ navigation }: any) => {
  //const navigation = useNavigation();
  const route = useRoute();
  const { petID }: any = route.params; // Extract petID from route params
  console.log("Received petID:", petID);

  const addMedicalHistory = async (values: any) => {
    try {
      const medicalHistoryData = {
        ...values,
        petID: petID,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "medical-history"), medicalHistoryData);
      //navigation.goBack(); // Navigate back to trigger the update
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handlePress = async (values: any) => {
    try {
      await addMedicalHistory(values);
      navigation.goBack();
    } catch (error) {
      console.log("cannot navigate", error);
    }
  };

  return (
    <View style={{ padding: Spacing * 4 }}>
      <Formik
        initialValues={{
          description: "",
          createdAt: serverTimestamp(),
          feeDue: "",
          vaccination: "",
          petID: " ",
        }}
        onSubmit={(values) => {
          console.log(values);
          handlePress(values);
        }}
      >
        {(props) => {
          return (
            <View style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <TextInput
                mode="outlined"
                label="description"
                multiline
                numberOfLines={4}
                value={props?.values.description}
                onChangeText={props.handleChange("description")}
              />

              <TextInput
                mode="outlined"
                label="feeDue"
                onChangeText={props.handleChange("feeDue")}
              />
              <TextInput
                mode="outlined"
                label="vaccination"
                onChangeText={props.handleChange("vaccination")}
              />

              <TouchableOpacity
                onPress={() => props.handleSubmit()}
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
                  Save Medical History
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </Formik>
    </View>
  );
};

export default AddMedicalHistory;
