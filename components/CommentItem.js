import { StyleSheet, View, Text, Dimensions } from "react-native";

export const CommentItem = ({ item }) => {
  console.log("прокинули в компонент", item);
  return (
    <View style={styles.commentContainer}>
      <View style={styles.avatar}></View>
      <View style={styles.commentBody}>
        <Text style={styles.commentText}>{item.comment}</Text>
        <View style={styles.commentInfo}>
          <Text style={styles.commentDate}>{item.date}</Text>
          <Text style={styles.commentTime}> {item.time} </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    // display: "flex",
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
});
