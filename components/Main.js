import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authStateChangeUser } from "../redux/auth/authOperations";
import { selectAuth } from "../redux/auth/authSelectors";
import { useRoute } from "./Router";

export const Main = () => {
  const { stateChange } = useSelector(selectAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, [dispatch]);

  const routing = useRoute(null);
  return <NavigationContainer>{routing}</NavigationContainer>;
};
