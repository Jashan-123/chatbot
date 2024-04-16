import { HStack, Text } from "@chakra-ui/react";
import React from "react";

const Message = ({ text, user, theme }) => {
  let msgBoxColor;
  let msgColor;
  if (theme === "light") {
    if (user === "me") {
      msgBoxColor = "#4122a7";
      msgColor = "#fff";
    } else {
      msgBoxColor = "#fff";
      msgColor = "#000";
    }
  } else {
    if (user === "me") {
      msgBoxColor = "#4122a7";
      msgColor = "#fff";
    } else {
      msgBoxColor = "#232f3e";
      msgColor = "#fff";
    }
  }

  return (
    <HStack
      alignSelf={user === "bot" ? "flex-start" : "flex-end"}
      style={{
        background: msgBoxColor,
        color: msgColor,
        maxWidth: "60%",
        wordWrap: "break-word",
      }}
      paddingX="4"
      paddingY="2"
      borderRadius="base"
    >
      <Text>{text}</Text>
    </HStack>
  );
};

export default Message;
