import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUserId } from "../redux/auth/authSelectors";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export const PostItem = ({ item, navigation }) => {
  const [isLike, setIsLike] = useState(false);
  const currentUser = useSelector(selectUserId);
  const toggleLike = () => {
    if (currentUser !== item.userId) {
      if (!isLike) {
        setIsLike(true);
        likeIncrement();
      } else {
        setIsLike(false);
        likeDecrement();
      }
    } else {
      Alert.alert("It is your post!");
      return;
    }
  };
  const likeIncrement = async () => {
    const likeAmount = item.likes;
    const postId = item.id;
    try {
      const dbRef = doc(db, "posts", postId);
      await updateDoc(dbRef, { likes: likeAmount + 1 });
    } catch (error) {
      console.log("Помилка при додаванні лайка", error.message);
    }
  };
  const likeDecrement = async () => {
    const likeAmount = item.likes;
    const postId = item.id;
    try {
      const dbRef = doc(db, "posts", postId);
      await updateDoc(dbRef, { likes: likeAmount - 1 });
    } catch (error) {
      console.log("Помилка при знятті лайка", error.message);
    }
  };
  return (
    <View style={styles.itemContainer}>
      <View style={styles.authorCont}>
        {item.userName ? (
          <Text style={styles.authorName}>{item.userName}</Text>
        ) : (
          <Text style={styles.authorName}>Anonimous</Text>
        )}
        {item.avatar ? (
          <Image style={styles.authorAvatar} source={{ uri: item.avatar }} />
        ) : (
          <View style={styles.authorAvatar}></View>
        )}
      </View>
      <Image source={{ uri: item.photo }} style={styles.item} />
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
          <TouchableOpacity style={styles.likeCont} onPress={toggleLike}>
            <Feather
              name="thumbs-up"
              size={22}
              color={isLike ? "#FF6C00" : "#BDBDBD"}
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
  authorCont: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 8,
  },
  authorAvatar: {
    backgroundColor: "#E8E8E8",
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  authorName: {
    marginRight: 4,
    fontSize: 11,
    lineHeight: 13,
    fontWeight: "700",
  },
});
