import React from "react";
import styles from "./Client.module.css";
import { LIST_CLIENTS, DELETE_CLIENT } from "../../api";
import { Space, message, Button, Descriptions } from "antd";
import TableBasic from "../../components/TableBasic";
import DescriptionBasic from "../../components/DescriptionBasic";
import ModalBasic from "../../components/ModalBasic";
import { Client } from "../../types/Client";
import type { ColumnsType } from "antd/es/table";

const ClientTable = () => {
  const [data, setData] = React.useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = React.useState<Client | null>(null);
  const [formVisible, setFormVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [deleteClientId, setDeleteClientId] = React.useState<number | null>(null);

  const fetchClients = React.useCallback(async () => {
    setLoading(true);
    try {
      const { url, options } = LIST_CLIENTS();
      const response = await fetch(url, options);
      const json = await response.json();
      setData(json.data);
      console.log(json);  
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
      message.error("Erro ao carregar clientes");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDeleteClient = async (clientId: number) => {
    try {
      const { url, options } = DELETE_CLIENT(clientId);
      const response = await fetch(url, options);
      if (response.ok) {
        message.success("Cliente deletado com sucesso.");
        fetchClients();
      } else {
        message.error("Erro ao deletar cliente.");
      }
    } catch (error) {
      console.error("Erro ao deletar:", error);
      message.error("Erro ao deletar cliente.");
    }
  };

  React.useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  // Alterna visibilidade do formulário para criar novo cliente
  const handleNewClientClick = () => {
    setSelectedClient(null);
    setFormVisible((v) => !v);
  };

  // Quando cliente é adicionado/atualizado, atualiza lista e fecha formulário
  const handleClientAdded = () => {
    fetchClients();
    setFormVisible(false);
    setSelectedClient(null);
  };

  const columns: ColumnsType<Client> = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Nome Social",
      dataIndex: "socialName",
      key: "socialName",
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Cpf",
      dataIndex: "cpf",
      key: "cpf",
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Ações",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              setSelectedClient(record);
              setFormVisible(false);
            }}
          >
            Ver Mais
          </a>
          <a
            onClick={() => {
              setDeleteClientId(record.id);
              setIsDeleteModalOpen(true);
            }}
          >
            Deletar
          </a>
          <a
            onClick={() => {
              setSelectedClient(record);
              setFormVisible(true);
            }}
          >
            Atualizar
          </a>
        </Space>
      ),
    },
  ];

  const dataSource = data.map((client) => ({
    key: client.id,
    name: client.name,
    socialName: client.socialName,
    cpf: client.cpf.number,
  }));

  const handleOk = () => {
    if (deleteClientId !== null) {
      handleDeleteClient(deleteClientId);
      setDeleteClientId(null);
    }
    setIsDeleteModalOpen(false);
  };

  const handleCancel = () => {
    setIsDeleteModalOpen(false);
  };

  return (
     <div className={styles.client}>
      <h2 >Clientes</h2>
      <div className={styles.button}>
        <Button type="primary" onClick={handleNewClientClick}>
          {formVisible ? "Fechar Formulário" : "Novo Cliente"}
        </Button>
      </div>

      {isDeleteModalOpen && (
        <ModalBasic
          isModalOpen={isDeleteModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
        />
      )}

      <TableBasic dataSource={dataSource} columns={columns} loading={loading} />

      {/* Formulário para criar ou editar cliente */}
      {/* {formVisible && (
        <ClientForm
          client={selectedClient}
          onSuccess={handleClientAdded}
          onCancel={() => setFormVisible(false)}
        />
      )} */}

      {/* Mostra detalhes do cliente se selecionado e o formulário fechado */}
      {!formVisible && selectedClient && (
        <DescriptionBasic
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
          title="Detalhes do Cliente"
        >
          <Descriptions.Item label="Nome">{selectedClient.name}</Descriptions.Item>
          <Descriptions.Item label="Nome Social">{selectedClient.socialName}</Descriptions.Item>
          <Descriptions.Item label="Cpf">{selectedClient.cpf.number}</Descriptions.Item>

          <Descriptions.Item label="RG(s)">
            {selectedClient.rgs && selectedClient.rgs.length > 0
              ? selectedClient.rgs.map((rg, index) => (
                  <div key={index}>
                    Número: {rg.number} - Emissão: {rg.issueDate}
                  </div>
                ))
              : "Não informado"}
          </Descriptions.Item>

          <Descriptions.Item label="Telefone(s)">
            {selectedClient.phones && selectedClient.phones.length > 0
              ? selectedClient.phones
                  .map((phone) => `(${phone.ddd}) ${phone.number}`)
                  .join(", ")
              : "Não informado"}
          </Descriptions.Item>
        </DescriptionBasic>
      )}
    </div>
  );
};

export default ClientTable;