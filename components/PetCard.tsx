import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View, Image, Text, ScrollView, TouchableOpacity } from "react-native";
import { db } from "../config";
import Spacing from "../constants/Spacing";
import Colors from "../constants/Colors";
import { ActivityIndicator } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";

const PetCard = () => {
  const navigation: any = useNavigation();
  const [petData, setPetData] = useState([]);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAllPets = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "pet"));
        const pets: any = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          pets.push(doc.data());
        });
        setPetData(pets);
      } catch (err) {
        console.log("Error while fetching Pet Detaisl: ", err);
      } finally {
        setIsLoading(false);
      }
    };

    getAllPets();
  }, []);

  return (
    <View
      style={{
        backgroundColor: Colors.gray,
        paddingVertical: Spacing * 5,
      }}
    >
      {loading ? (
        <View
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <ScrollView>
          {petData.map(
            ({
              petName,
              id,
              breed,
              image,
              owner,
              species,
              color,
              dateOfBirth,
              identificationNumber,
              sex,
            }: any) => (
              <TouchableOpacity
                key={id}
                onPress={() =>
                  navigation.navigate("PetProfile", {
                    petDetails: {
                      petName,
                      breed,
                      owner,
                      species,
                      color,
                      dateOfBirth,
                      identificationNumber,
                      sex,
                    },
                    image,
                    petDoc: id,
                  })
                }
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "white",
                    justifyContent: "space-between",
                    paddingBottom: Spacing * 5,
                    marginBottom: Spacing * 8,
                    alignItems: "flex-start",
                    paddingHorizontal: Spacing * 2,
                    marginHorizontal: Spacing * 5,
                    height: Spacing * 30,
                    borderRadius: Spacing * 2,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 10,
                  }}
                >
                  <View>
                    <Image
                      source={{ uri: image }}
                      style={{
                        aspectRatio: 2 / 1,
                        width: "100%",
                        borderTopLeftRadius: Spacing * 2,
                        borderTopRightRadius: Spacing * 2,
                        marginTop: Spacing * 2,
                      }}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: Spacing * 3,
                      }}
                    >
                      {petName}
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>Breed: {breed}</Text>
                    <Text style={{ fontWeight: "bold" }}>Owner: {owner}</Text>
                    <Text style={{ fontWeight: "bold" }}>
                      Species: {species}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          )}
        </ScrollView>
      )}
    </View>
  );
};

export { PetCard };
