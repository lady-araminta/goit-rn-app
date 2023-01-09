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
} from "react-native";

const initialState = {
  email: "",
  password: "",
};

export const LoginScreen = () => {
  const [state, setState] = useState(initialState);
  //   const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const keyboardHide = () => {
    // setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ImageBackground
        source={require("../../assets/images/bgphoto.jpg")}
        style={styles.image}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.container}>
            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Войти</Text>
              </View>
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Адрес электронной почты"
                  value={state.email}
                  //   onFocus={() => setIsShowKeyboard(true)}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                />
              </View>
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Пароль"
                  secureTextEntry={true}
                  value={state.password}
                  //   onFocus={() => setIsShowKeyboard(true)}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                />
              </View>
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.9}
                onPress={keyboardHide}
              >
                <Text style={styles.buttonText}>Войти</Text>
              </TouchableOpacity>
              <Text style={styles.formText}>
                Нет аккаунта? Зарегистрироваться
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
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
  headerTitle: { fontSize: 30, lineHeight: 50 },
  formText: {
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
    textAlign: "center",
  },
});
