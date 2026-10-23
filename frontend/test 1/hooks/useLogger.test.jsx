import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import axios from "axios";

import useLogger from "./useLogger";

vi.mock("axios");

describe("useLogger", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    localStorage.clear();

    localStorage.setItem("token", "test-token");

    axios.post.mockResolvedValue({
      data: {
        success: true,
      },
    });
  });

  it("should log info message and send it to backend", async () => {
    const consoleLogSpy = vi
      .spyOn(console, "log")
      .mockImplementation(() => {});

    const { result } = renderHook(() => useLogger());

    await act(async () => {
      result.current.logInfo("User logged in", {
        userId: 123,
      });
    });

    expect(consoleLogSpy).toHaveBeenCalled();

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining("/api/logs"),
        {
          level: "info",
          message: "User logged in",
          data: {
            userId: 123,
          },
        },
        {
          headers: {
            Authorization: "Bearer test-token",
          },
        }
      );
    });

    consoleLogSpy.mockRestore();
  });

  it("should log warning message and send it to backend", async () => {
    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    const { result } = renderHook(() => useLogger());

    await act(async () => {
      result.current.logWarning("Low stock", {
        productId: 101,
      });
    });

    expect(consoleWarnSpy).toHaveBeenCalled();

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining("/api/logs"),
        {
          level: "warn",
          message: "Low stock",
          data: {
            productId: 101,
          },
        },
        {
          headers: {
            Authorization: "Bearer test-token",
          },
        }
      );
    });

    consoleWarnSpy.mockRestore();
  });

  it("should log error message and send error details to backend", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const testError = new Error("Database connection failed");

    const { result } = renderHook(() => useLogger());

    await act(async () => {
      result.current.logError("API request failed", testError);
    });

    expect(consoleErrorSpy).toHaveBeenCalled();

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining("/api/logs"),
        {
          level: "error",
          message: "API request failed",
          data: {
            error: "Database connection failed",
            stack: testError.stack,
          },
        },
        {
          headers: {
            Authorization: "Bearer test-token",
          },
        }
      );
    });

    consoleErrorSpy.mockRestore();
  });

  it("should work when data is not provided", async () => {
    const consoleLogSpy = vi
      .spyOn(console, "log")
      .mockImplementation(() => {});

    const { result } = renderHook(() => useLogger());

    await act(async () => {
      result.current.logInfo("Simple log");
    });

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining("/api/logs"),
        {
          level: "info",
          message: "Simple log",
          data: null,
        },
        {
          headers: {
            Authorization: "Bearer test-token",
          },
        }
      );
    });

    consoleLogSpy.mockRestore();
  });

  it("should use token from localStorage", async () => {
    const consoleLogSpy = vi
      .spyOn(console, "log")
      .mockImplementation(() => {});

    localStorage.setItem("token", "my-jwt-token");

    const { result } = renderHook(() => useLogger());

    await act(async () => {
      result.current.logInfo("Testing token");
    });

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Object),
        {
          headers: {
            Authorization: "Bearer my-jwt-token",
          },
        }
      );
    });

    consoleLogSpy.mockRestore();
  });

  it("should handle axios failure without throwing", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    axios.post.mockRejectedValueOnce(
      new Error("Network error")
    );

    const { result } = renderHook(() => useLogger());

    await act(async () => {
      result.current.logInfo("Test API failure");
    });

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Unable to send log to backend",
        expect.any(Error)
      );
    });

    consoleErrorSpy.mockRestore();
  });
});
