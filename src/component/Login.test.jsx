import { render, fireEvent, waitFor } from "@testing-library/react";
import Login from "./Login";
import { MemoryRouter } from "react-router-dom";

describe("Login component", () => {
  it("Check Login component render correctly", () => {
    const { getByTestId, getByLabelText, getByPlaceholderText } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(getByTestId("login-heading")).toBeInTheDocument();
    expect(getByPlaceholderText("Enter Username")).toBeInTheDocument();
    expect(getByLabelText("Username*")).toBeInTheDocument();
    expect(getByPlaceholderText("Enter Password")).toBeInTheDocument();
    expect(getByLabelText("Password*")).toBeInTheDocument();
  });

  it("handle login", async () => {
    const onLoginMock = jest.fn();
    const { getByLabelText, getByTestId } = render(
      <MemoryRouter>
        <Login onLogin={onLoginMock} />
      </MemoryRouter>
    );

    fireEvent.change(getByLabelText("Username*"), {
      target: { value: "Jass123" },
    });
    fireEvent.change(getByLabelText("Password*"), {
      target: { value: "Jass123#" },
    });

    fireEvent.click(getByTestId("login-button"));

    await waitFor(() => {
      expect(onLoginMock).toHaveBeenCalled();
    });
  });
});
