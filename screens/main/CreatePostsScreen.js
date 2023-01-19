import { useEffect, useState } from "react";
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
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import { db, storage } from "../../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { nanoid } from "@reduxjs/toolkit";

export const CreatePostScreen = ({ navigation }) => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [libraryPermission, requestLibraryPermission] =
    MediaLibrary.usePermissions();
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [description, setDescription] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

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
    const location = await Location.getCurrentPositionAsync();
    setPhoto(uri);
    setLocation(location.coords);
    await MediaLibrary.createAssetAsync(uri);
  };

  const sendPhoto = () => {
    navigation.navigate("DefaultScreen", { photo });
  };

  const deletePhoto = () => {
    setPhoto(null);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const uploadPostToServer = async () => {
    try {
      const photo = uploadPhotoToServer();
      const postRef = await addDoc(collection(db, "posts"), {
        photo,
        location,
        login,
        userId,
        description,
      });
      console.log(postRef);
    } catch (error) {
      console.log(error.message);
    }
  };

  const uploadPhotoToServer = async () => {
    try {
      const metadata = {
        contentType: "image/jpeg",
      };
      const response = await fetch(photo);
      const file = await response.blob();
      const postId = nanoid();
      const storageRef = await ref(storage, `images/${postId}`);
      const uploadTask = await uploadBytesResumable(storageRef, file, metadata);
      console.log(uploadTask);
      const fileRef = ref(storageRef);
      const dowloadedURL = await getDownloadURL(fileRef);
      console.log(dowloadedURL);
    } catch (error) {
      console.log(error.message);
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
        onChangeText={setDescription}
      />
      <View style={{ position: "relative" }}>
        <TextInput
          style={{ ...styles.input, paddingLeft: 28 }}
          placeholder="Местность"
        />
        <Feather name="map-pin" size={24} color="#BDBDBD" style={styles.icon} />
      </View>
      <TouchableOpacity
        style={styles.inactiveBtn}
        onPress={sendPhoto}
        onLongPress={uploadPhotoToServer}
      >
        <Text style={styles.text}>Опубликовать</Text>
      </TouchableOpacity>
      <View style={styles.trashBtnCont}>
        <TouchableOpacity style={styles.trashBtn} onPress={deletePhoto}>
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
