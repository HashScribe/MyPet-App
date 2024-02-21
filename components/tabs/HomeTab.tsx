import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import PetProfile from "../../screens/PetProfile";
import OwnerProfile from "../../screens/OwnerProfile";
import HomePage from "../../screens/HomePage";

const Tab = createBottomTabNavigator();

const HomeTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomePage" component={HomePage} />
      <Tab.Screen name="OwnerProfile" component={OwnerProfile} />
    </Tab.Navigator>
  );
};

export default HomeTab;
