export interface RG {
  id?: number
  number: string
  issueDate: string
  clientId: number
}
export interface CPF {
  number: string
  issueDate: string
}

export interface Phone {
  id?: number
  ddd: string
  number: string
  clientId: number
}

export interface Client {
    id?: number
    name: string
    socialName: string
    cpf: CPF
    rgs: RG[]
    phones: Phone[]
}

export interface Pet {
    id?: number
    name: string
    breed:string
    species:string
    clientId?: number
}

export interface Product {
    id?: number
    title: string
    value: string
}

export interface Service {
    id?: number
    title: string
    value: string
}

export interface AlertInfo {
  variant: string
  message: string
}

export type ApiResponse<T> = {
  status: number;
  message: string;
  data: T;
};