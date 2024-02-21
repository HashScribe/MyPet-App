import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import { Text, TextInput } from "react-native-paper";
import Spacing from "../constants/Spacing";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import { doc, collection, db, updateDoc } from "../config/index";
import { useNavigation, useRoute } from "@react-navigation/native"; // Import useNavigation and useRoute
import {
  DocumentData,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

const EditMedicalHistory = ({ navigation }: any) => {
  //const navigation = useNavigation();
  const route = useRoute();
  const { medicalID }: any = route.params;
  const [medicalHistory, setMedicalHistory] = useState<DocumentData | null>(
    null
  );

  useEffect(() => {
    const docRef = doc(collection(db, "medical-history"), medicalID);
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        setMedicalHistory({ id: doc.id, ...doc.data() });
      } else {
        console.log("Medical history document not found");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [medicalID]);

  const handleEditMedicalHistory = async (values: any) => {
    try {
      const docRef = doc(collection(db, "medical-history"), medicalID);
      await updateDoc(docRef, values);
      navigation.goBack();
    } catch (error) {
      console.error("Error updating medical history:", error);
    }
  };

  if (!medicalHistory) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ padding: Spacing * 4 }}>
      <Formik
        initialValues={medicalHistory}
        onSubmit={handleEditMedicalHistory}
      >
        {(props: any) => {
          return (
            <View style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <TextInput
                mode="outlined"
                label="description"
                multiline
                numberOfLines={4}
                onChangeText={props.handleChange("description")}
                value={props.values.description}
              />

              <TextInput
                mode="outlined"
                label="feeDue"
                onChangeText={props.handleChange("feeDue")}
                value={props.values.feeDue}
              />

              <TextInput
                mode="outlined"
                label="vaccination"
                onChangeText={props.handleChange("vaccination")}
                value={props.values.vaccination}
              />

              <TouchableOpacity
                onPress={props.handleSubmit}
                style={{
                  padding: Spacing * 2,
                  backgroundColor: Colors.primary,
                  marginVertical: Spacing * 3,
                  borderRadius: Spacing,
                  shadowColor: Colors.primary,
                  shadowOffset: { width: 0, height: Spacing },
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

export default EditMedicalHistory;
