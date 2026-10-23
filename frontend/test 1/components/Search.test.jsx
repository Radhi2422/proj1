import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";

import SearchProducts from "../../src/components/Search";
import api from "../../src/services/api";

// Mock the API
vi.mock("../services/api", () => ({
  default: {
    get: vi.fn(),
  },
}));

describe("SearchProducts", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    localStorage.clear();
    localStorage.setItem("token", "test-token");
  });

  it("renders the search input and button", () => {
    render(<SearchProducts />);

    expect(
      screen.getByRole("heading", { name: "Search Products" })
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Search by name...")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Search" })
    ).toBeInTheDocument();
  });

  it("allows the user to type a product name", async () => {
    const user = userEvent.setup();

    render(<SearchProducts />);

    const input = screen.getByPlaceholderText("Search by name...");

    await user.type(input, "Laptop");

    expect(input).toHaveValue("Laptop");
  });

  it("calls the API when Search button is clicked", async () => {
    const user = userEvent.setup();

    api.get.mockResolvedValue({
      data: {
        data: [],
      },
    });

    render(<SearchProducts />);

    const input = screen.getByPlaceholderText("Search by name...");
    const button = screen.getByRole("button", { name: "Search" });

    await user.type(input, "Laptop");
    await user.click(button);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(
        "/products/search?name=Laptop",
        {
          headers: {
            Authorization: "Bearer test-token",
          },
        }
      );
    });
  });

  it("displays products returned by the API", async () => {
    const user = userEvent.setup();

    api.get.mockResolvedValue({
      data: {
        data: [
          {
            _id: "1",
            name: "Gold Ring",
            price: 50000,
          },
          {
            _id: "2",
            name: "Silver Necklace",
            price: 25000,
          },
        ],
      },
    });

    render(<SearchProducts />);

    const input = screen.getByPlaceholderText("Search by name...");
    const button = screen.getByRole("button", { name: "Search" });

    await user.type(input, "Ring");
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText("Gold Ring")).toBeInTheDocument();
      expect(screen.getByText("Silver Necklace")).toBeInTheDocument();
    });

    expect(screen.getByText("Price: ₹50000")).toBeInTheDocument();
    expect(screen.getByText("Price: ₹25000")).toBeInTheDocument();
  });

  it("sends the token from localStorage in the Authorization header", async () => {
    const user = userEvent.setup();

    localStorage.setItem("token", "my-jwt-token");

    api.get.mockResolvedValue({
      data: {
        data: [],
      },
    });

    render(<SearchProducts />);

    await user.type(
      screen.getByPlaceholderText("Search by name..."),
      "Ring"
    );

    await user.click(
      screen.getByRole("button", { name: "Search" })
    );

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(
        "/products/search?name=Ring",
        {
          headers: {
            Authorization: "Bearer my-jwt-token",
          },
        }
      );
    });
  });

  it("shows an alert when the API request fails", async () => {
    const user = userEvent.setup();

    api.get.mockRejectedValue(new Error("API Error"));

    const alertMock = vi
      .spyOn(window, "alert")
      .mockImplementation(() => {});

    render(<SearchProducts />);

    await user.type(
      screen.getByPlaceholderText("Search by name..."),
      "Ring"
    );

    await user.click(
      screen.getByRole("button", { name: "Search" })
    );

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith(
        "Search failed. Please try again."
      );
    });

    alertMock.mockRestore();
  });
});
