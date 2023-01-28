import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { Alert } from "react-native";
import { auth } from "../../firebase/config";
import { authSlice } from "./authSlice";

const { updateUserProfile, authStateChange, authSignOut, authError } =
  authSlice.actions;

export const register =
  ({ email, password, name, avatar }) =>
  async (dispatch) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: avatar,
      });
      const { uid, displayName, photoURL } = await auth.currentUser;
      dispatch(
        updateUserProfile({
          userId: uid,
          name: displayName,
          email,
          avatar: photoURL,
        })
      );
      Alert.alert(`Welcome, ${name}`);
    } catch (error) {
      Alert.alert("Error!");
      dispatch(authError(error.message));
    }
  };
export const login =
  ({ email, password }) =>
  async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Welcome!");
    } catch (error) {
      Alert.alert("Error!");
      dispatch(authError(error.message));
    }
  };
export const logout = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(authSignOut());
    Alert.alert("Logout is successful");
  } catch (error) {
    Alert.alert("Error!");
    dispatch(authError(error.message));
  }
};

export const authStateChangeUser = () => (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { uid, displayName, email, photoURL } = user;
      dispatch(
        updateUserProfile({
          userId: uid,
          name: displayName,
          email: email,
          avatar: photoURL,
        })
      );
      dispatch(authStateChange({ stateChange: true }));
    }
  });
};
