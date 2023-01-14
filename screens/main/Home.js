import React from "react";
import { TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { PostsScreen } from "./PostsScreen";
import { CreatePostScreen } from "./CreatePostsScreen";
import { ProfileScreen } from "./ProfileScreen";

const MainTab = createBottomTabNavigator();

export const Home = ({ navigation }) => {
  return (
    <MainTab.Navigator screenOptions={{ tabBarShowLabel: false }}>
      <MainTab.Screen
        options={{
          title: "Публикации",
          headerTitleAlign: "center",
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 16 }}>
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <Feather name="grid" size={24} color="rgba(33, 33, 33, 0.8)" />
          ),
        }}
        name="PostsScreen"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          title: "Создать публикацию",
          tabBarIcon: ({ focused, color, size }) => (
            <Feather name="plus" size={24} color="rgba(33, 33, 33, 0.8)" />
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 16 }}
              onPress={() => navigation.navigate("PostsScreen")}
            >
              <Feather
                name="arrow-left"
                size={24}
                color="rgba(21, 21, 21, 0.8)"
              />
            </TouchableOpacity>
          ),
          headerTitleAlign: "center",
        }}
        name="CreatePostScreen"
        component={CreatePostScreen}
      />
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Feather name="user" size={24} color="rgba(33, 33, 33, 0.8)" />
          ),
        }}
        name="ProfileScreen"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};
