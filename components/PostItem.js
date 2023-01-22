import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

export const PostItem = ({ item, navigation }) => {
  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.photo }} style={styles.item} />
      <Text style={styles.title}>{item.description}</Text>
      <View style={styles.descriptionCont}>
        <TouchableOpacity
          style={styles.commentCont}
          onPress={() => navigation.navigate("CommentsScreen")}
        >
          <Feather
            name="message-circle"
            size={24}
            color="#BDBDBD"
            style={styles.commentIcon}
          />
          <Text style={styles.commentAmount}>158</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.locationCont}
          onPress={() => navigation.navigate("MapScreen")}
        >
          <Feather
            name="map-pin"
            size={24}
            color="#BDBDBD"
            style={styles.locationIcon}
          />
          <Text style={styles.location}>{item.place}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginHorizontal: 16,
    marginBottom: 32,
  },
  item: {
    height: 240,
    borderRadius: 8,
  },
  title: {
    marginVertical: 8,
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#212121",
  },
  descriptionCont: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  commentCont: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  commentIcon: {
    marginRight: 6,
  },
  commentAmount: {
    fontSize: 16,
    lineHeight: 18.75,
    color: "#212121",
  },
  locationCont: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  locationIcon: {
    marginRight: 4,
  },
  location: {
    fontSize: 16,
    lineHeight: 18.75,
    color: "#212121",
  },
});
