import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { Formik } from "formik";
import { useState } from "react";
import { Alert, Image, ScrollView, TouchableOpacity, View } from "react-native";
import { Button, List, Text, TextInput } from "react-native-paper";
import { addDoc, collection, db, firebase } from "../config/index";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";
import { serverTimestamp } from "firebase/firestore";

const OwnerProfileForm = ({ navigation }: any) => {
  const [image, setImage] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadMedia = async (): Promise<string> => {
    setUploading(true);

    try {
      const { uri } = await FileSystem.getInfoAsync(image);
      const blob: Blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response);
        };
        xhr.onerror = (e) => {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });

      const filename = image.substring(image.lastIndexOf("/") + 1);
      const ref = firebase.storage().ref().child(filename);

      await ref.put(blob);
      const downloadURL = await ref.getDownloadURL();
      setUploading(false);
      Alert.alert("Photo Uploaded!!");
      setImage("");
      return downloadURL;
    } catch (error) {
      console.log(error);
      setUploading(false);
      throw error;
    }
  };

  const addOwnerProfile = async (values: any) => {
    try {
      const docRef = await addDoc(collection(db, "owner"), {
        Full_Name: values.Full_Name,
        Address: values.Address,
        Emergency_Contact: values.Emergency_Contact,
        Payment_Due: values.Payment_Due,
        Phone_Number: values.Phone_Number,
        Preferred_Language: values.Preferred_Language,
        RelationShip_to_Pet: values.RelationShip_to_Pet,
        email: values.email,
        image: values.image, // Use the image URL here
        pets: values.pets,
        createdAt: serverTimestamp(),
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handlePress = async (values: any) => {
    try {
      let imageUrl = ""; // Initialize imageUrl

      // Upload image and get download URL
      if (image) {
        imageUrl = await uploadMedia();
      }

      // Add pet profile with imageUrl
      await addOwnerProfile({ ...values, image: imageUrl });

      navigation.navigate("PetProfileForm", {
        isOwner: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [expanded, setExpanded] = useState(true);

  const handleExpand = () => setExpanded(!expanded);

  return (
    <ScrollView>
      <View
        style={{
          padding: Spacing * 2,
          marginTop: 40,
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
              marginVertical: Spacing * 3,
            }}
          >
            Add Owner to Your Pet
          </Text>
          <Text
            style={{
              fontSize: FontSize.large,
              maxWidth: "60%",
              textAlign: "center",
              marginTop: Spacing * 2,
            }}
          >
            Please fill out the details below
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: Spacing * 8,
          paddingHorizontal: Spacing * 3,
        }}
      >
        <Formik
          initialValues={{
            Full_Name: "",
            Address: "",
            Emergency_Contact: "",
            Payment_Due: "",
            Phone_Number: "",
            Preferred_Language: "",
            RelationShip_to_Pet: "",
            email: "",
            pets: [],
            createdAt: serverTimestamp(),
          }}
          onSubmit={(values) => {
            //console.log(values);

            handlePress(values);
          }}
        >
          {(props) => (
            <View style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <TextInput
                mode="outlined"
                label="Full_Name"
                value={props.values.Full_Name}
                onChangeText={props.handleChange("Full_Name")}
              />
              <TextInput
                mode="outlined"
                label="Address"
                onChangeText={props.handleChange("Address")}
              />
              <TextInput
                mode="outlined"
                label="Emergency_Contact"
                onChangeText={props.handleChange("Emergency_Contact")}
              />
              <TextInput
                mode="outlined"
                label="Payment_Due"
                onChangeText={props.handleChange("Payment_Due")}
              />
              <TextInput
                mode="outlined"
                label="Phone_Number"
                onChangeText={props.handleChange("Phone_Number")}
              />
              <TextInput
                mode="outlined"
                label="Preferred_Language"
                onChangeText={props.handleChange("Preferred_Language")}
              />
              <TextInput
                mode="outlined"
                label="RelationShip_to_Pet"
                onChangeText={props.handleChange("RelationShip_to_Pet")}
              />
              <TextInput
                mode="outlined"
                label="email"
                onChangeText={props.handleChange("email")}
              />

              <View
                style={{
                  display: "flex",
                  backgroundColor: "red",
                  justifyContent: "space-around",
                }}
              ></View>
              <TouchableOpacity>
                <Button
                  icon="camera"
                  mode="contained"
                  onPress={pickImage}
                  style={{ backgroundColor: Colors.primary, width: 200 }}
                >
                  Pick Owner Profile Picture
                </Button>
              </TouchableOpacity>
              <View>
                {image && (
                  <Image
                    source={{ uri: image }}
                    style={{ width: 100, height: 100, borderRadius: 50 }}
                  />
                )}
              </View>
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
                  Add Owner
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default OwnerProfileForm;
