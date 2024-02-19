import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { getDoc, doc, collection } from "firebase/firestore";
import { db } from "../config";

const QRCodeScannerScreen = ({ navigation }: any) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      console.log("Camera Permission Status:", status);
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }: any) => {
    setScanned(true);

    try {
      const petDocRef = doc(collection(db, "pet"), data);
      const petDocSnapshot = await getDoc(petDocRef);

      if (petDocSnapshot.exists()) {
        const petDetails = petDocSnapshot.data();
        const image = petDetails.image;
        console.log(petDocRef.id);
        navigation.navigate("PetProfile", {
          petDetails,
          image: image,
          petDoc: petDocRef.id,
        });
      } else {
        console.log("Pet not found");
        console.log(petDocRef.id);
        navigation.navigate("PetProfileForm", { petDoc: petDocRef.id });
      }
    } catch (error) {
      console.error("from QRCODE SCANNER Error fetching pet details:", error);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});

export default QRCodeScannerScreen;
