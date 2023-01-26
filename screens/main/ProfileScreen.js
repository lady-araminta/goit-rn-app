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
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/authOperations";
import { selectAvatar, selectUserName } from "../../redux/auth/authSelectors";

export const ProfileScreen = () => {
  const userName = useSelector(selectUserName);
  const avatar = useSelector(selectAvatar);
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(logout());
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
              <TouchableOpacity style={styles.deleteAvatarIcon}>
                <Ionicons name="close-outline" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.logOutIcon} onPress={signOut}>
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
            <View style={styles.header}>
              <Text style={styles.headerText}>{userName}</Text>
            </View>
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
  deleteAvatarIcon: {
    position: "absolute",
    top: 80,
    left: 108,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    width: 25,
    height: 25,
    borderRadius: 25,
  },
  logOutIcon: {
    alignItems: "flex-end",
    marginRight: 16,
    marginTop: 16,
  },
  header: {
    paddingTop: 32,
    alignItems: "center",
  },
  headerText: {
    color: "#212121",
    fontSize: 30,
    lineHeight: 35,
  },
});
