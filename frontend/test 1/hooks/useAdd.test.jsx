import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import axios from "axios";
import useAdd from "../hooks/useAdd";

// Mock axios
vi.mock("axios");

describe("useAdd hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Mock environment variable
    import.meta.env.VITE_BASE_URL = "http://localhost:5000";

    // Mock localStorage token
    localStorage.setItem("token", "test-token");

    // Mock alert
    vi.stubGlobal("alert", vi.fn());
  });

  it("should successfully add data", async () => {
    // Arrange
    axios.post.mockResolvedValue({
      data: {
        message: "Customer added successfully",
      },
    });

    const resetForm = vi.fn();

    const { result } = renderHook(() => useAdd());

    // Act
    let response;

    await act(async () => {
      response = await result.current.add({
        endpoint: "/customers/add-customer",
        data: {
          name: "John",
          email: "john@gmail.com",
        },
        successMessage: "Customer added successfully",
        errorMessage: "Failed to add customer",
        resetForm,
      });
    });

    // Assert
    expect(response).toBe(true);

    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:5000/customers/add-customer",
      {
        name: "John",
        email: "john@gmail.com",
      },
      {
        headers: {
          Authorization: "Bearer test-token",
        },
      }
    );

    expect(alert).toHaveBeenCalledWith(
      "Customer added successfully"
    );

    expect(resetForm).toHaveBeenCalled();
  });

  it("should return false when API request fails", async () => {
    // Arrange
    axios.post.mockRejectedValue(
      new Error("Network Error")
    );

    const resetForm = vi.fn();

    const { result } = renderHook(() => useAdd());

    // Act
    let response;

    await act(async () => {
      response = await result.current.add({
        endpoint: "/customers/add-customer",
        data: {
          name: "John",
          email: "john@gmail.com",
        },
        successMessage: "Customer added successfully",
        errorMessage: "Failed to add customer",
        resetForm,
      });
    });

    // Assert
    expect(response).toBe(false);

    expect(alert).toHaveBeenCalledWith(
      "Failed to add customer"
    );

    expect(resetForm).not.toHaveBeenCalled();
  });

  it("should not call resetForm when resetForm is not provided", async () => {
    // Arrange
    axios.post.mockResolvedValue({
      data: {
        message: "Success",
      },
    });

    const { result } = renderHook(() => useAdd());

    // Act
    let response;

    await act(async () => {
      response = await result.current.add({
        endpoint: "/products/add-product",
        data: {
          productName: "Laptop",
        },
        successMessage: "Product added",
        errorMessage: "Failed to add product",
      });
    });

    // Assert
    expect(response).toBe(true);

    expect(alert).toHaveBeenCalledWith("Product added");
  });

  it("should send the token from localStorage", async () => {
    // Arrange
    axios.post.mockResolvedValue({
      data: {
        message: "Success",
      },
    });

    localStorage.setItem("token", "my-jwt-token");

    const { result } = renderHook(() => useAdd());

    // Act
    await act(async () => {
      await result.current.add({
        endpoint: "/test",
        data: {
          name: "Test",
        },
        successMessage: "Success",
        errorMessage: "Error",
      });
    });

    // Assert
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:5000/test",
      {
        name: "Test",
      },
      {
        headers: {
          Authorization: "Bearer my-jwt-token",
        },
      }
    );
  });
});
