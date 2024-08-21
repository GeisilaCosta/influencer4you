import { api } from "./axios";

export const postLogin = async (login: any) => {
  try {
    const response = await api.post("/login", login);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
