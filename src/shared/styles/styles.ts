import { StyleSheet } from "react-native";

export const SharedStyles = StyleSheet.create({
  /** Full-screen wrapper that centers its content horizontally (pair with a `MaxContentWidth` child). */
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
});
