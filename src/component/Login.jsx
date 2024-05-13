import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { users } from "../data/users";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (storedUserData && storedUserData.username && storedUserData.password) {
      onLogin();
      navigate("/chatbot");
    }
    setIsLoading(false);
  }, [onLogin, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      let loggedInUser = { username, password };
      localStorage.setItem("userData", JSON.stringify(loggedInUser));
      onLogin();
      navigate("/chatbot");
      setUsername("");
      setPassword("");
      setError("");
    } else {
      setError("User not found!");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Container h="100vh" w="100%">
        <div className="form-container">
          <Text fontSize="4xl" data-testid="login-heading">
            Login
          </Text>
          <form onSubmit={handleLogin}>
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
            <Button
              colorScheme="facebook"
              type="submit"
              style={{ marginTop: "1.2rem", marginLeft: "30%" }}
              data-testid="login-button"
            >
              Login
            </Button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
        </div>
      </Container>
    </>
  );
};

export default Login;
