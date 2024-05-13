import { render, screen } from "@testing-library/react";
import Message from "./Message";

describe("Message component testing based on props change user and theme", () => {
  it("renders message correctly for user 'me' with light theme", () => {
    render(<Message text="Hello" user="me" theme="light" />);
    const messageElement = screen.getByText("Hello");
    expect(messageElement).toBeInTheDocument();
    expect(messageElement.parentElement).toHaveStyle({
      background: "#4122a7",
      color: "#fff",
    });
  });
  it("renders message correctly for user 'bot' with light theme", () => {
    render(<Message text="Hello" user="bot" theme="dark" />);
    const messageElement = screen.getByText("Hello");
    expect(messageElement).toBeInTheDocument();
    expect(messageElement.parentElement).toHaveStyle({
      background: "#232f3e",
      color: "#fff",
    });
  });
});
