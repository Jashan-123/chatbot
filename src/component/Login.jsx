import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { users } from "../data/users";
import Chatbot from "./Chatbot";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      setUsername("");
      setPassword("");
      setError("");
      setLoggedIn(true);
    } else {
      setError("User not found!");
      setLoggedIn(false);
    }
  };
  return (
    <>
      {!loggedIn ? (
        <Container h="100vh" w="100%">
          <div className="form-container">
            <Text fontSize="4xl">Login</Text>
            <form onSubmit={handleLogin} className="form">
              <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  placeholder="Enter Username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  placeholder="Enter Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Button colorScheme="facebook" type="submit">
                Login
              </Button>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
          </div>
        </Container>
      ) : (
        <Chatbot />
      )}
    </>
  );
};

export default Login;
