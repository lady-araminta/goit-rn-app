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
  Platform,
} from "react-native";
import { useDispatch } from "react-redux";

import { login } from "../../redux/auth/authOperations";

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const dispatch = useDispatch();
  const submitLog = () => {
    dispatch(login({ email, password }));
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setEmail("");
    setPassword("");
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
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Войти</Text>
              </View>
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Адрес электронной почты"
                  value={email}
                  onFocus={() => setIsShowKeyboard(true)}
                  onChangeText={(value) => setEmail(value)}
                />
              </View>
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Пароль"
                  secureTextEntry={true}
                  value={password}
                  onFocus={() => setIsShowKeyboard(true)}
                  onChangeText={(value) => setPassword(value)}
                />
              </View>
              <View>
                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.9}
                  onPress={submitLog}
                >
                  <Text style={styles.buttonText}>Войти</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate("RegistrationScreen")}
                >
                  <Text style={styles.formText}>
                    Нет аккаунта? Зарегистрироваться
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: 32,
    paddingBottom: 140,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingHorizontal: 16,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  input: {
    height: 50,
    marginBottom: 16,

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
    marginBottom: 33,
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
});
