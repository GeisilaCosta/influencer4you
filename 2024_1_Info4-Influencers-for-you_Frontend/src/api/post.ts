import { apiFormData, api } from "./axios";

export const postPost = async (data: FormData, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await apiFormData.post("/posts", data, config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const findAllPosts = async () => {
  try {
    const response = await api.get("/posts");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
