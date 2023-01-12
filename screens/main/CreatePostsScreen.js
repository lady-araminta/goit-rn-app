import { useState } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  View,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export const CreatePostScreen = () => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("https://i.imgur.com/7FCHWxz.jpg");

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
  };

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={setCamera}>
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <MaterialIcons name="camera-alt" size={24} color="#BDBDBD" />
        </TouchableOpacity>
        <View style={styles.takePhotoContainer}>
          <Image source={{ uri: photo }} />
        </View>
      </Camera>
      <Text style={styles.text}>Загрузите фото</Text>
      <TextInput
        style={{ ...styles.input, marginBottom: 16 }}
        placeholder="Название"
      />
      <View style={{ position: "relative" }}>
        <TextInput
          style={{ ...styles.input, paddingLeft: 28 }}
          placeholder="Местность"
        />
        <Feather name="map-pin" size={24} color="#BDBDBD" style={styles.icon} />
      </View>
      <TouchableOpacity style={styles.inactiveBtn}>
        <Text style={styles.text}>Опубликовать</Text>
      </TouchableOpacity>
      <View style={styles.trashBtnCont}>
        <TouchableOpacity style={styles.trashBtn}>
          <Feather name="trash-2" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 16,
  },
  camera: {
    position: "relative",
    height: 240,
    marginTop: 32,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
  },
  buttonContainer: {},
  button: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 50,
  },
  text: {
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  inactiveBtn: {
    height: 50,
    marginTop: 32,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    position: "absolute",
    top: 12,
  },
  trashBtnCont: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  trashBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 40,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
  },
  takePhotoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 240,
    width: Dimensions.get("window").width - 32,
    flex: 1,
  },
});
