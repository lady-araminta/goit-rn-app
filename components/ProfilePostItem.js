import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";

export const ProfilePostItem = ({ item, navigation }) => {
  const deletePost = async () => {
    try {
      const postId = item.id;
      const dbRef = doc(db, "posts", postId);
      await deleteDoc(dbRef);
    } catch (error) {
      console.log("Помилка видалення посту", error.message);
    }
  };
  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.photo }} style={styles.item} />
      <TouchableOpacity style={styles.trashBtn} onPress={deletePost}>
        <AntDesign name="delete" size={24} color="#BDBDBD" />
      </TouchableOpacity>
      <Text style={styles.title}>{item.description}</Text>
      <View style={styles.descriptionCont}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.commentCont}
            onPress={() =>
              navigation.navigate("CommentsScreen", {
                postId: item.id,
                photo: item.photo,
              })
            }
          >
            <Feather
              name="message-circle"
              size={24}
              color={item.comments ? "#FF6C00" : "#BDBDBD"}
              style={styles.commentIcon}
            />
            <Text style={styles.commentAmount}>{item.comments || 0}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.likeCont}>
            <Feather
              name="thumbs-up"
              size={22}
              color="#BDBDBD"
              style={styles.likeIcon}
            />
            <Text style={styles.likeAmount}>{item.likes}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.locationCont}
          onPress={() =>
            navigation.navigate("MapScreen", { location: item.location })
          }
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
    position: "relative",
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
    marginRight: 24,
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
  likeCont: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  likeIcon: {
    marginRight: 6,
  },
  likeAmount: {
    fontSize: 16,
    lineHeight: 18.75,
    color: "#212121",
  },
  trashBtn: {
    position: "absolute",
    top: 8,
    right: 8,
  },
});
