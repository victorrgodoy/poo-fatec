import { Modal, type ModalProps } from "antd";
import React from "react";

interface ModalBasicProps {
  isModalOpen: boolean;
  handleOk: ModalProps['onOk'];
  handleCancel: ModalProps['onCancel'];
}

const ModalBasic: React.FC<ModalBasicProps> = ({ 
  isModalOpen, 
  handleOk, 
  handleCancel 
}) => {
  return (
    <Modal
      title="Confirmar Exclusão"
      closable={{ "aria-label": "Fechar" }}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Sim, deletar"
      cancelText="Cancelar"
      okButtonProps={{ danger: true }}
    >
      <p>
        Tem certeza que deseja <strong>deletar este cliente</strong>? Esta
        ação não poderá ser desfeita.
      </p>
    </Modal>
  );
};

export default ModalBasic;