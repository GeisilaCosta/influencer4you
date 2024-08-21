import { Niche } from "../types";
import { api } from "./axios";

export const getNiches = async () => {
  try {
    const response = await api.get("/niches");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const postNiche = async (
  niche: Omit<Niche, "id">,
  token: string
): Promise<Niche | undefined> => {
  try {
    const response = await api.post<Niche>("/niches", niche, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("API Response:", response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
