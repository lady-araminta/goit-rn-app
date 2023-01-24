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
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import { db, storage } from "../../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { nanoid } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { selectUserId } from "../../redux/auth/authSelectors";

export const CreatePostScreen = ({ navigation }) => {
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();
  const [libraryPermission, requestLibraryPermission] =
    MediaLibrary.usePermissions();
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [place, setPlace] = useState("");
  // const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const userId = useSelector(selectUserId);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync();
      const coords = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      };
      setLocation(coords);
      // let address = await Location.reverseGeocodeAsync(coords);
      // let city = address[0].city;
      // setCity(city);
    })();
  }, []);

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

  const takePhoto = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync();
      if (!result.canceled) {
        setPhoto(result.assets[0].uri);
        await MediaLibrary.createAssetAsync(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Помилка в takePhoto", error.message);
    }
  };

  const sendPhoto = () => {
    uploadPostToServer();
    clearForm();
    navigation.navigate("DefaultScreen");
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const uploadPostToServer = async () => {
    try {
      const uploadPhoto = await uploadPhotoToServer();
      const uploadObject = {
        photo: uploadPhoto,
        location: location,
        place: place,
        description: description,
      };
      console.log(uploadObject);
      const postRef = await addDoc(collection(db, "posts"), uploadObject);
    } catch (error) {
      console.log("Помилка в uploadPostToServer", error.message);
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
      const fileRef = ref(storageRef);
      const dowloadedURL = await getDownloadURL(fileRef);
      return dowloadedURL;
    } catch (error) {
      console.log("Помилка в uploadPhotoToServer", error.message);
    }
  };

  const clearForm = () => {
    setPhoto(null);
    setPlace("");
    setDescription("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.camera}>
        {photo && (
          <View style={styles.takePhotoContainer}>
            <Image source={{ uri: photo }} style={styles.photo} />
          </View>
        )}
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <MaterialIcons name="camera-alt" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={pickImage}>
        {photo && <Text style={styles.text}>Редактировать фото</Text>}
        {!photo && <Text style={styles.text}>Загрузить фото</Text>}
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
          onChangeText={setPlace}
        />
        <Feather name="map-pin" size={24} color="#BDBDBD" style={styles.icon} />
      </View>
      <TouchableOpacity style={styles.inactiveBtn} onPress={sendPhoto}>
        <Text style={styles.text}>Опубликовать</Text>
      </TouchableOpacity>
      <View style={styles.trashBtnCont}>
        <TouchableOpacity style={styles.trashBtn} onPress={clearForm}>
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
  },
  photo: {
    height: 240,
    width: Dimensions.get("window").width - 32,
  },
});
