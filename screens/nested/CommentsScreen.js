import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";

export const CommentsScreen = () => {
  const [text, setText] = useState("");
  const createPost = () => {};

  return (
    <View style={styles.container}>
      <Image style={styles.image} />
      <View style={styles.commentContainer}>
        <View style={styles.avatar}></View>
        <View style={styles.commentBody}>
          <Text style={styles.commentText}>
            Really love your most recent photo. I’ve been trying to capture the
            same thing for a few months and would love some tips!
          </Text>
          <View style={styles.commentInfo}>
            <Text style={styles.commentDate}>09 июня, 2020 </Text>
            <Text style={styles.commentTime}> 08:40</Text>
          </View>
        </View>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.commentForm}>
          <TextInput style={styles.input} placeholder="Комментировать" />
          <TouchableOpacity style={styles.sendBtn} onPress={createPost}>
            <Feather name="arrow-up" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  image: {
    height: 240,
    width: Dimensions.get("window").width - 32,
    borderRadius: 8,
    backgroundColor: "#E8E8E8",
  },
  commentContainer: {
    marginTop: 32,
    display: "flex",
    flexDirection: "row",
  },
  avatar: {
    marginRight: 16,
    backgroundColor: "#E8E8E8",
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  commentBody: {
    padding: 16,
    marginBottom: 24,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    maxWidth: Dimensions.get("window").width - 76,
  },
  commentText: {
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
    marginBottom: 8,
  },
  commentInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  commentDate: {
    borderRightWidth: 1,
    borderRightColor: "#BDBDBD",
    paddingRight: 2,
    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
  },
  commentTime: {
    paddingLeft: 2,
    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
  },
  formContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  commentForm: {
    position: "relative",
  },
  input: {
    height: 50,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    paddingLeft: 16,
  },
  sendBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
  },
});
