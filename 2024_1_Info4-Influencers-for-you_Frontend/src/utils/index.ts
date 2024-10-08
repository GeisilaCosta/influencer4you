export const formatPhone = (phone: string): string => {
  const cleaned = `${phone}`.replace(/\D/g, "");
  if (cleaned.length != 11) return cleaned; 
  const formated = cleaned.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  return formated;
};
