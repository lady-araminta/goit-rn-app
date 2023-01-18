import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { updateUserProfile, authStateChange, authSignOut } from "./authSlice";

export const register =
  ({ email, password, login }) =>
  async (dispatch, getState) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log("to registration", user);
      const updateUser = await updateProfile(auth.currentUser, {
        displayName: login,
      });
      console.log("after registration, current user", updateUser);
      const { uid, displayName } = await auth.currentUser;
      dispatch(
        updateUserProfile({
          userId: uid,
          login: displayName,
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };
export const login =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };
export const logout = () => async (dispatch, getState) => {
  try {
    await signOut(auth);
    dispatch(authSignOut());
  } catch (error) {
    console.log(error.message);
  }
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  try {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          updateUserProfile({ userId: user.uid, login: user.displayName })
        );
        dispatch(authStateChange({ stateChange: true }));
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};
