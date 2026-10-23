export const getApiErrorMessage = (error) => {
  if (!error.response) {
    if (error.code === "ECONNABORTED") {
      return "Request timed out. Please try again.";
    }

    return "Unable to connect to the server. Please try again.";
  }

  switch (error.response.status) {
    case 400:
      return "Invalid request.";

    case 401:
      return "Invalid email or password.";

    case 403:
      return "You are not authorized.";

    case 404:
      return "Resource not found.";

    case 422:
      return "Please check the entered information.";

    case 500:
      return "Server error. Please try again later.";

    default:
      return "Something went wrong.";
  }
};