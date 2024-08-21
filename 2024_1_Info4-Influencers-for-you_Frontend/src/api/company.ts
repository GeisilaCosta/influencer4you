import { api, apiFormData } from "./axios";

export const postCompany = async (company: FormData) => {
  try {
    const response = await apiFormData.post("/company", company);
    return response.data;
  } catch (error) {
    console.error('Erro ao postar empresa:', error);
    throw error; // Repassa o erro para ser tratado no handleSubmit
  }
};

export const findAllCompany = async () => {
  try {
    const response = await api.get("/company");
    console.log("Response data:", response.data);
    return Array.isArray(response.data.content) ? response.data.content : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const findAllCompanyPag = async (page: number = 0, size: number = 50) => {
  try {
    const response = await api.get(`/company?page=${page}&size=${size}`);
    const { content } = response.data;
    return content;
  } catch (error) {
    console.error("Error fetching companies:", error);
    throw error;
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

export const getMarketingFocus = async () => {
  try {
    const response = await api.get("/targetAudience");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const approveCompany = async (id: number, token: string) => {
  try {
    const response = await api.put(`/company/aprovar/${id}`,null, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to approve company");
  }
};

export const rejectCompany = async (id: number, token: string) => {
  try {
    const response = await api.put(`/company/reprovar/${id}`,null, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to reject company");
  }
};
