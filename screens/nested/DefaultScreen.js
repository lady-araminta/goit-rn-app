import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { PostItem } from "../../components/PostItem";
import { db } from "../../firebase/config";
import { selectAuthEmail } from "../../redux/auth/authSelectors";

export const DefaultScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const userEmail = useSelector(selectAuthEmail);

  const getAllPosts = async () => {
    const dbRef = collection(db, "posts");
    onSnapshot(dbRef, (docSnap) =>
      setPosts(docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
    // const querySnapshot = await getDocs(collection(db, "posts"));
    // const images = [];
    // querySnapshot.forEach((doc) => {
    //   images.push({ ...doc.data(), id: doc.id });
    //   setPosts(images);
    // });
    // return images;
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  const renderItem = ({ item }) => {
    return <PostItem item={item} navigation={navigation} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.userCont}>
        <View style={styles.avatar}></View>
        <View style={styles.nameCont}>
          <Text style={styles.name}>Natali Romanova</Text>
          <Text style={styles.email}>{userEmail}</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
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
