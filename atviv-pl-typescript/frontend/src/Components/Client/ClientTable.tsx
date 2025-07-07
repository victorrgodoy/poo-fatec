import React from "react";
import { CLIENT_GET, CLIENT_DELETE } from "../../api";
import { Space, message, Button, Descriptions } from "antd";
import TableBasic from "../Forms/TableBasic";
import DescriptionBasic from "../Forms/DescriptionBasic";
import ModalBasic from "../Forms/ModalBasic";
import styles from "./Client.module.css";
import ClientForm from "./ClientForm";

interface Address {
  rua?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  codigoPostal?: string;
  informacoesAdicionais?: string;
}

interface Phone {
  ddd?: string;
  numero?: string;
}

interface Client {
  id: string | number;
  nome: string;
  nomeSocial?: string;
  email?: string;
  endereco?: Address;
  telefones?: Phone[];
}

interface TableClient {
  key: string | number;
  name: string;
  socialName?: string;
  city?: string;
  originalData: Client;
}

interface Column {
  title: string;
  dataIndex?: string;
  key: string;
  responsive?: string[];
  render?: (text: string, record: TableClient) => React.ReactNode;
}

const ClientTable: React.FC = () => {
  const [data, setData] = React.useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = React.useState<TableClient | null>(null);
  const [formVisible, setFormVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [deleteClientId, setDeleteClientId] = React.useState<string | number | null>(null);

  const fetchClientes = React.useCallback(async () => {
    setLoading(true);
    try {
      const { url, options } = CLIENT_GET();
      const response = await fetch(url, options);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
      message.error("Erro ao carregar clientes");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDeleteClient = async (clientId: string | number) => {
    try {
      const { url, options } = CLIENT_DELETE({ id: clientId });
      const response = await fetch(url, options);
      if (response.ok) {
        message.success("Cliente deletado com sucesso.");
        fetchClientes();
      } else {
        message.error("Erro ao deletar cliente.");
      }
    } catch (error) {
      console.error("Erro ao deletar:", error);
      message.error("Erro ao deletar cliente.");
    }
  };

  React.useEffect(() => {
    fetchClientes();
  }, [fetchClientes]);

  const handleNewClientClick = () => {
    setFormVisible(!formVisible);
    setSelectedClient(null);
  };

  const handleClientAdded = () => {
    fetchClientes();
    setFormVisible(false);
    setSelectedClient(null);
  };

  const columns: Column[] = [
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
      title: "Cidade",
      dataIndex: "city",
      key: "city",
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Ações",
      key: "action",
      render: (_, record: TableClient) => (
        <Space size="middle">
          <a onClick={() => { setSelectedClient(record); setFormVisible(false); }}>
            Ver Mais
          </a>
          <a onClick={() => {
            setDeleteClientId(record.originalData.id);
            setIsDeleteModalOpen(true);
          }}>
            Deletar
          </a>
          <a onClick={() => {
            setSelectedClient(record);
            setFormVisible(true);
          }}>
            Atualizar
          </a>
        </Space>
      ),
    },
  ];

  const dataSource: TableClient[] = data.map((client) => ({
    key: client.id,
    name: client.nome,
    socialName: client.nomeSocial,
    city: client.endereco?.cidade,
    originalData: client,
  }));

  const handleOk = () => {
    if (deleteClientId) {
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
      <h2>Clientes</h2>
      <div className={styles.buttons}>
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
      {selectedClient && !formVisible && (
        <DescriptionBasic
          client={selectedClient.originalData}
          onClose={() => setSelectedClient(null)}
          title="Detalhes do Cliente"
        >
          <Descriptions.Item label="Nome">
            {selectedClient.originalData.nome}
          </Descriptions.Item>

          {selectedClient.originalData.nomeSocial && (
            <Descriptions.Item label="Nome Social">
              {selectedClient.originalData.nomeSocial}
            </Descriptions.Item>
          )}

          <Descriptions.Item label="Telefone">
            {selectedClient.originalData.telefones?.length > 0
              ? selectedClient.originalData.telefones
                  .map((t) => `(${t.ddd}) ${t.numero}`)
                  .join(", ")
              : "Não informado"}
          </Descriptions.Item>

          <Descriptions.Item label="Email">
            {selectedClient.originalData.email || "Não informado"}
          </Descriptions.Item>

          <Descriptions.Item label="Endereço">
            {selectedClient.originalData.endereco && (
              <>
                {selectedClient.originalData.endereco.rua && (
                  <div>Rua: {selectedClient.originalData.endereco.rua}</div>
                )}
                {selectedClient.originalData.endereco.numero && (
                  <div>Nº: {selectedClient.originalData.endereco.numero}</div>
                )}
                {selectedClient.originalData.endereco.bairro && (
                  <div>Bairro: {selectedClient.originalData.endereco.bairro}</div>
                )}
                {selectedClient.originalData.endereco.cidade && (
                  <div>Cidade: {selectedClient.originalData.endereco.cidade}</div>
                )}
                {selectedClient.originalData.endereco.estado && (
                  <div>Estado: {selectedClient.originalData.endereco.estado}</div>
                )}
                {selectedClient.originalData.endereco.codigoPostal && (
                  <div>CEP: {selectedClient.originalData.endereco.codigoPostal}</div>
                )}
              </>
            )}
          </Descriptions.Item>

          {selectedClient.originalData.endereco?.informacoesAdicionais && (
            <Descriptions.Item label="Informações adicionais">
              {selectedClient.originalData.endereco.informacoesAdicionais}
            </Descriptions.Item>
          )}
        </DescriptionBasic>
      )}
      {formVisible && (
        <ClientForm
          client={selectedClient?.originalData}
          onSuccess={handleClientAdded}
        />
      )}
    </div>
  );
};

export default ClientTable;