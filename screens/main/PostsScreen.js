import React from "react";
import { DefaultScreen } from "../nested/DefaultScreen";
import { CommentsScreen } from "../nested/CommentsScreen";
import { MapScreen } from "../nested/MapScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/auth/authOperations";

const NestedScreen = createNativeStackNavigator();

export const PostsScreen = () => {
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(logout());
  };
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultScreen}
        options={{
          title: "Публікації",
          headerTitleAlign: "center",
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 16 }} onPress={signOut}>
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
      />
      <NestedScreen.Screen
        name="CommentsScreen"
        component={CommentsScreen}
        options={{
          title: "Коментарі",
        }}
      />
      <NestedScreen.Screen name="MapScreen" component={MapScreen} />
    </NestedScreen.Navigator>
  );
};
