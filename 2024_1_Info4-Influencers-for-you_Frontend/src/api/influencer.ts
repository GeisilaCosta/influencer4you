import axios from "axios";
import { api, apiFormData } from "./axios";

export const postInfluencer = async (influencer: any) => {
  try {
    // Check if email or CPF already exists
    const existingEmail = await findInfluencerByEmail(influencer.email);
    const existingCpf = await findInfluencerByCpf(influencer.cnpjCpf);

    if (existingEmail || existingCpf) {
      throw new Error("Email or CPF already exists.");
    }

    const response = await apiFormData.post("/influencers", influencer);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Erro ao postar influenciador:', error.response?.data || error.message);
      throw new Error(error.response?.data || 'Erro desconhecido ao postar influenciador');
    } else {
      console.error('Erro desconhecido ao postar influenciador:', error);
      throw new Error('Erro desconhecido ao postar influenciador');
    }
  }
};

// Add these functions to your code
export const findInfluencerByEmail = async (email: string) => {
  try {
    const response = await api.get(`/influencers/email/${email}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const findInfluencerByCpf = async (cpf: string) => {
  try {
    const response = await api.get(`/influencers/cpf/${cpf}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const findAllInfluencers = async () => {
  try {
    const response = await api.get("/influencers");
    console.log("Response data:", response.data);
    return Array.isArray(response.data.content) ? response.data.content : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const findAllInfluencersPag = async (page: number = 0, size: number = 50) => {
  try {
    const response = await api.get(`/influencers?page=${page}&size=${size}`);
    const { content } = response.data;
    return content;
  } catch (error) {
    console.error("Error fetching companies:", error);
    throw error;
  }
};



export const approveInfluencer = async (id: number, token: string) => {
  try {
    const response = await api.put(`/influencers/aprovar/${id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to approve influencer");
  }
};

export const rejectInfluencer = async (id: number, token: string) => {
  try {
    const response = await api.put(`/influencers/reprovar/${id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to reject influencer");
  }
};

export const sendEmail = async (emailData: {
  para: string;
  assunto: string;
  texto: string;
}) => {
  try {
    const response = await axios.post(
      "http://34.31.132.210:8008/enviar-email",
      emailData
    );
    console.log("Resposta do servidor:", response);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro ao enviar email:", error.response?.data || error.message);
    } else {
      console.error("Erro desconhecido ao enviar email:", error);
    }
  }
};
