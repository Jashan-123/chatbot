import { HStack, Text, Image } from "@chakra-ui/react";
import React from "react";

const Message = ({ text, user, src, theme }) => {
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
      className="msg-width"
      style={{
        background: msgBoxColor,
        color: msgColor,
      }}
      padding="4"
      borderRadius="15px"
    >
      <Text>
        {text.length === 0 ? <Image src={src} alt="gif" w="90px" /> : text}
      </Text>
    </HStack>
  );
};

export default Message;
