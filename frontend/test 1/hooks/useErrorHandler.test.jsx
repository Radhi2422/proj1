import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import useErrorHandler from "./useErrorHandler";

describe("useErrorHandler", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns API error message when error.response exists", () => {
    const { result } = renderHook(() => useErrorHandler());

    const error = {
      response: {
        data: {
          message: "Invalid credentials",
        },
      },
    };

    const message = result.current.handleError(error);

    expect(message).toBe("Invalid credentials");

    expect(console.error).toHaveBeenCalledWith(
      "API Error:",
      error.response.data
    );
  });

  it("returns default message when API response has no message", () => {
    const { result } = renderHook(() => useErrorHandler());

    const error = {
      response: {
        data: {},
      },
    };

    const message = result.current.handleError(error);

    expect(message).toBe("Something went wrong.");
  });

  it("returns server connection error when error.request exists", () => {
    const { result } = renderHook(() => useErrorHandler());

    const error = {
      request: {
        status: 0,
      },
    };

    const message = result.current.handleError(error);

    expect(message).toBe("Unable to connect to server.");

    expect(console.error).toHaveBeenCalledWith(
      "No response received:",
      error.request
    );
  });

  it("returns error message for unexpected errors", () => {
    const { result } = renderHook(() => useErrorHandler());

    const error = {
      message: "Something unexpected happened",
    };

    const message = result.current.handleError(error);

    expect(message).toBe("Something unexpected happened");

    expect(console.error).toHaveBeenCalledWith(
      "Unexpected Error:",
      error.message
    );
  });

  it("returns an empty message when error.message is empty", () => {
    const { result } = renderHook(() => useErrorHandler());

    const error = {
      message: "",
    };

    const message = result.current.handleError(error);

    expect(message).toBe("");
  });

  it("keeps the same handleError function between renders", () => {
    const { result, rerender } = renderHook(() => useErrorHandler());

    const firstHandleError = result.current.handleError;

    rerender();

    const secondHandleError = result.current.handleError;

    expect(firstHandleError).toBe(secondHandleError);
  });
});