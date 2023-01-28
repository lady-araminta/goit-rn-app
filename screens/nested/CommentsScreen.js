import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { CommentItem } from "../../components/CommentItem";
import { useSelector } from "react-redux";
import {
  selectAvatar,
  selectUserId,
  selectUserName,
} from "../../redux/auth/authSelectors";

export const CommentsScreen = ({ route }) => {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const userId = useSelector(selectUserId);
  const userName = useSelector(selectUserName);
  const avatar = useSelector(selectAvatar);
  const { postId, photo } = route.params;
  const keyboardHide = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };
  const createPost = () => {
    sendComment();
    setText("");
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };
  const sendComment = async () => {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    try {
      const dbRef = doc(db, "posts", postId);
      const commentUploadObject = {
        text: text,
        date: date,
        time: time,
        userId: userId,
        userName: userName,
        avatar: avatar,
      };
      await updateDoc(dbRef, { comments: comments.length + 1 });
      await addDoc(collection(dbRef, "comments"), commentUploadObject);
    } catch (error) {
      console.log("Помилка при завантаженні коммента на сервер", error.message);
    }
  };

  const fetchComments = async () => {
    try {
      const dbRef = doc(db, "posts", postId);
      onSnapshot(collection(dbRef, "comments"), (docSnap) => {
        const allCommSnap = docSnap.docs;
        const allComm = allCommSnap.map((doc) => ({ ...doc.data() }));
        setComments(allComm);
      });
    } catch (error) {
      console.log("Помилка при отриманні комментарів з сервера", error.message);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const renderItem = ({ item }) => {
    return <CommentItem item={item} isShowKeyboard={isShowKeyboard} />;
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: photo }} />
        <FlatList
          data={comments}
          keyExtractor={comments.id}
          renderItem={renderItem}
        />
        <View style={styles.formContainer}>
          <View style={styles.commentForm}>
            <TextInput
              style={styles.input}
              placeholder="Комментировать"
              value={text}
              onFocus={() => setIsShowKeyboard(true)}
              onChangeText={setText}
            />
            <TouchableOpacity style={styles.sendBtn} onPress={createPost}>
              <Feather name="arrow-up" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  image: {
    marginBottom: 32,
    height: 240,
    width: Dimensions.get("window").width - 32,
    borderRadius: 8,
    backgroundColor: "#E8E8E8",
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
