import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductCard from "./ProductCard";
import useAdd from "../hooks/useAdd";
import { logFrontendError } from "../utils/errorLogger";

// Mock useAdd hook
vi.mock("../hooks/useAdd", () => ({
  default: vi.fn(),
}));

// Mock error logger
vi.mock("../utils/errorLogger", () => ({
  logFrontendError: vi.fn(),
}));

describe("ProductCard", () => {
  const mockProduct = {
    id: "123",
    name: "Laptop",
    price: 50000,
    category: "Electronics",
    image: "/images/laptop.jpg",
  };

  const mockAdd = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    useAdd.mockReturnValue({
      add: mockAdd,
    });

    // Mock alert
    global.alert = vi.fn();
  });

  it("renders product information correctly", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText("50000")).toBeInTheDocument();
    expect(screen.getByText("Electronics")).toBeInTheDocument();
  });

  it("renders product image correctly", () => {
    render(<ProductCard product={mockProduct} />);

    const image = screen.getByRole("img");

    expect(image).toHaveAttribute("src", "/images/laptop.jpg");
    expect(image).toHaveAttribute("alt", "Laptop");
  });

  it("renders Add to Cart button", () => {
    render(<ProductCard product={mockProduct} />);

    expect(
      screen.getByRole("button", { name: "Add to Cart" })
    ).toBeInTheDocument();
  });

  it("renders View button", () => {
    render(<ProductCard product={mockProduct} />);

    expect(
      screen.getByRole("button", { name: "View" })
    ).toBeInTheDocument();
  });

  it("calls add when Add to Cart button is clicked", async () => {
    mockAdd.mockResolvedValue(true);

    render(<ProductCard product={mockProduct} />);

    const addButton = screen.getByRole("button", {
      name: "Add to Cart",
    });

    fireEvent.click(addButton);

    await waitFor(() => {
      expect(mockAdd).toHaveBeenCalledTimes(1);
    });

    expect(mockAdd).toHaveBeenCalledWith({
      endpoint: "/products/add-to-cart",
      data: mockProduct,
      successMessage: "Added to cart!",
      errorMessage: "Failed to add to cart",
    });
  });

  it("shows success alert when product is added successfully", async () => {
    mockAdd.mockResolvedValue(true);

    render(<ProductCard product={mockProduct} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Add to Cart",
      })
    );

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        "Product added to cart successfully"
      );
    });
  });

  it("does not show success alert when add returns false", async () => {
    mockAdd.mockResolvedValue(false);

    render(<ProductCard product={mockProduct} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Add to Cart",
      })
    );

    await waitFor(() => {
      expect(mockAdd).toHaveBeenCalled();
    });

    expect(global.alert).not.toHaveBeenCalled();
  });

  it("logs frontend error when add to cart fails", async () => {
    const error = new Error("Failed to add product");

    mockAdd.mockRejectedValue(error);

    // Avoid console output during test
    const consoleSpy = vi
      .spyOn(console, "log")
      .mockImplementation(() => {});

    render(<ProductCard product={mockProduct} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Add to Cart",
      })
    );

    await waitFor(() => {
      expect(logFrontendError).toHaveBeenCalled();
    });

    expect(logFrontendError).toHaveBeenCalledWith(error, {
      component: "ProductList",
      method: "fetchProducts",
    });

    consoleSpy.mockRestore();
  });
});