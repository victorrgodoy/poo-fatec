import React from "react";
import { CLIENT_SAVE_POST, CLIENT_UPDATE_PUT } from "../../api";
import FormBasic from "../Forms/FormBasic";
import { Button, Form, Input, message, Row, Col } from "antd";

interface Address {
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  codigoPostal: string;
  informacoesAdicionais?: string;
}

interface Phone {
  ddd: string;
  numero: string;
}

interface Client {
  id?: string | number;
  nome: string;
  nomeSocial: string;
  email?: string | null;
  endereco: Address;
  telefones: Phone[];
}

interface ClientFormProps {
  client?: Client | null;
  onSuccess?: () => void;
}

interface FormValues {
  id?: string | number;
  nome: string;
  nomeSocial: string;
  email?: string;
  rua: string;
  numeroEndereco: string;
  bairro: string;
  cidade: string;
  estado: string;
  codigoPostal: string;
  informacoesAdicionais?: string;
  ddd: string;
  numeroTelefone: string;
}

const ClientForm: React.FC<ClientFormProps> = ({ client, onSuccess }) => {
  const [loading, setLoading] = React.useState(false);
  const [form] = Form.useForm<FormValues>();

  const handleSubmit = async (values: FormValues): Promise<void> => {
    setLoading(true);
    try {
      const body = {
        id: values.id,
        nome: values.nome,
        nomeSocial: values.nomeSocial,
        email: values.email || null,
        endereco: {
          rua: values.rua,
          numero: values.numeroEndereco,
          bairro: values.bairro,
          cidade: values.cidade,
          estado: values.estado,
          codigoPostal: values.codigoPostal,
          informacoesAdicionais: values.informacoesAdicionais,
        },
        telefones: [
          {
            ddd: values.ddd,
            numero: values.numeroTelefone,
          },
        ],
      };

      const { url, options } = client
        ? CLIENT_UPDATE_PUT(body)
        : CLIENT_SAVE_POST(body);
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error("Erro ao salvar cliente");
      }

      message.success(
        client ? "Cliente atualizado com sucesso!" : "Cliente salvo com sucesso!"
      );
      if (onSuccess) onSuccess(); 
    } catch (err) {
      message.error((err as Error).message || "Erro ao salvar cliente");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (client) {
      form.setFieldsValue({
        id: client.id,
        nome: client.nome,
        nomeSocial: client.nomeSocial,
        email: client.email,
        rua: client.endereco.rua,
        numeroEndereco: client.endereco.numero,
        bairro: client.endereco.bairro,
        cidade: client.endereco.cidade,
        estado: client.endereco.estado,
        codigoPostal: client.endereco.codigoPostal,
        informacoesAdicionais: client.endereco.informacoesAdicionais,
        ddd: client.telefones[0].ddd,
        numeroTelefone: client.telefones[0].numero,
      });
    } else {
      form.resetFields();
    }
  }, [client, form]);

  return (
    <FormBasic onFinish={handleSubmit} form={form}>
      <Form.Item name="id" hidden>
        <Input />
      </Form.Item>
      
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            label="Nome Completo"
            name="nome"
            rules={[{ required: true, message: "Por favor, insira o nome completo!" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            label="Nome Social"
            name="nomeSocial"
            rules={[{ required: true, message: "Por favor, insira o nome social!" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={4} md={4}>
          <Form.Item
            label="DDD"
            name="ddd"
            rules={[{ required: true, message: "Por favor, insira o DDD!" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={20} md={8}>
          <Form.Item
            label="Telefone"
            name="numeroTelefone"
            rules={[{ required: true, message: "Por favor, insira o telefone!" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item label="Rua" name="rua">
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Número" name="numeroEndereco">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item label="Bairro" name="bairro">
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Cidade" name="cidade">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item label="Estado" name="estado">
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="CEP" name="codigoPostal">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label="Informações Adicionais" name="informacoesAdicionais">
        <Input.TextArea rows={3} />
      </Form.Item>

      <Row justify="end">
        <Col>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Salvar
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </FormBasic>
  );
};

export default ClientForm;