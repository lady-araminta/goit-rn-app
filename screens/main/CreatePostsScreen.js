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
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export const CreatePostScreen = ({ navigation }) => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [libraryPermission, requestLibraryPermission] =
    MediaLibrary.usePermissions();
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);

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

  if (!libraryPermission) {
    return <View />;
  }

  if (!libraryPermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to save photo to gallery
        </Text>
        <Button onPress={requestLibraryPermission} title="grant permission" />
      </View>
    );
  }

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const takePhoto = async () => {
    const { uri } = await camera.takePictureAsync();
    setPhoto(uri);
    await MediaLibrary.createAssetAsync(uri);
  };

  const sendPhoto = () => {
    navigation.navigate("PostsScreen", { photo });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={setCamera}>
        {photo && (
          <View style={styles.takePhotoContainer}>
            <Image source={{ uri: photo }} style={styles.photo} />
          </View>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={takePhoto}
          onLongPress={toggleCameraType}
        >
          <MaterialIcons name="camera-alt" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </Camera>
      <TouchableOpacity onPress={pickImage}>
        <Text style={styles.text}>Загрузите фото</Text>
      </TouchableOpacity>

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
      <TouchableOpacity style={styles.inactiveBtn} onPress={sendPhoto}>
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
    backgroundColor: "#F6F6F6",
    borderRadius: 10,
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
    // height: 240,
    // width: Dimensions.get("window").width - 32,
    flex: 1,
  },
  photo: {
    height: 80,
    width: 80,
  },
});
