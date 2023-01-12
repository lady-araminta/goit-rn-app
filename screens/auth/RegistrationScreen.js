import { useState } from "react";
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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export const RegistrationScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setState(initialState);
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
                <TouchableOpacity style={styles.addAvatarIcon}>
                  <Ionicons name="md-add" size={24} color="#BDBDBD" />
                </TouchableOpacity>
              </View>
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Регистрация</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Логин"
                value={state.login}
                onFocus={() => setIsShowKeyboard(true)}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, login: value }))
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Адрес электронной почты"
                value={state.email}
                onFocus={() => setIsShowKeyboard(true)}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, email: value }))
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Пароль"
                secureTextEntry={true}
                value={state.password}
                onFocus={() => setIsShowKeyboard(true)}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, password: value }))
                }
              />
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.9}
                onPress={keyboardHide}
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