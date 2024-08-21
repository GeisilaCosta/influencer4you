import { TargetAudience } from "../types";
import { api } from "./axios";

export const postTargetAudience = async (
  targetAudience: Omit<TargetAudience, "id">,
  token: string
): Promise<TargetAudience | undefined> => {
  try {
    const response = await api.post<TargetAudience>("/targetAudience", targetAudience, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("API Response:", response);
    return response.data;
  } catch (error) {
    console.error("Error posting target audience:", error);
  }
};
