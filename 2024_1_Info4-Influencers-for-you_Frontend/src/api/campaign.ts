import { CampaignDto } from "../types";
import { api, apiFormData } from "./axios";

export const postCampaign = async (campaign: any) => {
  try {
    const response = await apiFormData.post("/campaigns", campaign, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const getNiches = async () => {
  try {
    const response = await api.get("/niches");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const findAllCampaign = async (): Promise<CampaignDto[]> => {
  try {
    const response = await api.get("/campaigns");
    console.log("Response data:", response.data);
    return Array.isArray(response.data.content) ? response.data.content : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const findAllCampaignsPag = async (page: number = 0, size: number = 50) => {
  try {
    const response = await api.get(`/campaigns?page=${page}&size=${size}`);
    const { content } = response.data;
    return content;
  } catch (error) {
    console.error("Error fetching companies:", error);
    throw error;
  }
};



export const approveCampaign = async (id: number, token: string) => {
  try {
    const response = await api.put(`/campaigns/aprovar/${id}`, null,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to approve company");
  }
};

export const rejectCampaign = async (id: number, token: string) => {
  try {
    const response = await api.put(`/campaigns/reprovar/${id}`, null,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to reject company");
  }
};

export const getCampaignById = async (id: number) => {
  const response = await api.get(`/campaigns/${id}`);
  return response.data;
};