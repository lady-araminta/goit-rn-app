import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ImageBackground,
  KeyboardAvoidingView,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { register } from "../../redux/auth/authOperations";
import { useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { nanoid } from "@reduxjs/toolkit";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase/config";

export const RegistrationScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [uploadAvatar, setUploadAvatar] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  const uploadAvatarFromGallery = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });
      if (!result.canceled) {
        setUploadAvatar(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Помилка при завантаженні аватара з галереї", error.message);
    }
  };

  const uploadAvatarToServer = async () => {
    try {
      const response = await fetch(uploadAvatar);
      const file = await response.blob();
      const avatarId = nanoid();
      const storageRef = await ref(storage, `avatars/${avatarId}`);
      await uploadBytesResumable(storageRef, file);
      const fileRef = ref(storageRef);
      const avatarURL = await getDownloadURL(fileRef);
      return avatarURL;
    } catch (error) {
      console.log("Помилка при завантаженні аватара на сервер", error.message);
    }
  };

  const submitReg = async () => {
    try {
      const avatarRef = await uploadAvatarToServer();
      console.log(avatarRef);
      const userObject = {
        name: name,
        email: email,
        password: password,
        avatar: avatarRef,
      };
      console.log(userObject);
      dispatch(register(userObject));
      setIsShowKeyboard(false);
      Keyboard.dismiss();
      setName("");
      setEmail("");
      setPassword("");
      setUploadAvatar("");
    } catch (error) {
      console.log("Помилка при сабміті форми", error.message);
    }
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
            <View style={styles.form}>
              <View style={styles.avatar}>
                {uploadAvatar && (
                  <Image
                    style={styles.uploadAvatar}
                    source={{ uri: uploadAvatar }}
                  />
                )}
                {uploadAvatar ? (
                  <TouchableOpacity
                    style={styles.addAvatarIcon}
                    onPress={() => {
                      setUploadAvatar("");
                    }}
                  >
                    <Ionicons name="close-outline" size={24} color="#BDBDBD" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.addAvatarIcon}
                    onPress={uploadAvatarFromGallery}
                  >
                    <Ionicons name="md-add" size={24} color="#FF6C00" />
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Регистрация</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Логин"
                value={name}
                onFocus={() => setIsShowKeyboard(true)}
                onChangeText={setName}
              />
              <TextInput
                style={styles.input}
                placeholder="Адрес электронной почты"
                value={email}
                onFocus={() => setIsShowKeyboard(true)}
                onChangeText={setEmail}
              />
              <TextInput
                style={styles.input}
                placeholder="Пароль"
                secureTextEntry={true}
                value={password}
                onFocus={() => setIsShowKeyboard(true)}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.9}
                onPress={submitReg}
              >
                <Text style={styles.buttonText}>Зарегистрироваться</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("LoginScreen")}
            >
              <Text style={styles.formText}>Уже есть аккаунт? Войти</Text>
            </TouchableOpacity>
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
    paddingBottom: 45,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  input: {
    height: 50,
    marginBottom: 16,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 8,
    border: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
  },
  form: {},
  button: {
    marginTop: 27,
    marginBottom: 16,
    marginHorizontal: 16,
    height: 50,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 19,
  },
  header: {
    alignItems: "center",
    marginTop: 92,
    marginBottom: 33,
    marginHorizontal: 16,
  },
  headerTitle: {
    fontSize: 30,
    lineHeight: 50,
  },
  formText: {
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
    textAlign: "center",
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
  addAvatarIcon: {
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
});
