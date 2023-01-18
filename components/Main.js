import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authStateChangeUser } from "../redux/auth/authOperations";
import { selectStateChange } from "../redux/auth/authSelectors";
import { useRoute } from "./Router";

export const Main = () => {
  const dispatch = useDispatch();
  const isUserAuth = useSelector(selectStateChange);

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, [isUserAuth]);

  const routing = useRoute(isUserAuth);
  return <NavigationContainer>{routing}</NavigationContainer>;
};
