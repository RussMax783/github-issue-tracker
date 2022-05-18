import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Auth } from "./Auth";

import { useAuthToken } from "../providers/AuthToken";

const mockSetToken = jest.fn();

jest.mock("../providers/AuthToken", () => ({
  useAuthToken: () => {
    return {
      setToken: mockSetToken,
    };
  },
}));

describe("Auth", () => {
  test("fill out auth token and handle click calls setToken", async () => {
    const { debug } = render(<Auth />);
    const input = await screen.findByPlaceholderText(/auth token/i);
    expect(input).toBeInTheDocument();
    userEvent.type(input, "abcdefg");

    const button = await screen.findByText(/Load Repos/i);
    expect(button).toBeInTheDocument();

    await userEvent.click(button);
    expect(mockSetToken).toHaveBeenCalled();
  });
});
