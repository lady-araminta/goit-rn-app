import { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { PostItem } from "../../components/PostItem";

export const DefaultScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  console.log(posts);

  const renderItem = ({ item }) => {
    return <PostItem item={item} navigation={navigation} />;
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
});
