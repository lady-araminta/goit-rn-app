import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, Image } from "react-native";
import { useSelector } from "react-redux";
import { PostItem } from "../../components/PostItem";
import { db } from "../../firebase/config";
import {
  selectAuthEmail,
  selectAvatar,
  selectUserName,
} from "../../redux/auth/authSelectors";

export const DefaultScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const userEmail = useSelector(selectAuthEmail);
  const userName = useSelector(selectUserName);
  const avatarRef = useSelector(selectAvatar);

  const getAllPosts = async () => {
    const dbRef = collection(db, "posts");
    onSnapshot(dbRef, (docSnap) =>
      setPosts(docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
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
        <View style={styles.avatar}>
          <Image style={styles.avatarImg} source={{ uri: avatarRef }} />
        </View>
        <View style={styles.nameCont}>
          <Text style={styles.name}>{userName}</Text>
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
    borderRadius: 30,
    marginRight: 8,
    backgroundColor: "#BDBDBD",
  },
  avatarImg: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: "#BDBDBD",
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
