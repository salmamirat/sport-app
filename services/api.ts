import axios from "axios";

const apiServices = axios.create({
  baseURL: "https://6a2009b2e96c1d13b586e7a9.mockapi.io/sports",
});

export const getSports = async () => {
  try {
    const response = await apiServices.get("/sports");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default apiServices;