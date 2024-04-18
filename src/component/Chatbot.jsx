import React, { useEffect, useState, useRef } from "react";
import { Box, Button, HStack, Input, VStack, Switch } from "@chakra-ui/react";
import Message from "./Message";
import { messages } from "../data/message";
import bot from "../images/bot.png";

const Chatbot = ({ theme, handleToggle }) => {
  const [inputText, setInputText] = useState("");
  const [userMessages, setUserMessages] = useState([]);
  const [displayMsg, setDisplayMsg] = useState([]);
  const messagesEndRef = useRef(null);

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

  useEffect(() => {
    scrollToBottom();
  }, [userMessages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

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

  return (
    <Box w="full" className={msgText}>
      <div className="container">
        <VStack h="100vh" paddingY="4">
          <HStack
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <img src={bot} className="bot-image" alt="bot" />
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
                src={message.src}
                theme={theme}
              />
            ))}
            {userMessages &&
              userMessages.map((msg) => (
                <Message key={msg.id} text={msg.text} user={msg.sender} />
              ))}
            <div ref={messagesEndRef} />
          </VStack>
          <div />
          <HStack className="form-box">
            <form
              className="chatbot-form-container"
              onSubmit={handleSendMessage}
            >
              <HStack>
                <Input
                  placeholder="Type a message..."
                  value={inputText}
                  size="md"
                  style={{ color: inputTextColor }}
                  onChange={handleInputChange}
                />
                <Button
                  style={{ background: "#4122a7", color: "#fff" }}
                  size="md"
                  type="submit"
                >
                  Send
                </Button>
              </HStack>
            </form>
          </HStack>
        </VStack>
      </div>
    </Box>
  );
};

export default Chatbot;
