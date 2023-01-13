import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";

export const PostsScreen = ({ route }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  console.log(posts);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.photo }} style={styles.item} />
        <Text style={styles.title}>Лес</Text>
        <View style={styles.descriptionCont}>
          <TouchableOpacity style={styles.commentCont}>
            <Feather
              name="message-circle"
              size={24}
              color="#BDBDBD"
              style={styles.commentIcon}
            />
            <Text style={styles.commentAmount}>158</Text>
          </TouchableOpacity>
          <View style={styles.locationCont}>
            <Feather
              name="map-pin"
              size={24}
              color="#BDBDBD"
              style={styles.locationIcon}
            />
            <Text style={styles.location}>Ukraine</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.userCont}>
        <View style={styles.avatar}></View>
        <View style={styles.nameCont}>
          <Text style={styles.name}>Natali Romanova</Text>
          <Text style={styles.email}>email@example.com</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  userCont: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 32,
    marginLeft: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: "#0000ff",
    borderRadius: 16,
    marginRight: 8,
  },
  nameCont: {
    justifyContent: "center",
  },
  name: {
    fontWeight: "700",
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  email: {
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },
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
