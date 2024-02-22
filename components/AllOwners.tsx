import React, { useEffect, useState } from "react";
import { DataTable, Text } from "react-native-paper";
import { collection, db, getDocs } from "../config/index";
import { ScrollView, TouchableOpacity } from "react-native";

const AllOwners = ({ navigation }: any) => {
  const [owners, setOwners] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAllOwners = async () => {
      try {
        setIsLoading(true);
        const ownerCollection = collection(db, "owner");
        const querySnapshot = await getDocs(ownerCollection);
        if (!querySnapshot.empty) {
          const ownersData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().Full_Name,
          }));
          setOwners(ownersData);
          console.log("All owners fetched:", ownersData);
        } else {
          console.log("No owner documents found.");
        }
      } catch (error) {
        console.error("Error fetching owners:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllOwners();
  }, []);

  const handleOwnerClick = (ownerName: any) => {
    navigation.navigate("PetProfileForm", { selectedOwner: ownerName });
  };

  return (
    <ScrollView>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title
            style={{ display: "flex", justifyContent: "center" }}
          >
            Owner Name
          </DataTable.Title>
        </DataTable.Header>
        {isLoading && <Text variant="displaySmall">Loading Owners....</Text>}
        {owners.map((owner: any) => (
          <TouchableOpacity
            onPress={() => handleOwnerClick(owner.name)}
            key={owner.id}
          >
            <DataTable.Row key={owner.id}>
              <DataTable.Cell
                style={{ display: "flex", justifyContent: "center" }}
              >
                {owner.name}
              </DataTable.Cell>
            </DataTable.Row>
          </TouchableOpacity>
        ))}
      </DataTable>
    </ScrollView>
  );
};

export default AllOwners;
