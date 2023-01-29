import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/authOperations";
import {
  selectAvatar,
  selectUserId,
  selectUserName,
} from "../../redux/auth/authSelectors";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useState } from "react";
import { useEffect } from "react";
import { ProfilePostItem } from "../../components/ProfilePostItem";

export const ProfileScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const currentUser = useSelector(selectUserId);
  const userName = useSelector(selectUserName);
  const avatar = useSelector(selectAvatar);
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(logout());
  };
  const fetchPostsByCurrentUser = () => {
    const dbRef = collection(db, "posts");
    const searchQuery = query(dbRef, where("userId", "==", currentUser));
    onSnapshot(searchQuery, (docSnap) =>
      setPosts(docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  };

  useEffect(() => {
    fetchPostsByCurrentUser();
  }, []);

  const renderItem = ({ item }) => {
    return <ProfilePostItem item={item} navigation={navigation} />;
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ImageBackground
        source={require("../../assets/images/bgphoto.jpg")}
        style={styles.image}
      >
        <View style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.avatar}>
              {avatar && (
                <Image style={styles.uploadAvatar} source={{ uri: avatar }} />
              )}
              {/* <TouchableOpacity style={styles.deleteAvatarIcon}>
                <Ionicons name="close-outline" size={24} color="#BDBDBD" />
              </TouchableOpacity> */}
            </View>

            <TouchableOpacity style={styles.logOutIcon} onPress={signOut}>
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
            <View style={styles.header}>
              <Text style={styles.headerText}>{userName}</Text>
            </View>
            {posts.length >= 1 ? (
              <FlatList
                data={posts}
                keyExtractor={posts.id}
                renderItem={renderItem}
              />
            ) : (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("CreatePostScreen");
                }}
              >
                <Text style={styles.bodyText}>
                  Додайте перший пост до вашої колекції!
                </Text>
              </TouchableOpacity>
            )}
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "#fff",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    marginTop: 350,
    paddingBottom: 145,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  avatar: {
    position: "absolute",
    top: 0,
    left: 0,
    transform: [
      { translateY: -60 },
      { translateX: Dimensions.get("window").width * 0.5 - 60 },
    ],
    width: 120,
    height: 120,
    backgroundColor: "#f6f6f6",
    borderRadius: 16,
  },
  uploadAvatar: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  // deleteAvatarIcon: {
  //   position: "absolute",
  //   top: 80,
  //   left: 108,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: "#fff",
  //   width: 25,
  //   height: 25,
  //   borderRadius: 25,
  // },
  logOutIcon: {
    alignItems: "flex-end",
    marginRight: 16,
    marginTop: 16,
  },
  header: {
    paddingTop: 32,
    alignItems: "center",
    marginBottom: 32,
  },
  headerText: {
    color: "#212121",
    fontSize: 30,
    lineHeight: 35,
  },
  bodyText: {
    textAlign: "center",
    marginBottom: 50,
  },
});
