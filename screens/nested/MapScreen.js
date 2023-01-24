import React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";

export const MapScreen = ({ route }) => {
  const { longitude, latitude } = route.params.location;
  return (
    <View
      style={styles.container}
      initialRegion={{
        latitude,
        longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.006,
      }}
    >
      <MapView style={styles.map} minZoomLevel={17}>
        <Marker coordinate={{ longitude, latitude }} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
