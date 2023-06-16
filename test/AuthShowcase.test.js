import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { signIn, signOut } from "next-auth/react";
import { api } from "@/utils/api";
import AuthShowcase from "./AuthShowcase";

jest.mock("next-auth/react");
jest.mock("@/utils/api");

describe("AuthShowcase", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders sign in button when user is not logged in", () => {
    const { container } = render(<AuthShowcase />);
    expect(container).toMatchSnapshot();
    expect(screen.queryByText("Logged in as")).toBeNull();
    expect(screen.queryByText("Secret message")).toBeNull();
    expect(screen.getByRole("button")).toHaveTextContent("sign in");
  });

  it("renders sign out button when user is logged in", () => {
    const sessionData = { user: { name: "John Doe" } };
    const secretMessage = "This is a secret message";
    api.example.getSecretMessage.useQuery.mockReturnValue({
      data: secretMessage,
    });
    useSession.mockReturnValue({ data: sessionData });

    const { container } = render(<AuthShowcase />);
    expect(container).toMatchSnapshot();
    expect(
      screen.getByText(`Logged in as ${sessionData.user.name}`)
    ).toBeInTheDocument();
    expect(screen.getByText(`- ${secretMessage}`)).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("sign out");
  });

  it("calls sign in function when user clicks sign in button", () => {
    useSession.mockReturnValue({ data: null });
    const { container } = render(<AuthShowcase />);
    userEvent.click(screen.getByRole("button"));
    expect(signIn).toHaveBeenCalledTimes(1);
    expect(signOut).not.toHaveBeenCalled();
  });

  it("calls sign out function when user clicks sign out button", () => {
    const sessionData = { user: { name: "John Doe" } };
    useSession.mockReturnValue({ data: sessionData });
    const { container } = render(<AuthShowcase />);
    userEvent.click(screen.getByRole("button"));
    expect(signOut).toHaveBeenCalledTimes(1);
    expect(signIn).not.toHaveBeenCalled();
  });
});
