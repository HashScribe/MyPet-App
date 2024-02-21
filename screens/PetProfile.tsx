import React from "react";
import { Image, ScrollView, View } from "react-native";
import { List, Text } from "react-native-paper";

const PetProfile = ({ route }: any) => {
  const { petDetails, image } = route.params;

  return (
    <ScrollView>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 30,
          height: "100%",
        }}
      >
        <Text variant="displayMedium">Pet Profile</Text>

        <Image
          source={{ uri: image }}
          style={{ width: 100, height: 100, borderRadius: 50, marginTop: 20 }}
        />

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
              <List.Icon icon={require("../assets/calendar_833634.png")} />
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
            left={() => <List.Icon icon={require("../assets/genders.png")} />}
          />

          <List.Item
            title={`IDENTIFICATION NUMBER: ${petDetails.identificationNumber}`}
            left={() => (
              <List.Icon icon={require("../assets/number-blocks.png")} />
            )}
          />
        </List.Section>
      </View>
    </ScrollView>
  );
};

export default PetProfile;
