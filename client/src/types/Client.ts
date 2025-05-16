export interface CPF {
  number: string;
  issueDate: string;
}

export interface RG {
  number: string;
  issueDate: string;
}

export interface Phone {
  ddd: string;
  number: string;
}

export interface Client {
  id: number;
  name: string;
  socialName: string;
  cpf: CPF;
  rgs: RG[];
  phones: Phone[];
}
