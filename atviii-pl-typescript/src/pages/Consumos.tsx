import { useState } from 'react';
import { Button, Card, Tab, Tabs, Table, Modal, Form, Row, Col, Alert } from 'react-bootstrap';

type FormData = {
  cpf: string;
  petName: string;
  tipoItem: string;
  nomeItem: string;
};

type AlertType = {
  variant: string;
  message: string;
} | null;

function Consumos() {
  const [activeTab, setActiveTab] = useState('registrar');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    cpf: '',
    petName: '',
    tipoItem: 'produto',
    nomeItem: '',
  });
  const [alert, setAlert] = useState<AlertType>(null);

  const topClientesQuantidade = [
    { nome: 'João Silva', quantidade: 42 },
    { nome: 'Maria Souza', quantidade: 38 },
  ];

  const topClientesValor = [
    { nome: 'Carlos Oliveira', valor: 1250.5 },
    { nome: 'Ana Santos', valor: 980.75 },
  ];

  const itensMaisConsumidos = [
    { nome: 'Ração Premium', quantidade: 120, tipo: 'produto' },
    { nome: 'Banho', quantidade: 85, tipo: 'serviço' },
  ];

  const itensPorPet = [
    { tipo: 'Cachorro', raca: 'Labrador', item: 'Ração Premium', quantidade: 15 },
  ];

  const historicoConsumos = [
    {
      cliente: 'João Silva',
      produtos: ['Ração Premium', 'Brinquedo'],
      servicos: ['Banho'],
    },
  ];

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRegistrarConsumo = () => {
    setAlert({ variant: 'success', message: 'Consumo registrado com sucesso!' });
    setShowModal(false);
    setFormData({
      cpf: '',
      petName: '',
      tipoItem: 'produto',
      nomeItem: '',
    });
  };

  return (
    <div className="p-4">
      <h1 className="mb-4">Gerenciamento de Consumos</h1>

      {alert && (
        <Alert variant={alert.variant} onClose={() => setAlert(null)} dismissible>
          {alert.message}
        </Alert>
      )}

      <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k || 'registrar')} className="mb-4">
        <Tab eventKey="historico" title="Histórico por Cliente">
          <Card className="mt-3">
            <Card.Header>Histórico de Consumos</Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Produtos</th>
                    <th>Serviços</th>
                  </tr>
                </thead>
                <tbody>
                  {historicoConsumos.map((item, index) => (
                    <tr key={index}>
                      <td>{item.cliente}</td>
                      <td>{item.produtos.join(', ')}</td>
                      <td>{item.servicos.join(', ')}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="topClientes" title="Top Clientes">
          <Row className="mt-3">
            <Col md={6}>
              <Card className="mb-4">
                <Card.Header>Top 10 Clientes (Quantidade)</Card.Header>
                <Card.Body>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Cliente</th>
                        <th>Quantidade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topClientesQuantidade.map((cliente, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{cliente.nome}</td>
                          <td>{cliente.quantidade}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card>
                <Card.Header>Top 5 Clientes (Valor)</Card.Header>
                <Card.Body>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Cliente</th>
                        <th>Valor (R$)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topClientesValor.map((cliente, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{cliente.nome}</td>
                          <td>{cliente.valor.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>

        <Tab eventKey="itensConsumidos" title="Itens Mais Consumidos">
          <Row className="mt-3">
            <Col md={6}>
              <Card className="mb-4">
                <Card.Header>Itens Mais Consumidos</Card.Header>
                <Card.Body>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Tipo</th>
                        <th>Quantidade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {itensMaisConsumidos.map((item, index) => (
                        <tr key={index}>
                          <td>{item.nome}</td>
                          <td>{item.tipo}</td>
                          <td>{item.quantidade}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card>
                <Card.Header>Itens por Tipo/Raça de Pet</Card.Header>
                <Card.Body>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Tipo</th>
                        <th>Raça</th>
                        <th>Item</th>
                        <th>Quantidade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {itensPorPet.map((item, index) => (
                        <tr key={index}>
                          <td>{item.tipo}</td>
                          <td>{item.raca}</td>
                          <td>{item.item}</td>
                          <td>{item.quantidade}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>
      </Tabs>

      <Button variant="primary" onClick={() => setShowModal(true)}>
        Registrar Novo Consumo
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Registrar Novo Consumo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>CPF do Cliente</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.cpf}
                    onChange={(e) => handleFormChange('cpf', e.target.value)}
                    placeholder="Digite o CPF"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Nome do Pet</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.petName}
                    onChange={(e) => handleFormChange('petName', e.target.value)}
                    placeholder="Digite o nome do pet"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Tipo do Item</Form.Label>
                  <Form.Select
                    value={formData.tipoItem}
                    onChange={(e) => handleFormChange('tipoItem', e.target.value)}
                  >
                    <option value="produto">Produto</option>
                    <option value="servico">Serviço</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Nome do Item</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.nomeItem}
                    onChange={(e) => handleFormChange('nomeItem', e.target.value)}
                    placeholder={`Digite o nome do ${formData.tipoItem}`}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleRegistrarConsumo}>
            Registrar Consumo
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Consumos;