import { Descriptions } from "antd";

const DescriptionBasic = ({ children, client, onClose, title }) => {
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
