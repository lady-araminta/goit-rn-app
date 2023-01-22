import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { Alert } from "react-native";
import { auth } from "../../firebase/config";
import { authSlice } from "./authSlice";

const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

export const register =
  ({ email, password, name }) =>
  async (dispatch) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log("to registration", user.user);
      const currentUser = auth.currentUser;
      console.log("currentUser", currentUser);
      const updateUser = await updateProfile(currentUser, {
        displayName: name,
      });
      console.log("after update, current user", updateUser);
      console.log("auth.currentUser", auth.currentUser);
      const nextCurrentUser = auth.currentUser;
      console.log("identify", nextCurrentUser.uid);
      dispatch(
        updateUserProfile({
          userId: updateUser.uid,
          name: updateUser.displayName,
        })
      );
      console.log("auth.currentUser after updateUserProfile", auth.currentUser);
      Alert.alert(`Welcome, ${name}`);
    } catch (error) {
      console.log(error.message);
    }
  };
export const login =
  ({ email, password }) =>
  async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log("userLogin", user);
      Alert.alert("Welcome!");
    } catch (error) {
      console.log(error.message);
    }
  };
export const logout = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(authSignOut());
  } catch (error) {
    console.log(error.message);
  }
};

export const authStateChangeUser = () => async (dispatch) => {
  try {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email } = user;
        dispatch(
          updateUserProfile({ userId: uid, name: displayName, email: email })
        );
        dispatch(authStateChange({ stateChange: true }));
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};
