export interface ProcessType {
  id: string;
  protocol: string;
  enterprise_id: string;
  enterprise: {
    id: string;
    name: string;
    cnpj: string;
  };
}
