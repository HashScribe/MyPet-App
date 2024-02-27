import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import { Button, RadioButton, Text, TextInput } from "react-native-paper";
import {
  addDoc,
  collection,
  db,
  firebase,
  doc,
  getDocs,
  query,
  orderBy,
  limit,
  getDoc,
} from "../config/index";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";
import { useRoute, RouteProp } from "@react-navigation/native";
import OwnerSelectionModal from "./OwnerSelectionModal";
import {
  DocumentReference,
  Firestore,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";

const PetProfileForm = ({ navigation, route }: any) => {
  // const { petDoc } = route?.params;

  const [image, setImage] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const routes = useRoute<any>();
  const owner = route?.params;

  const [lastAddedOwnerName, setLastAddedOwnerName] = useState<string>("");

  useEffect(() => {
    console.log("From PetProfileForm: ", owner?.isOwner);
    if (!owner?.isOwner) {
      return;
    }

    const fetchLastAddedOwner = async () => {
      try {
        const ownerQuery = query(
          collection(db, "owner"),
          orderBy("createdAt", "desc"),
          limit(1)
        );
        const querySnapshot = await getDocs(ownerQuery);
        if (!querySnapshot.empty) {
          const lastAddedOwnerData = querySnapshot.docs[0].data();
          const addedOwnerName = lastAddedOwnerData.Full_Name;
          setLastAddedOwnerName(addedOwnerName);
          console.log("Last added owner fetched:", lastAddedOwnerData);
        } else {
          console.log("No owner documents found.");
        }
      } catch (error) {
        console.error("Error fetching last added owner:", error);
      }
    };

    (async () => await fetchLastAddedOwner())();
  }, [owner?.isOwner]);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleOwnerSelection = (isExistingOwner: boolean) => {
    if (isExistingOwner) {
      console.log("Alll Owner Selected");
      navigation.navigate("AllOwner");
    } else {
      console.log("New Owner Selected");
      navigation.navigate("OwnerProfileForm");
    }

    setIsModalVisible(false);
  };

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
      console.log("uploadMedia error:", error);
      setUploading(false);
      throw error;
    }
  };

  const selectedOwner = route?.params?.selectedOwner || "";

  const addPetProfile = async (values: any): Promise<DocumentReference> => {
    try {
      const docRef = await addDoc(collection(db, "pet"), {
        petName: values.petName,
        breed: values.breed,
        dateOfBirth: values.dateOfBirth,
        color: values.color,
        species: values.species,
        sex: values.sex,
        identificationNumber: values.identificationNumber,
        image: values.image, // Use the image URL here
        owner: values.selectedOwner || values.lastAddedOwnerName,
      });
      console.log("Document written with ID: ", docRef.id);
      return docRef;
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    }
  };

  const handlePress = async (values: any) => {
    try {
      let imageUrl = "";

      if (image) {
        imageUrl = await uploadMedia();
      }

      const docRef = await addPetProfile({
        ...values,
        image: imageUrl,
        lastAddedOwnerName,
        selectedOwner,
      });
      console.log("new pet id", docRef.id);
      navigation.navigate("PetProfile", {
        petDetails: values,
        image,
        lastAddedOwnerName,
        selectedOwner,
        petDoc: docRef.id,
      });
    } catch (error) {
      console.log(error);
    }
  };

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
            Create A Pet
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
            petName: "",
            breed: "",
            dateOfBirth: "",
            color: "",
            species: "",
            sex: "",
            identificationNumber: "",
            selectedOwner,
          }}
          onSubmit={(values: any, { resetForm }) => {
            console.log(values);

            handlePress(values);
            resetForm({
              values: {
                petName: "",
                breed: "",
                dateOfBirth: "",
                color: "",
                species: "",
                sex: "",
                identificationNumber: "",
                selectedOwner,
              },
            });
          }}
        >
          {(props) => {
            return (
              <View
                style={{ display: "flex", flexDirection: "column", gap: 20 }}
              >
                <TextInput
                  mode="outlined"
                  label="petName"
                  value={props.values.petName}
                  onChangeText={props.handleChange("petName")}
                />
                <TextInput
                  mode="outlined"
                  label="breed"
                  value={props.values.breed}
                  onChangeText={props.handleChange("breed")}
                />
                <TextInput
                  mode="outlined"
                  label="dateOfBirth"
                  value={props.values.dateOfBirth}
                  onChangeText={props.handleChange("dateOfBirth")}
                />
                <TextInput
                  mode="outlined"
                  label="color"
                  value={props.values.color}
                  onChangeText={props.handleChange("color")}
                />
                <TextInput
                  mode="outlined"
                  label="species"
                  value={props.values.species}
                  onChangeText={props.handleChange("species")}
                />
                <View style={{ marginTop: Spacing }}>
                  <Text variant="titleLarge">Gender</Text>
                  <RadioButton.Group
                    onValueChange={(value) => props.setFieldValue("sex", value)}
                    value={props.values.sex}
                  >
                    <RadioButton.Item label="Male" value="Male" />
                    <RadioButton.Item label="Female" value="Female" />
                  </RadioButton.Group>
                </View>

                <TextInput
                  mode="outlined"
                  label="identificationNumber"
                  value={props.values.identificationNumber}
                  onChangeText={props.handleChange("identificationNumber")}
                />

                <TouchableOpacity onPress={toggleModal}>
                  <Button mode="outlined">Pet Owner</Button>
                </TouchableOpacity>

                <Text variant="bodyLarge">
                  Owner Name: {lastAddedOwnerName || "" || selectedOwner}
                </Text>

                <Modal
                  visible={isModalVisible}
                  animationType="slide"
                  transparent={true}
                  onRequestClose={toggleModal}
                >
                  <OwnerSelectionModal
                    onSelect={(isExistingOwner: boolean) =>
                      handleOwnerSelection(isExistingOwner)
                    }
                  />
                </Modal>

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
                    disabled={uploading}
                  >
                    {uploading ? "Uploading..." : "Pick Pet Profile Picture"}
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
                    Create Pet
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default PetProfileForm;
