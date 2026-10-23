import axios from "axios";

const useAdd = () => {
  // console.log("useAdd hook called");
  const add = async ({
    endpoint,
    data,
    successMessage,
    errorMessage,
    resetForm="",
  }) => {
    try {
      console.log(data)
      const VITE_BASE_URL = import.meta.env.VITE_BASE_URL
      const token = localStorage.getItem("token");
      console.log(`${VITE_BASE_URL}${endpoint}`);
      await axios.post(
        `${VITE_BASE_URL}${endpoint}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert(successMessage);

      if (resetForm) {
        resetForm();
      }
      return true;
    } catch (error) {
      alert(errorMessage);
      console.error(error);
      return false;
    }
  };

  return { add };
};

export default useAdd;