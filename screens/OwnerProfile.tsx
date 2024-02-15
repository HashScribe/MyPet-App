import React from "react";
import { Image, ScrollView, View } from "react-native";
import { List, Text } from "react-native-paper";

const OwnerProfile = ({ route }: any) => {
  const { ownerDetails, image } = route.params;

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
        <Text variant="displayMedium">Owner Profile</Text>

        <Image
          source={{ uri: image }}
          style={{ width: 100, height: 100, borderRadius: 50, marginTop: 20 }}
        />

        <List.Section>
          <List.Subheader style={{ fontWeight: "bold", fontSize: 25 }}>
            {ownerDetails.Full_Name}
          </List.Subheader>

          <List.Item title={`Address: ${ownerDetails.Address}`} />

          <List.Item
            title={`Emergency Contact: ${ownerDetails.Emergency_Contact}`}
          />

          <List.Item title={`Payment Due: ${ownerDetails.Payment_Due}`} />

          <List.Item title={`Phone Number: ${ownerDetails.Phone_Number}`} />

          <List.Item
            title={`Preferred Language: ${ownerDetails.Preferred_Language}`}
          />

          <List.Item
            title={`RelationShip_to_Pet: ${ownerDetails.RelationShip_to_Pet}`}
          />
          <List.Item title={`email: ${ownerDetails.email}`} />
          {ownerDetails.pets.map(({ pet }: any) => (
            <List.Item title={`Pets: ${pet}`} />
          ))}
        </List.Section>
      </View>
    </ScrollView>
  );
};

export default OwnerProfile;
