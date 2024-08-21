export interface Niche {
  id: number;
  name: string;
}

export interface TargetAudience {
  id: number;
  name: string;
}

export interface MarketingFocus {
  id: number;
  name: string;
}

export interface SocialMedia {
  id?: number;
  socialMediaName: string;
  link: string;
}
export interface Image {
  id: number;
  url: string;
}

export interface Company {
  idCompany: number;
  nameCompany: string;
  email: string;
  cel: string;
  dateRegister: string;
  image: Image;
  cnpjCpf: string;
  roleCompany: string;
  statusAvaliation: string;
  nicheName: string | null; // Pode ser nulo
  targetAudienceName: string | null; // Pode ser nulo
  socialMedias: SocialMedia[];
}

export interface Influencer {
  id: number;
  name: string;
  email: string;
  age: number;
  cnpjCpf: string;
  statusDb: string;
  statusAvaliation: string; 
  imageId: number;
  imageUrl: string;
  socialMedias: SocialMedia[];
  niche: Niche;
  targetAudience: TargetAudience;
  cel: string;
  address: Address;
}

export interface Address {
  id: number;
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export interface CampaignDto {
  id: number;
  budget: string;
  image: IImage;
  name: string;
  niche: Niche;
  statusAvaliation: string;
  statusdb: string;
  tasks: string;
  wage: number;
  company: Company;
}

export interface IImage {
  id?: number;
  data: string;
  type?: string;
  name?: string;
}

export interface InfluencerCDto {
  id: number;
  name: string;
  status: string;
}

export interface InfluencerCampaignDto {
  campaignId: number;
  campaignName: string;
  companyName: string;
  influencers: InfluencerCDto[];
}

export interface CompanyInCampaign {
  id: number;
  nameCompany: string;
  email: string;
  cel: string;
  dateRegister: string;
  image: Image;
  cnpjCpf: string;
  roleCompany: string;
  statusAvaliation: string;
  nicheName: string | null; // Pode ser nulo
  targetAudienceName: string | null; // Pode ser nulo
  socialMedias: SocialMedia[];
}

export interface CampaignDto2 {
  id: number;
  budget: string;
  image: IImage;
  name: string;
  niche: Niche;
  statusAvaliation: string;
  statusdb: string;
  tasks: string;
  wage: number;
  company: CompanyInCampaign;
}

import 'bootstrap/dist/css/bootstrap.min.css';
