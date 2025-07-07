import { Descriptions } from "antd";
import React from "react";

interface ClientData {
  id: string | number;
  nome: string;
  nomeSocial?: string;
  email?: string;
  endereco?: {
    rua?: string;
    numero?: string;
    bairro?: string;
    cidade?: string;
    estado?: string;
    codigoPostal?: string;
    informacoesAdicionais?: string;
  };
  telefones?: Array<{
    ddd?: string;
    numero?: string;
  }>;
}

interface DescriptionBasicProps {
  children: React.ReactNode;
  client: ClientData | null;
  onClose: () => void;
  title: string;
}

const DescriptionBasic: React.FC<DescriptionBasicProps> = ({
  children,
  client,
  onClose,
  title
}) => {
  if (!client) return null;

  return (
    <Descriptions
      title={title}
      bordered
      column={1}
      extra={<a onClick={onClose}>Fechar</a>}
    >
      {children}
    </Descriptions>
  );
};

export default DescriptionBasic;