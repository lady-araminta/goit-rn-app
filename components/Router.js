import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { LoginScreen } from "../screens/auth/LoginScreen";
import { RegistrationScreen } from "../screens/auth/RegistrationScreen";
import { Home } from "../screens/main/Home";

const AuthStack = createNativeStackNavigator();

export const useRoute = (isAuth) => {
  return (
    <AuthStack.Navigator>
      {isAuth ? (
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        />
      ) : (
        <>
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="RegistrationScreen"
            component={RegistrationScreen}
          />
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="LoginScreen"
            component={LoginScreen}
          />
        </>
      )}
    </AuthStack.Navigator>
  );
};
