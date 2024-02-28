import React, { useEffect, useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { List, Text } from "react-native-paper";
import Spacing from "../constants/Spacing";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import {
  collection,
  db,
  doc,
  getDocs,
  query,
  where,
  getDoc,
} from "../config/index";
import { Timestamp, onSnapshot } from "firebase/firestore";
import { Avatar, Button, Card } from "react-native-paper";
import { white } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

const PetProfile = ({ route, navigation }: any) => {
  const { petDetails, image, petDoc } = route?.params;

  const [medicalHistory, setMedicalHistory] = useState([]);
  const [medicalID, setMedicalID] = useState("");

  useEffect(() => {
    console.log("PET ID: " + petDoc);
    if (!petDoc) {
      return;
    }

    const fetchMedicalHistory = async () => {
      try {
        const historyQuery = query(
          collection(db, "medical-history"),
          where("petID", "==", petDoc)
        );
        const unsubscribe = onSnapshot(historyQuery, (snapshot) => {
          const historyData: any = [];
          snapshot.forEach((doc) => {
            historyData.push({ id: doc.id, ...doc.data() });
          });
          if (historyData.length > 0) {
            setMedicalID(historyData[0].id); // Set the medicalID here
            setMedicalHistory(historyData);
          } else {
            setMedicalID(""); // Reset medicalID if no history found
            setMedicalHistory([]);
          }
        });

        return unsubscribe; // Cleanup function for unsubscribe
      } catch (error) {
        console.error("Error fetching medical history:", error);
      }
    };

    fetchMedicalHistory();
  }, [petDoc]);

  const formatDate = (timestamp: any) => {
    if (timestamp && timestamp.toDate) {
      const date = timestamp.toDate();
      return date.toLocaleString(); // Adjust format as needed
    }
    return "Unknown Date"; // Return a default value if createdAt is null or undefined
  };

  // console.log("pet id", petDoc);
  // console.log("new medical history id: ", medicalID);

  const handleEditMedicalHistory = async () => {
    try {
      if (!medicalID) {
        console.error("Error: medicalID is empty or undefined");
        return;
      }
      navigation.navigate("EditMedicalHistory", { medicalID });
    } catch (error) {
      console.error("Error navigating to EditMedicalHistory:", error);
    }
  };
  return (
    <>
      <ScrollView>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 30,
            height: "100%",
            width: "100%",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              columnGap: Spacing * 8,
            }}
          >
            <View>
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    marginTop: 20,
                  }}
                />
              ) : (
                <Text>Image not Found</Text>
              )}
            </View>

            <View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("AddMedicalHistory", {
                    petID: petDoc,
                  })
                }
                style={{
                  alignSelf: "flex-end",
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
                  Add Medical History
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {petDetails && (
            <View style={{ paddingTop: Spacing * 8 }}>
              <List.Section>
                <List.Subheader style={{ fontWeight: "bold", fontSize: 25 }}>
                  {petDetails.petName}
                </List.Subheader>

                <List.Item
                  title={`BREED: ${petDetails.breed}`}
                  left={() => (
                    <List.Icon
                      icon={require("../assets/elizabethan-collar_7129182.png")}
                    />
                  )}
                />

                <List.Item
                  title={`DOB: ${petDetails.dateOfBirth}`}
                  left={() => (
                    <List.Icon
                      icon={require("../assets/calendar_833634.png")}
                    />
                  )}
                />

                <List.Item
                  title={`COLOR: ${petDetails.color}`}
                  left={() => (
                    <List.Icon icon={require("../assets/color-wheel.png")} />
                  )}
                />

                <List.Item
                  title={`SPECIES: ${petDetails.species}`}
                  left={() => (
                    <List.Icon icon={require("../assets/phylogenetic.png")} />
                  )}
                />

                <List.Item
                  title={`GENDER: ${petDetails.sex}`}
                  left={() => (
                    <List.Icon icon={require("../assets/genders.png")} />
                  )}
                />

                <List.Item
                  title={`IDENTIFICATION NUMBER: ${petDetails.identificationNumber}`}
                  left={() => (
                    <List.Icon icon={require("../assets/number-blocks.png")} />
                  )}
                />
                <List.Item
                  title={`PET OWNER: ${petDetails.owner || "No Owner"}`}
                  left={() => (
                    <List.Icon icon={require("../assets/Owner.png")} />
                  )}
                />
              </List.Section>
            </View>
          )}
          <View>
            <ScrollView>
              <View
                style={{
                  width: Spacing * 42,
                  marginTop: Spacing * 8,
                  alignItems: "center",
                }}
              >
                {medicalHistory.length > 0 && (
                  <>
                    <Text variant="displaySmall">Medical History</Text>
                    {medicalHistory
                      .slice()
                      .filter((history: any) => history.createdAt)
                      .sort((a: any, b: any) => {
                        const timestampA = a.createdAt.toMillis();
                        const timestampB = b.createdAt.toMillis();
                        return timestampB - timestampA;
                      })
                      .map((history: any) => (
                        <Card
                          key={history.id}
                          style={{
                            width: "100%",
                            margin: Spacing * 2,
                            backgroundColor: "white",
                            borderRadius: Spacing * 2,
                            minHeight: Spacing * 24,
                            shadowColor: "black",
                            shadowOffset: {
                              width: 0,
                              height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,

                            elevation: 10,
                          }}
                        >
                          <Card.Content style={{ margin: Spacing }}>
                            <Text variant="bodyMedium">
                              <Text style={{ fontWeight: "bold" }}>
                                Vaccination
                              </Text>
                              {": "} {history.vaccination}
                            </Text>
                            <Text
                              variant="bodyMedium"
                              style={{ marginVertical: Spacing * 2 }}
                            >
                              <Text style={{ fontWeight: "bold" }}>
                                Description
                              </Text>
                              {": "}
                              {history.description}
                            </Text>
                            <Text variant="bodyMedium">
                              <Text style={{ fontWeight: "bold" }}>
                                Fee Due
                              </Text>
                              {": "}
                              {history.feeDue}
                            </Text>
                            <Text
                              variant="bodyMedium"
                              style={{ marginTop: Spacing * 2 }}
                            >
                              <Text style={{ fontWeight: "bold" }}>
                                Created At
                              </Text>
                              {": "}
                              {formatDate(history.createdAt)}
                            </Text>
                          </Card.Content>
                        </Card>
                      ))}
                  </>
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default PetProfile;
