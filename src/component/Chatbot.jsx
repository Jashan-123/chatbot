import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  HStack,
  Input,
  VStack,
  Switch,
} from "@chakra-ui/react";
import Message from "./Message";
import { messages } from "../data/message";
import bot from "../images/bot.png";

const Chatbot = () => {
  const [inputText, setInputText] = useState("");
  const [userMessages, setUserMessages] = useState([]);
  const [displayMsg, setDisplayMsg] = useState([]);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const msgTimer = setInterval(() => {
      setDisplayMsg((prevDisplayMsg) => {
        const nextIndex = prevDisplayMsg.length + 1;
        if (nextIndex <= messages.length) {
          return messages.slice(0, nextIndex);
        } else {
          clearInterval(msgTimer);
          return prevDisplayMsg;
        }
      });
    }, 1500);

    return () => clearInterval(msgTimer);
  }, []);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputText.trim() !== "") {
      const newMessage = {
        id: Date.now().toString(),
        text: inputText,
        sender: "me",
      };

      setUserMessages([...userMessages, newMessage]);
      setInputText("");
    }
  };

  const msgText = theme === "dark" ? "app-dark-bg" : "app-light-bg";
  const inputTextColor = theme === "dark" ? "#fff" : "#000";

  const handleToggle = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  return (
    <Box bg="white" w="full">
      <Container h="100%" className={msgText}>
        <VStack h="100vh" w="full" paddingY="4">
          <HStack
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <img src={bot} width="15%" alt="bot" />
            <div className="theme-box">
              <span>🌞</span>
              <Switch isChecked={theme === "dark"} onChange={handleToggle} />
              <span>🌙</span>
            </div>
            Dark
          </HStack>
          <VStack
            h="full"
            w="full"
            overflowY="auto"
            css={{ "&::-webkit-scrollbar": { display: "none" } }}
          >
            {displayMsg.map((message) => (
              <Message
                key={message.id}
                text={message.text}
                user={message.sender}
                theme={theme}
              />
            ))}
            {userMessages &&
              userMessages.map((msg) => (
                <Message key={msg.id} text={msg.text} user={msg.sender} />
              ))}
          </VStack>
          <form className="form-box" onSubmit={handleSendMessage}>
            <HStack>
              <Input
                placeholder="Type a message..."
                value={inputText}
                style={{ color: inputTextColor }}
                onChange={handleInputChange}
              />
              <Button
                style={{ background: "#4122a7", color: "#fff" }}
                type="submit"
              >
                Send
              </Button>
            </HStack>
          </form>
        </VStack>
      </Container>
    </Box>
  );
};

export default Chatbot;
