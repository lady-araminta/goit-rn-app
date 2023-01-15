import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/config";

export const register =
  ({ email, password, login }) =>
  async (dispatch, getState) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
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
export const logout = () => async (dispatch, getState) => {};
