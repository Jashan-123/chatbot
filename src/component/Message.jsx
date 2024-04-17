import { HStack, Text, Avatar, Image } from "@chakra-ui/react";
import React from "react";
import botImg from "../images/bot.png";
import userImg from "../images/me.jpg";

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
      style={{
        background: msgBoxColor,
        color: msgColor,
        maxWidth: "60%",
        wordWrap: "break-word",
      }}
      paddingX="5"
      paddingY="2"
      borderRadius="base"
    >
      {user === "bot" && <Avatar size="sm" src={botImg} />}
      <Text>
        {text.length === 0 ? <Image src={src} alt="gif" w="80px" /> : text}
      </Text>
      {user === "me" && <Avatar size="sm" src={userImg} />}
    </HStack>
  );
};

export default Message;
