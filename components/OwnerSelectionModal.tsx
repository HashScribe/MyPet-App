import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";

const OwnerSelectionModal = ({ onSelect }: any) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          backgroundColor: "white",
          padding: 20,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ marginBottom: 20 }}>Select Owner Type</Text>
        <TouchableOpacity onPress={() => onSelect(true)}>
          <Text style={{ marginBottom: 10 }}>Existing Owner</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onSelect(false)}>
          <Text>New Owner</Text>
        </TouchableOpacity>
        <Button onPress={() => onSelect(true)}>Cancel</Button>
      </View>
    </View>
  );
};

export default OwnerSelectionModal;
