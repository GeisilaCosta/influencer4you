import { api } from "./axios";

export const requestParticipation = async (
  influencerId: number,
  campaignId: number,
  token: string
) => {
  try {
    const response = await api.post("/influencerCampaign/join", null, {
      params: { influencerId, campaignId },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to request participation");
  }
};

export const getInfluencerCampaigns = async () => {
  const response = await api.get("/influencerCampaign");
  return response.data;
};
