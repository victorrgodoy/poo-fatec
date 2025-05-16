import { Descriptions } from "antd";
import React from "react";
import { Client } from "../types/Client";

interface DescriptionBasicProps {
  children: React.ReactNode;
  client: Client;
  onClose: () => void;
  title: string;
}

const DescriptionBasic: React.FC<DescriptionBasicProps> = ({
  children,
  client,
  onClose,
  title,
}) => {
  if (!client) return null;

  return (
    <div>
      <Descriptions
        title={title}
        bordered
        column={1}
        extra={<a onClick={onClose}>Fechar</a>}
      >
        {children}
      </Descriptions>
    </div>
  );
};

export default DescriptionBasic;
